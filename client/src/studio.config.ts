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
  address: "4475 Roswell Rd NE, Suite 1200, Marietta, GA 30062",
  shoppingCenter: "Merchant's Walk",
  website: "https://www.body20.com/location/east-cobb",

  // ─── Hours ────────────────────────────────────────────────────────────────
  hours: [
    { day: "Monday – Friday", time: "5:00 AM – 8:00 PM" },
    { day: "Saturday",        time: "7:00 AM – 12:00 PM" },
    { day: "Sunday",          time: "Closed" },
  ],

  // ─── Offer ────────────────────────────────────────────────────────────────
  offerHeadline: "Book Your Assessment",
  offerPrice: "$0",
  offerDescription: "Your first assessment is on us. Experience 20 minutes that changes everything.",
  bookingUrl: "https://www.body20.com/location/east-cobb",
  paymentUrl: "https://app.clubready.com/JoinUs/13604/640909",

  // ─── Hero copy ────────────────────────────────────────────────────────────
  heroTagline: "Personalized neuromuscular training — right here in East Cobb.",

  // ─── Jen / AI Widget ─────────────────────────────────────────────────────
  // Replace with the Centerfy embed URL provided by Roman for each studio.
  jenEmbedUrl: "https://iframes.ai/o/1772634390258x895947552529842200?color=10A37F&icon=activity",
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
