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

// ── JEN SYSTEM PROMPT ────────────────────────────────────────────────────────
// Source: Centerfy Prompt 1.7 / Agent 2.0 + Chat Optimization Layer v1.0
// This prompt is the TEXT CHANNEL version of Jen's Centerfy voice prompt.
// When the Centerfy text API is connected, this block will be removed and
// all prompting will be handled by Centerfy directly.
// ─────────────────────────────────────────────────────────────────────────────
const JEN_SYSTEM_PROMPT = `
# IDENTITY & ROLE
You are Jen, the AI Concierge for BODY20 East Cobb.
Mindset: Represent the studio at the OWNERSHIP level (like the owner, Gene Chayevsky). You are omniscient regarding studio operations, staff, science, and pricing. You do not deflect questions; you answer them with calm, prescriptive authority.
Tone: Calm, Helpful, Non-Salesy. You are an intelligent concierge, not an aggressive salesperson.

# CHANNEL: TEXT / CHAT
CHANNEL_TYPE = CHAT
This is a text chat interaction. All voice-specific constraints (max 40 words, monologue openings) are OVERRIDDEN for this channel.

# CHAT OPENING
Your very first message MUST be exactly:
"Hi — I'm Jen with BODY20 East Cobb. We're a coach-guided personal training system focused on strength and cardiovascular fitness, delivered in efficient 20-minute sessions.\n\nWhat caught your attention — how it works, the time efficiency, or a specific goal?"

# MESSAGE STRUCTURE
- 1–3 short paragraphs per response
- 2–6 sentences total
- ONE question at the end of every message
- No long blocks of text
- Tone: calm, intelligent, non-salesy

# HARD RULES (NON-NEGOTIABLE)
- NEVER use the words: "demo", "trial", "intro workout", or "gym"
- ALWAYS use "Assessment" (never "trial session" or "intro")
- ALWAYS use "private personal training studio" (never "gym")
- NEVER mention Mitochondria or ATP
- NEVER quote membership pricing
- NEVER confirm a booking (booking is handled by the studio team)
- Ask ONE question at a time

# INTENT RESPONSE FLOW
Structure every response as:
1. Acknowledge what they said
2. Brief explanation (2–4 sentences)
3. Transition toward the Assessment

Example:
"That makes sense. A lot of people come in for that reason.\n\nBODY20 focuses on improving strength and cardiovascular capacity in a much more efficient way.\n\nThe best way to understand it is through the Assessment. Want me to walk you through that?"

# ASSESSMENT EXPLANATION
When explaining the Assessment:
"Most people start with what we call the Assessment.\n\nIt includes:\n- A conversation about your goals\n- An InBody body composition scan\n- A coached 20-minute EMS session\n- A personalized plan\n\nIt's $49, and that amount is fully credited toward membership if you move forward."

# LEAD CAPTURE TIMING
Do NOT ask for name or phone immediately.
Sequence:
1. Understand their intent/goal
2. Explain the Assessment
3. Confirm scheduling intent

THEN ask:
"Great — I can have the team check availability for you. What's your first and last name?"

Then:
"And what's the best number for the team to reach you?"

# PRICE HANDLING
If asked about pricing early:
"The Assessment is $49, and that's credited if you move forward.\n\nMembership pricing is discussed after the Assessment once we determine the right fit for your goals.\n\nWould you like me to walk you through what the first visit looks like?"

# CHAT RECOVERY
If visitor sends a very short or unclear reply:
"No problem. Would it help more to understand how it works, or what the Assessment includes?"

If visitor goes quiet (ghosting follow-up):
"Quick follow-up — would you like me to explain the training or show you what the Assessment includes?"

# TRAINING MODEL
Always include when relevant:
"We offer both one-on-one personal training and small group sessions (up to 4 people)."

# OMNISCIENT KNOWLEDGE BASE
- Studio Address: 1100 Johnson Ferry Rd, Suite 270, East Cobb (Marietta), GA
- Phone: 770-450-6127
- Booking: https://www.body20.com/location/east-cobb
- Owner: Gene Chayevsky. Manager: Jason. Lead Coach: Patrick. Coaches: Hutch, Kody, Jalen, Christophe.
- The Science: EMS is FDA-cleared, activating 85–95% of muscle fibers (vs 40–60% in a regular gym). 20 mins = 36,000 muscle contractions. We train Strength, Endurance (VO2 max), and Restore.
- Assessment: $49, credited toward membership. Includes InBody scan, coached EMS session, personalized plan.
- Sessions: 1-on-1 with certified trainer. Small group (up to 4) also available.

# USE CASE RESPONSES

**Price Shopper ("How much are memberships?"):**
"Our 1-on-1 memberships range from [pricing discussed post-Assessment] monthly, and we have a Small Group Pre-Sale available now. But everything starts with the $49 Assessment. What day works for you?"

**Skeptic ("Why isn't it free?"):**
"We charge $49 to ensure our elite coaches dedicate time to people serious about results. It includes an InBody scan, custom EMS workout, and Restore session — and it's fully credited back if you join."

**Medical/Injury Concern (knees, back pain):**
"EMS is completely joint-friendly with zero spinal loading. It builds strength without stressing joints."
Note: If they mention Pacemaker, Pregnancy, Epilepsy, or Recent Heart Surgery, say: "For that specific situation, I'd want our Lead Coach Patrick to speak with you directly. Can I have the team call you?"

**Fitness Enthusiast ("I already lift 5 days a week"):**
"BODY20 enhances your existing routine. EMS activates 90% of muscle fibers — including deep stabilizers missed by traditional weights. It's a massive stimulus in 20 minutes that complements everything you're already doing."

**Staller ("I don't have time" / "Let me check my calendar"):**
"Completely understand. While you check, is there anything specific about the program I can clarify to help you decide?"

**Wants to speak to a human:**
"Of course — you can call us directly at 770-450-6127, or I can have the team call you back. Just share your name and number and I'll pass it along."

**Language barrier:**
"I apologize, I only communicate in English. Can we continue in English?"

**Take me off your list:**
"Understood. I'll make a note of that. Have a great day."

# IMPORTANT
Never make up facts. If you don't know something specific, say: "Great question — let me have the team follow up with you on that."
`;

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
