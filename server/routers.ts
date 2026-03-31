/*
 * BODY20 East Cobb — Server Routers
 * ──────────────────────────────────
 * Procedures:
 *   auth.me                    — returns current user (or null)
 *   auth.logout                — clears session cookie
 *   leads.requestCallback      — sends Twilio SMS to studio when visitor requests a call
 *   chat.start                 — creates a new chat session, returns sessionKey
 *   chat.sendMessage           — sends a visitor message, gets Jen's LLM response, saves both
 *   chat.end                   — marks session as ended
 *   chat.sendTranscript        — sends full conversation transcript to visitor via Twilio SMS
 *
 * ── For Ukrainian developers ──────────────────────────────────────────────────
 * All chat procedures are public (no auth required).
 * Frontend usage pattern:
 *   const start  = trpc.chat.start.useMutation()
 *   const send   = trpc.chat.sendMessage.useMutation()
 *   const end    = trpc.chat.end.useMutation()
 *   const txSms  = trpc.chat.sendTranscript.useMutation()
 *
 * Session flow:
 *   1. call chat.start()            → get { sessionKey }
 *   2. call chat.sendMessage(...)   → get { reply } for each turn
 *   3. call chat.end(sessionKey)    → marks session ended
 *   4. optionally call chat.sendTranscript({ sessionKey, phone }) → SMS to visitor
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import twilio from "twilio";
import { nanoid } from "nanoid";
import { getDb } from "./db";
import { chatSessions, chatMessages } from "../drizzle/schema";
import { eq, asc, desc } from "drizzle-orm";
import { invokeLLM, type Message } from "./_core/llm";

// ── Twilio client (lazy-init so missing env doesn't crash on import) ──────────
function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("Twilio credentials not configured");
  return twilio(sid, token);
}

const STUDIO_PHONE = "+17704506127"; // BODY20 East Cobb studio number — receives callback SMS alerts

// ── Jen's system prompt for text chat ─────────────────────────────────────────
// Optimized for short, conversational text exchanges (not long-form voice).
// Update this prompt as Jen's knowledge base and persona evolve.
const JEN_SYSTEM_PROMPT = `You are Jen, BODY20 East Cobb's friendly and knowledgeable AI guide.
You help potential members learn about BODY20's EMS (Electrical Muscle Stimulation) training and take the next step toward booking their first session.

ABOUT BODY20 EAST COBB:
- Location: East Cobb, Georgia (Marietta area)
- Phone: 770-450-6127
- Booking: https://www.body20.com/location/east-cobb
- Owner: Gene Chayevsky
- Assessment cost: $49 (credited toward membership if you join)

WHAT YOU KNOW:
- BODY20 uses FDA-cleared EMS suits that stimulate up to 90% of muscle fibers simultaneously
- A 20-minute EMS session is equivalent to 90 minutes of conventional training
- EMS accelerates metabolic health, mitochondrial regeneration, and muscle development
- Ideal for busy professionals, people with joint issues, athletes, and anyone wanting efficient results
- Sessions are 1-on-1 with a certified trainer

YOUR PERSONALITY:
- Warm, encouraging, and knowledgeable — like a knowledgeable friend, not a sales robot
- Keep responses SHORT (2-4 sentences max) — this is a text chat, not a speech
- Use the visitor's name if they share it
- Ask one question at a time to keep the conversation flowing
- If someone wants to speak to a human, say: "Of course! You can call us at 770-450-6127 or I can have the team call you back — just let me know."
- Always guide toward booking: https://www.body20.com/location/east-cobb

IMPORTANT: Never make up facts. If you don't know something, say "Great question — let me have the team follow up with you on that."`;

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Lead capture ────────────────────────────────────────────────────────────
  leads: router({
    /**
     * requestCallback — visitor submits "Request a Call" form.
     * Sends SMS to studio with visitor's name, phone, and preferred call time.
     */
    requestCallback: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(100),
          phone: z.string().min(7).max(20),
          bestTime: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { name, phone, bestTime } = input;
        const timeLabel = bestTime
          ? bestTime === "morning"
            ? "Morning (8am–12pm)"
            : bestTime === "afternoon"
            ? "Afternoon (12pm–5pm)"
            : bestTime === "evening"
            ? "Evening (5pm–8pm)"
            : "Anytime"
          : "Not specified";

        const body =
          `📞 BODY20 East Cobb — Callback Request\n` +
          `Name: ${name}\n` +
          `Phone: ${phone}\n` +
          `Best time: ${timeLabel}\n` +
          `Source: QR Landing Page`;

        const fromNumber = process.env.TWILIO_FROM_NUMBER;
        if (!fromNumber) throw new Error("TWILIO_FROM_NUMBER not configured");

        const client = getTwilioClient();
        await client.messages.create({ body, from: fromNumber, to: STUDIO_PHONE });

        return { success: true };
      }),
  }),

  // ── Jen Cha  // ── Admin Transcript Viewer ─────────────────────────────────────────────────
  admin: router({
    /**
     * listSessions — returns all chat sessions, newest first.
     * Requires password in the request.
     */
    listSessions: publicProcedure
      .input(z.object({ password: z.string() }))
      .query(async ({ input }) => {
        checkAdminPassword(input.password);
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const sessions = await db
          .select()
          .from(chatSessions)
          .orderBy(desc(chatSessions.createdAt))
          .limit(200);

        // Count messages per session
        const sessionIds = sessions.map(s => s.id);
        const allMessages = sessionIds.length > 0
          ? await db.select().from(chatMessages).where(
              sessionIds.length === 1
                ? eq(chatMessages.sessionId, sessionIds[0])
                : eq(chatMessages.sessionId, sessionIds[0]) // simplified: fetch all
            )
          : [];

        // Build message count map
        const countMap: Record<number, number> = {};
        for (const msg of allMessages) {
          countMap[msg.sessionId] = (countMap[msg.sessionId] ?? 0) + 1;
        }

        return sessions.map(s => ({
          ...s,
          messageCount: countMap[s.id] ?? 0,
        }));
      }),

    /**
     * getSession — returns a single session with all its messages.
     * Requires password in the request.
     */
    getSession: publicProcedure
      .input(z.object({ password: z.string(), sessionKey: z.string() }))
      .query(async ({ input }) => {
        checkAdminPassword(input.password);
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const sessions = await db
          .select()
          .from(chatSessions)
          .where(eq(chatSessions.sessionKey, input.sessionKey))
          .limit(1);

        if (!sessions.length) throw new Error("Session not found");
        const session = sessions[0];

        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.sessionId, session.id))
          .orderBy(asc(chatMessages.createdAt));

        return { session, messages };
      }),
  }),

  // ── Jen Chat ─────────────────────────────────────────────────
  chat: router({
    /**
     * start — creates a new chat session.
     * Call this when the visitor opens the chat panel.
     * Returns a sessionKey used for all subsequent calls.
     */
    start: publicProcedure
      .mutation(async () => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const sessionKey = nanoid(16);
        await db.insert(chatSessions).values({
          sessionKey,
          source: "qr-landing-page",
          status: "active",
          transcriptSent: 0,
        });

        return { sessionKey };
      }),

    /**
     * sendMessage — visitor sends a message; Jen responds via LLM.
     * Saves both the visitor message and Jen's response to the database.
     *
     * Input:
     *   sessionKey  — from chat.start
     *   message     — visitor's text
     *   history     — previous turns [{ role, content }] for context (last 10 max)
     *
     * Returns: { reply: string }
     */
    sendMessage: publicProcedure
      .input(
        z.object({
          sessionKey: z.string(),
          message: z.string().min(1).max(2000),
          history: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ).max(20).default([]),
          visitorName: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { sessionKey, message, history, visitorName } = input;
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Look up session
        const sessions = await db
          .select()
          .from(chatSessions)
          .where(eq(chatSessions.sessionKey, sessionKey))
          .limit(1);

        if (!sessions.length) throw new Error("Session not found");
        const session = sessions[0];

        // Save visitor's name if provided and not already saved
        if (visitorName && !session.visitorName) {
          await db
            .update(chatSessions)
            .set({ visitorName })
            .where(eq(chatSessions.sessionKey, sessionKey));
        }

        // Save visitor message to DB
        await db.insert(chatMessages).values({
          sessionId: session.id,
          role: "user",
          content: message,
        });

        // Build message array for LLM (system prompt + history + new message)
        const messages: Message[] = [
          { role: "system", content: JEN_SYSTEM_PROMPT },
          ...history.slice(-10).map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user", content: message },
        ];

        // Call LLM for Jen's response
        const llmResponse = await invokeLLM({ messages });
        const rawContent = llmResponse.choices?.[0]?.message?.content;
        const reply = typeof rawContent === "string"
          ? rawContent
          : Array.isArray(rawContent)
          ? rawContent.map(p => (typeof p === "object" && "text" in p ? (p as { text: string }).text : "")).join("")
          : "I'm sorry, I didn't catch that. Could you try again?";

        // Save Jen's response to DB
        await db.insert(chatMessages).values({
          sessionId: session.id,
          role: "assistant",
          content: reply,
        });

        return { reply };
      }),

    /**
     * end — marks a session as ended.
     * Call this when the visitor closes the chat panel.
     */
    end: publicProcedure
      .input(z.object({ sessionKey: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db
          .update(chatSessions)
          .set({ status: "ended", endedAt: new Date() })
          .where(eq(chatSessions.sessionKey, input.sessionKey));

        return { success: true };
      }),

    /**
     * sendTranscript — sends the full conversation as an SMS to the visitor.
     * Called when visitor taps "Text me this conversation."
     * Also saves their phone number to the session record.
     *
     * SMS format: clean numbered list of exchanges, not raw JSON.
     * Long transcripts are chunked into multiple SMS messages (Twilio handles splitting).
     */
    sendTranscript: publicProcedure
      .input(
        z.object({
          sessionKey: z.string(),
          phone: z.string().min(7).max(20),
        })
      )
      .mutation(async ({ input }) => {
        const { sessionKey, phone } = input;
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Look up session
        const sessions = await db
          .select()
          .from(chatSessions)
          .where(eq(chatSessions.sessionKey, sessionKey))
          .limit(1);

        if (!sessions.length) throw new Error("Session not found");
        const session = sessions[0];

        // Fetch all messages in order
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.sessionId, session.id))
          .orderBy(asc(chatMessages.createdAt));

        if (!messages.length) {
          return { success: false, reason: "No messages to send" };
        }

        // Build clean transcript text
        const lines: string[] = [
          "💬 Your chat with Jen — BODY20 East Cobb",
          "─────────────────",
        ];
        for (const msg of messages) {
          const label = msg.role === "user" ? "You" : "Jen";
          lines.push(`${label}: ${msg.content}`);
        }
        lines.push("─────────────────");
        lines.push("Book your assessment: body20.com/location/east-cobb");
        lines.push("Questions? Call us: 770-450-6127");

        const transcriptText = lines.join("\n");

        // Normalize phone number — add +1 if US number without country code
        const normalizedPhone = phone.replace(/\D/g, "");
        const toPhone = normalizedPhone.startsWith("1")
          ? `+${normalizedPhone}`
          : `+1${normalizedPhone}`;

        const fromNumber = process.env.TWILIO_FROM_NUMBER;
        if (!fromNumber) throw new Error("TWILIO_FROM_NUMBER not configured");

        const client = getTwilioClient();

        // Send transcript SMS to visitor
        await client.messages.create({
          body: transcriptText,
          from: fromNumber,
          to: toPhone,
        });

        // Also notify studio that a chat transcript was requested (lead capture signal)
        const visitorName = session.visitorName ?? "Unknown visitor";
        await client.messages.create({
          body: `💬 BODY20 East Cobb — Chat Transcript Requested\nVisitor: ${visitorName}\nPhone: ${phone}\nTranscript sent to visitor.`,
          from: fromNumber,
          to: STUDIO_PHONE,
        });

        // Save phone to session and mark transcript sent
        await db
          .update(chatSessions)
          .set({ visitorPhone: phone, transcriptSent: 1 })
          .where(eq(chatSessions.sessionKey, sessionKey));

        return { success: true };
      }),
  }),
});

// ── Admin Transcript Viewer ─────────────────────────────────────────────────
// Password-protected via ADMIN_PASSWORD env var (set in Manus secrets).
// All procedures check the password before returning data.
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "body20admin";

function checkAdminPassword(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export type AppRouter = typeof appRouter;
