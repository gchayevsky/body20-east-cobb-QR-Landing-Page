/**
 * studio.config.ts — BODY20 Brookhaven
 * ============================================
 * This is the ONLY file that changes between studio deployments.
 * To create a new studio branch:
 *   1. git checkout -b studio/<name>
 *   2. Edit this file with the new studio's values
 *   3. Push — Vercel auto-deploys to a new URL
 *
 * DO NOT hardcode studio-specific values anywhere else in the codebase.
 * All components import from this file.
 */

export const STUDIO = {
  // ─── Identity ────────────────────────────────────────────────────────────
  name: "Brookhaven",
  fullName: "BODY20 Brookhaven",
  locationSlug: "brookhaven",

  // ─── Contact ─────────────────────────────────────────────────────────────
  phone: "404-600-4590",
  phoneTel: "+14046004590",           // tel: link format
  address: "3930 Peachtree Rd. Suite 202, Brookhaven, GA 30319",
  shoppingCenter: "Porter on Peachtree",
  website: "https://www.body20.com/location/brookhaven",
  manager: "Leslie Cohen",

  // ─── Hours ────────────────────────────────────────────────────────────────
  hours: [
    { day: "Monday – Tuesday",  time: "5:00 AM – 8:00 PM" },
    { day: "Wednesday",         time: "5:00 AM – 6:00 PM" },
    { day: "Thursday",          time: "5:00 AM – 7:00 PM" },
    { day: "Friday",            time: "5:00 AM – 6:00 PM" },
    { day: "Saturday",          time: "7:30 AM – 12:00 PM" },
    { day: "Sunday",            time: "Closed" },
  ],

  // ─── Offer ────────────────────────────────────────────────────────────────
  offerHeadline: "Book Your Risk-Free Assessment",
  offerPrice: "$49",
  offerDescription: "50% off our regular $99 assessment — includes 2 sessions. Credited toward membership if you join.",
  bookingUrl: "https://www.body20.com/location/brookhaven",
  paymentUrl: "https://www.body20.com/location/brookhaven", // TODO: replace with ClubReady join URL when available

  // ─── Pricing ──────────────────────────────────────────────────────────────
  membershipRange: "$199 – $549/month",
  perSessionRange: "~$45 – $58/session",

  // ─── Hero copy ────────────────────────────────────────────────────────────
  heroTagline: "Personalized neuromuscular training — right here in Brookhaven.",

  // ─── Jen / AI Widget ─────────────────────────────────────────────────────
  // TODO: Replace with Brookhaven-specific Centerfy embed URL when Roman delivers it.
  // Placeholder: East Cobb embed so the widget renders during development.
  jenEmbedUrl: "https://iframes.ai/o/1772634390258x895947552529842200?color=10A37F&icon=activity",
  jenGreeting: "Hey — I'm Jen with BODY20 Brookhaven. You just scanned our window. We're not a traditional gym — we deliver personalized 20-minute strength, endurance, and recovery sessions using advanced EMS technology. What caught your attention?",
  jenFooterLabel: "BODY20 Brookhaven · AI Assistant",
  studioId: "body20-brookhaven",      // used in API calls

  // ─── SMS / Twilio ─────────────────────────────────────────────────────────
  // SMS notifications go to this number when someone requests a callback.
  smsNotifyNumber: "+14046004590",

  // ─── Legal / Footer ───────────────────────────────────────────────────────
  copyrightName: "BODY20 Brookhaven",
};

export type StudioConfig = typeof STUDIO;
