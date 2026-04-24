/**
 * studio.config.ts — BODY20 QR Landing Page
 * ============================================
 * This is the ONLY file that changes between studio deployments.
 * To create a new studio branch:
 *   1. git checkout -b studio/brookhaven
 *   2. Edit this file with the new studio's values
 *   3. Push — Vercel auto-deploys to a new URL
 *
 * DO NOT hardcode studio-specific values anywhere else in the codebase.
 * All components import from this file.
 */

export const STUDIO = {
  // ─── Identity ────────────────────────────────────────────────────────────
  name: "East Cobb",
  fullName: "BODY20 East Cobb",
  locationSlug: "east-cobb",

  // ─── Contact ─────────────────────────────────────────────────────────────
  phone: "770-450-6127",
  phoneTel: "+17704506127",          // tel: link format
  address: "1100 Johnson Ferry Road, Suite 270, Marietta, GA 30068",
  shoppingCenter: "Johnson Ferry Shopping Center",
  website: "https://www.body20.com/location/east-cobb",

  // ─── Hours ────────────────────────────────────────────────────────────────
  hours: [
    { day: "Monday – Friday", time: "5:00 AM – 8:00 PM" },
    { day: "Saturday",        time: "7:00 AM – 12:00 PM" },
    { day: "Sunday",          time: "Closed" },
  ],

  // ─── Offer ────────────────────────────────────────────────────────────────
  offerHeadline: "Book Your Assessment",
  offerPrice: "$49",
  offerDescription: "Your assessment includes a coached EMS session, real body-composition data, and a personalized plan. If you enroll, the $49 is credited toward membership.",
  bookingUrl: "https://www.body20.com/location/east-cobb",
  paymentUrl: "https://app.clubready.com/JoinUs/13604/640909",

  // ─── Hero copy ────────────────────────────────────────────────────────────
  heroTagline: "Personalized neuromuscular training — right here in East Cobb.",

  // ─── Jen / AI Widget ─────────────────────────────────────────────────────
  // Voice orb uses iframes.ai. Text chat uses BotDisplay / Centerfy.
  jenVoiceEmbedUrl: "https://iframes.ai/o/1772634390258x895947552529842200?color=10A37F&icon=activity",
  jenChatAssistantId: "1776832648133x123372887668686850",
  jenChatAccountId: "AaxopNV2Oilkahlv1kad",
  jenChatColor: "#00D4FF",
  jenChatPosition: "bottom-right",
  jenChatTheme: "dark",
  jenChatShowPrompt: false,
  jenChatAutoOpen: false,
  jenChatAssistantName: "Jen",
  jenChatButtonIcon: "alert-circle",
  jenChatGreetingMessage: "Hi there! Welcome to BODY20 East Cobb. I'm Jen, BODY20's AI assistant. I can help with questions about EMS, booking your assessment, or getting a callback from the studio.",
  hideJenFloatingButton: false,
  jenGreeting: "Hey — I'm Jen with BODY20 East Cobb. You just scanned our window. We're not a traditional gym — we deliver personalized 20-minute strength, endurance, and recovery sessions using advanced EMS technology. What caught your attention?",
  jenFooterLabel: "BODY20 East Cobb · AI Assistant",
  studioId: "body20-east-cobb",     // used in API calls

  // ─── SMS / Twilio ─────────────────────────────────────────────────────────
  // SMS notifications go to this number when someone requests a callback.
  smsNotifyNumber: "+17704506127",

  // ─── Legal / Footer ───────────────────────────────────────────────────────
  copyrightName: "BODY20 East Cobb",
};

export type StudioConfig = typeof STUDIO;
