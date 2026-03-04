# BODY20 East Cobb — QR Landing Page
## Developer Notes: AI Agent Integration Guide

**Project Owner:** Gene Chayevsky, BODY20 East Cobb  
**Studio Phone:** 770-450-6127  
**Stack:** React 19 + TypeScript + Tailwind CSS 4 + Vite (static frontend)

---

## Overview

This landing page is designed to be a QR-code entry point for BODY20 studio visitors. The central feature is an **AI orb** that represents "Jen" — BODY20's AI assistant. When a visitor taps the orb, a chat panel opens and Jen guides them through a conversation that ends with a booking CTA.

**Your primary task:** Replace the current simulated/scripted Jen conversation with a live connection to the real AI lead-nurture agent (Agent 2).

---

## File Structure (Frontend Only)

```
client/src/
  components/
    ChatPanel.tsx         ← ⭐ PRIMARY INTEGRATION FILE — replace simulated chat here
    OrbSection.tsx        ← Orb hero section (controls, animations, Jen avatar display)
    Header.tsx            ← Top nav bar
    BookingSection.tsx    ← Demo calendar (replace with real booking embed)
    GoogleReviewStrip.tsx ← Real Google reviews (static, no changes needed)
    MemberTestimonials.tsx← Real video testimonials (static, no changes needed)
    LongevitySection.tsx  ← Longevity roadmap section
    StickyBookingBar.tsx  ← Always-visible bottom CTA bar
    CallModal.tsx         ← "Request a Call" form modal
    LongevityModal.tsx    ← "Get Longevity Roadmap" lead capture modal
    Footer.tsx            ← Footer
  pages/
    Home.tsx              ← Page layout — wires all components together
  index.css               ← Global design tokens (colors, fonts, animations)
```

---

## ⭐ Primary Integration: ChatPanel.tsx

**File:** `client/src/components/ChatPanel.tsx`

This is the **only file you need to modify** to connect the real AI agent.

### Current Behavior (Simulated)
The chat panel currently runs a scripted 3-message conversation with hardcoded delays. Look for the comment block:

```
// ============================================================
// 🤖 AI AGENT INTEGRATION POINT — START
// ============================================================
```

Everything between `AI AGENT INTEGRATION POINT — START` and `AI AGENT INTEGRATION POINT — END` is the simulated logic. **Replace this entire block** with your real API call.

### What to Replace It With

The component already has all the state and UI you need:
- `messages` — array of `{ role: 'jen' | 'user', text: string }` objects
- `setMessages()` — adds messages to the chat
- `setIsTyping(true/false)` — shows/hides the typing indicator
- `userInput` — the current text the user has typed
- `handleSend()` — called when user hits Send

**Replace the simulated logic with a real API call like this:**

```typescript
// Example: REST API call to your AI agent endpoint
const sendToAgent = async (userMessage: string) => {
  setIsTyping(true);
  try {
    const response = await fetch('YOUR_AGENT_API_ENDPOINT_HERE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        sessionId: sessionId, // use nanoid() to generate a session ID per visitor
        studioId: 'body20-east-cobb',
        agentId: 'jen-agent-2',
      }),
    });
    const data = await response.json();
    setMessages(prev => [...prev, { role: 'jen', text: data.reply }]);
  } catch (err) {
    setMessages(prev => [...prev, { role: 'jen', text: 'Sorry, I had trouble connecting. Please call us at 770-450-6127.' }]);
  } finally {
    setIsTyping(false);
  }
};
```

**For streaming responses (recommended for natural feel):**
```typescript
// Use EventSource or fetch with ReadableStream for streaming
const response = await fetch('YOUR_STREAMING_ENDPOINT', { ... });
const reader = response.body?.getReader();
// Append chunks to the last message as they arrive
```

**For WebSocket / GoHighLevel / n8n webhook:**
- GoHighLevel: Use their Conversation AI webhook URL
- n8n: Use the webhook trigger node URL
- Custom backend: Any REST or WebSocket endpoint works

### Voice Mode
The "Switch to Text" button in `OrbSection.tsx` currently opens the text chat panel. For **voice mode** (Jen speaking out loud), you will need to:
1. Add a Web Speech API integration OR connect to ElevenLabs / Azure TTS
2. The toggle button is already wired — just add the voice logic in `OrbSection.tsx` where the `onOrbTap` prop is called

---

## Secondary Integration: BookingSection.tsx

**File:** `client/src/components/BookingSection.tsx`

The calendar is currently a **demo UI** (no real bookings are made). To replace it:

1. Get the embed code from your booking system (Mindbody, Acuity, ClubReady, etc.)
2. Find the comment: `{/* BOOKING CALENDAR EMBED — Replace demo calendar with real embed */}`
3. Replace the demo calendar JSX with an `<iframe>` or the booking widget's `<script>` embed

---

## Secondary Integration: Lead Capture Forms

**Files:** `client/src/components/CallModal.tsx` and `LongevityModal.tsx`

Both modals currently show a success message without sending data anywhere. To wire them up:

1. Add a `fetch()` POST to your CRM (GoHighLevel, HubSpot, etc.) inside the `handleSubmit` function
2. Look for the comment: `// TODO: Send form data to CRM / GoHighLevel webhook`
3. The form fields are: `name`, `phone`, `bestTime` (CallModal) and `name`, `email` (LongevityModal)

---

## Environment Variables

For API keys and endpoints, add them to a `.env` file at the project root:

```bash
VITE_JEN_AGENT_API_URL=https://your-agent-endpoint.com/chat
VITE_GHL_WEBHOOK_URL=https://hooks.gohighlevel.com/...
VITE_BOOKING_URL=https://app.clubready.com/JoinUs/13604/640909
```

Access in code with `import.meta.env.VITE_JEN_AGENT_API_URL`.

**Important:** All env variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Design System

Do not change colors or fonts. The design tokens are in `client/src/index.css`:
- Background: `oklch(0.15 0.02 250)` — deep navy
- Accent: `#00D4FF` — BODY20 cyan
- Primary button: `oklch(0.85 0.2 195)` — bright cyan-green
- Headlines: `Barlow Condensed` (Google Fonts, already loaded)
- Body: `Barlow` (Google Fonts, already loaded)

---

## Running Locally

```bash
cd body20-east-cobb
pnpm install
pnpm dev
# Open http://localhost:3000
```

## Building for Production

```bash
pnpm build
# Output is in dist/
```

---

*Questions? Contact Gene Chayevsky via GitHub issues on this repo.*
