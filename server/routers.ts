/*
 * BODY20 East Cobb — Server Routers
 * ──────────────────────────────────
 * Procedures:
 *   auth.me         — returns current user (or null)
 *   auth.logout     — clears session cookie
 *   leads.requestCallback — sends Twilio SMS to studio when visitor requests a call
 */

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import twilio from "twilio";

// ── Twilio client (lazy-init so missing env doesn't crash on import) ──────────
function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("Twilio credentials not configured");
  return twilio(sid, token);
}

const STUDIO_PHONE = "+17704506127"; // BODY20 East Cobb studio number

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

  leads: router({
    /**
     * requestCallback — called when a visitor submits the "Request a Call" form.
     * Sends an SMS to the studio number with the visitor's name, phone, and
     * preferred call time.
     *
     * For Ukrainian developers: this is a public tRPC mutation.
     * Call it from the frontend with:
     *   trpc.leads.requestCallback.useMutation()
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
        await client.messages.create({
          body,
          from: fromNumber,
          to: STUDIO_PHONE,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
