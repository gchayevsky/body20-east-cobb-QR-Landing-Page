import type { VercelRequest, VercelResponse } from "@vercel/node";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? "AC7da31c1aca18a9fda8fbb734098d6e18";
const TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN  ?? "8c73e2ff5e88ce64ced124dd6af96cb4";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER ?? "+17708096357";
const STUDIO_PHONE       = process.env.STUDIO_PHONE       ?? "+17704506127";
const ROADMAP_PDF_URL    =
  process.env.ROADMAP_PDF_URL ??
  "https://body20east-q8rpxudg.manus.space/longevity-roadmap.pdf";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email } = req.body as {
    name?: string;
    phone?: string;
    email?: string;
  };

  if (!phone) {
    return res.status(400).json({ success: false, error: "Phone number is required." });
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.warn("[SMS] Twilio not configured — skipping SMS send.");
    return res.json({ success: true, skipped: true });
  }

  try {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    await client.messages.create({
      from: TWILIO_FROM_NUMBER,
      to: phone,
      body: `Hi ${name ?? "there"}! Congratulations! Your BODY20 Longevity Roadmap is ready for your review: ${ROADMAP_PDF_URL}\n\nTo see how BODY20 can be an integral part of this Roadmap, book your Assessment here: https://www.body20.com/location/east-cobb\n\nQuestions? Call us: 770-450-6127`,
    });

    await client.messages.create({
      from: TWILIO_FROM_NUMBER,
      to: STUDIO_PHONE,
      body: `📋 New QR Lead — Longevity Roadmap Request\nName: ${name ?? "Unknown"}\nPhone: ${phone}\nEmail: ${email ?? "Not provided"}\nSource: QR Code Landing Page`,
    });

    console.log(`[SMS] Roadmap sent to ${phone}, studio notified.`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error("[SMS] Twilio error:", err?.message ?? err);
    return res.status(500).json({ success: false, error: "Failed to send SMS." });
  }
}
