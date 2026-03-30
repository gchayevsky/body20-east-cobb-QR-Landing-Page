import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import twilio from "twilio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Twilio config ────────────────────────────────────────────────────────────
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? "AC7da31c1aca18a9fda8fbb734098d6e18";
const TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN  ?? "8c73e2ff5e88ce64ced124dd6af96cb4";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER ?? "+17708096357";
const STUDIO_PHONE       = process.env.STUDIO_PHONE       ?? "+17704506127";

// Hosted PDF of the BODY20 East Cobb Longevity Roadmap
const ROADMAP_PDF_URL =
  process.env.ROADMAP_PDF_URL ??
  "https://body20east-q8rpxudg.manus.space/longevity-roadmap.pdf";

function getTwilioClient() {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) return null;
  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ─── API: Send Longevity Roadmap PDF link to lead via SMS ──────────────────
  app.post("/api/send-roadmap-sms", async (req, res) => {
    const { name, phone, email } = req.body as {
      name?: string;
      phone?: string;
      email?: string;
    };

    if (!phone) {
      return res.status(400).json({ success: false, error: "Phone number is required." });
    }

    const client = getTwilioClient();
    if (!client) {
      console.warn("[SMS] Twilio not configured — skipping SMS send.");
      return res.json({ success: true, skipped: true });
    }

    try {
      // 1. Text the LEAD their roadmap PDF link
      await client.messages.create({
        from: TWILIO_FROM_NUMBER,
        to: phone,
        body: `Hi ${name ?? "there"}! Here's your BODY20 East Cobb Longevity Roadmap: ${ROADMAP_PDF_URL}\n\nReady to experience it in person? Book your $49 Assessment: https://app.clubready.com/JoinUs/13604/640909\n\nQuestions? Call us: 770-450-6127`,
      });

      // 2. Notify the STUDIO about the new lead
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
  });

  // ─── API: Send callback request notification to studio ────────────────────
  app.post("/api/send-callback-sms", async (req, res) => {
    const { name, phone, bestTime } = req.body as {
      name?: string;
      phone?: string;
      bestTime?: string;
    };

    if (!phone) {
      return res.status(400).json({ success: false, error: "Phone number is required." });
    }

    const client = getTwilioClient();
    if (!client) {
      console.warn("[SMS] Twilio not configured — skipping SMS send.");
      return res.json({ success: true, skipped: true });
    }

    try {
      // Notify studio of callback request
      await client.messages.create({
        from: TWILIO_FROM_NUMBER,
        to: STUDIO_PHONE,
        body: `📞 Callback Request — QR Landing Page\nName: ${name ?? "Unknown"}\nPhone: ${phone}\nBest Time: ${bestTime ?? "No preference"}\nSource: QR Code Landing Page`,
      });

      // Confirm to the lead
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
  });

  // ─── Serve static files from dist/public in production ────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
