import type { VercelRequest, VercelResponse } from "@vercel/node";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? "AC7da31c1aca18a9fda8fbb734098d6e18";
const TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN  ?? "8c73e2ff5e88ce64ced124dd6af96cb4";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER ?? "+17708096357";
const STUDIO_PHONE       = process.env.STUDIO_PHONE       ?? "+17704506127";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, bestTime } = req.body as {
    name?: string;
    phone?: string;
    bestTime?: string;
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
      to: STUDIO_PHONE,
      body: `📞 Callback Request — QR Landing Page\nName: ${name ?? "Unknown"}\nPhone: ${phone}\nBest Time: ${bestTime ?? "No preference"}\nSource: QR Code Landing Page`,
    });

    await client.messages.create({
      from: TWILIO_FROM_NUMBER,
      to: phone,
      body: `Hi ${name ?? "there"}! We received your callback request at BODY20 East Cobb. A team member will reach out to you${bestTime ? ` during ${bestTime}` : " shortly"}. Questions? Call us: 770-450-6127`,
    });

    console.log(`[SMS] Callback request from ${phone} forwarded to studio.`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error("[SMS] Twilio error:", err?.message ?? err);
    return res.status(500).json({ success: false, error: "Failed to send SMS." });
  }
}
