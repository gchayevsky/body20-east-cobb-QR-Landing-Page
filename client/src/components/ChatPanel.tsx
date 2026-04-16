/*
 * ChatPanel — BODY20 QR Landing Page (multi-studio template)
 * Studio-specific values come from studio.config.ts — do not hardcode here.
 * Jen AI Assistant chat interface
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 *
 * ─────────────────────────────────────────────────────────────
 * 🔧 DEVELOPER INTEGRATION GUIDE (see also DEVELOPER_NOTES.md)
 * ─────────────────────────────────────────────────────────────
 * This component currently runs a SIMULATED conversation.
 * To connect the real AI agent (Agent 2), find the block marked:
 *   "🤖 AI AGENT INTEGRATION POINT — START"
 * and replace it with a real API call to your agent endpoint.
 *
 * State you have available:
 *   - messages: Message[]          → add to this to show new messages
 *   - setIsTyping(true/false)      → shows/hides the typing indicator
 *   - userInput: string            → current text the user typed
 *   - sessionId: string            → unique ID per visitor session (use for context)
 *
 * Example replacement (REST):
 *   const res = await fetch(import.meta.env.VITE_JEN_AGENT_API_URL, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ message: userInput, sessionId, studioId: STUDIO.studioId })
 *   });
 *   const data = await res.json();
 *   setMessages(prev => [...prev, { id: Date.now(), from: 'jen', text: data.reply }]);
 *
 * For GoHighLevel / n8n webhooks, replace the fetch URL with your webhook URL.
 * For streaming (recommended), use ReadableStream and append chunks to the last message.
 *
 * Voice mode: The "Switch to Text" button in OrbSection.tsx opens this panel.
 * For voice output, add TTS (ElevenLabs / Web Speech API) after receiving the agent reply.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { nanoid } from "nanoid";
import { STUDIO } from "../studio.config";

// Jen's avatar — AI-generated image in BODY20 gear
const JEN_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-5V83tZpAMPrgJJnm3mBiCp.webp";

interface Message {
  id: number | string;
  from: "jen" | "user";
  text: string;
}

// ============================================================
// 🤖 AI AGENT INTEGRATION POINT — START
// ============================================================
// CURRENT: Scripted demo conversation shown on panel open.
// REPLACE: Remove SCRIPTED_INTRO and the useEffect that plays it.
//          Instead, call your agent API in handleSend() below.
//          The initial greeting can be sent automatically on open
//          by calling your agent with an empty/greeting message.
// ============================================================
const SCRIPTED_INTRO: { text: string; from: "jen" | "user"; delay: number }[] = [
  {
    from: "jen",
    text: STUDIO.jenGreeting,
    delay: 600,
  },
  {
    from: "user",
    text: "I'm curious how this works.",
    delay: 2400,
  },
  {
    from: "jen",
    text: "The best way to understand it is through our Assessment. It includes a body composition scan, a coached session, and a personalized training prescription. Would you like to see availability?",
    delay: 4000,
  },
];
// ============================================================
// 🤖 AI AGENT INTEGRATION POINT — END
// ============================================================

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onBookAssessment: () => void;
}

export default function ChatPanel({ open, onClose, onBookAssessment }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showCTA, setShowCTA] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  // sessionId persists for the lifetime of this component instance
  // Pass this to your agent API so it can maintain conversation context
  const [sessionId] = useState(() => nanoid());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // 🤖 AI AGENT INTEGRATION POINT — START
  // ============================================================
  // CURRENT: Plays the scripted intro conversation on open.
  // REPLACE THIS ENTIRE useEffect with:
  //   1. Clear messages on open
  //   2. Call your agent API with a "greeting" trigger
  //   3. Display the agent's first message
  // ============================================================
  useEffect(() => {
    if (open) {
      setMessages([]);
      setShowCTA(false);
      setIsTyping(false);
      setUserInput("");
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      let msgId = 1;
      SCRIPTED_INTRO.forEach((entry) => {
        if (entry.from === "jen") {
          const typingT = setTimeout(() => setIsTyping(true), entry.delay - 900);
          const msgT = setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, { id: msgId++, from: "jen", text: entry.text }]);
          }, entry.delay);
          timeoutsRef.current.push(typingT, msgT);
        } else {
          const msgT = setTimeout(() => {
            setMessages((prev) => [...prev, { id: msgId++, from: "user", text: entry.text }]);
          }, entry.delay);
          timeoutsRef.current.push(msgT);
        }
      });

      const ctaT = setTimeout(() => setShowCTA(true), 5400);
      timeoutsRef.current.push(ctaT);
    } else {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }
    return () => { timeoutsRef.current.forEach(clearTimeout); };
  }, [open]);
  // ============================================================
  // 🤖 AI AGENT INTEGRATION POINT — END
  // ============================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showCTA]);

  // ============================================================
  // 🤖 AI AGENT INTEGRATION POINT — START
  // ============================================================
  // CURRENT: handleSend adds the user message to the UI but does NOT
  //          call any AI backend. The scripted intro already shows Jen's replies.
  //
  // REPLACE: After adding the user message, call your agent API:
  //   setIsTyping(true);
  //   const res = await fetch(import.meta.env.VITE_JEN_AGENT_API_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ message: userInput, sessionId, studioId: STUDIO.studioId })
  //   });
  //   const data = await res.json();
  //   setIsTyping(false);
  //   setMessages(prev => [...prev, { id: Date.now(), from: 'jen', text: data.reply }]);
  //
  // NOTE: Remove the scripted intro useEffect above when you do this,
  //       so the agent handles the full conversation from the start.
  // ============================================================
  const handleSend = () => {
    const text = userInput.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setUserInput("");
    // TODO: Call agent API here (see comment block above)
    // For now, show a placeholder Jen reply after a short delay
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "jen",
          text: "Great question! The best next step is to book your Assessment — it's only $49 and gives you real data about your body. Want to see available times?",
        },
      ]);
      setShowCTA(true);
    }, 1500);
    timeoutsRef.current.push(t);
  };
  // ============================================================
  // 🤖 AI AGENT INTEGRATION POINT — END
  // ============================================================

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(0.10 0.02 250 / 0.75)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed z-50 flex flex-col animate-chat-slide-up
          bottom-0 left-0 right-0 h-[88vh] rounded-t-2xl
          md:bottom-auto md:top-14 md:right-0 md:left-auto md:h-[calc(100vh-3.5rem)] md:w-[420px] md:rounded-none"
        style={{
          backgroundColor: "oklch(0.18 0.025 250)",
          borderLeft: "1px solid rgba(0, 212, 255, 0.15)",
          borderTop: "1px solid rgba(0, 212, 255, 0.15)",
        }}
      >
        {/* Panel header — Jen avatar photo */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.15)" }}
        >
          <div className="flex items-center gap-3">
            {/* Jen avatar photo */}
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid rgba(0,212,255,0.5)" }}
            >
              <img
                src={JEN_AVATAR}
                alt="Jen — BODY20 AI Assistant"
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white text-sm font-['Barlow'] font-semibold">Jen</p>
                {/* Live indicator */}
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#00D4FF" }}
                />
              </div>
              <p className="text-white/40 text-xs font-['Barlow']">{STUDIO.jenFooterLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex animate-message-appear ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "jen" && (
                <div
                  className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1"
                  style={{ border: "1.5px solid rgba(0,212,255,0.4)" }}
                >
                  <img
                    src={JEN_AVATAR}
                    alt="Jen"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm font-['Barlow'] leading-relaxed`}
                style={{
                  backgroundColor: msg.from === "jen" ? "oklch(0.22 0.025 250)" : "oklch(0.28 0.02 250)",
                  borderLeft: msg.from === "jen" ? "2px solid #00D4FF" : "none",
                  borderRadius: msg.from === "jen" ? "0 8px 8px 8px" : "8px 0 8px 8px",
                  color: msg.from === "jen" ? "white" : "rgba(255,255,255,0.85)",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-message-appear">
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1"
                style={{ border: "1.5px solid rgba(0,212,255,0.4)" }}
              >
                <img src={JEN_AVATAR} alt="Jen" className="w-full h-full object-cover object-top" draggable={false} />
              </div>
              <div
                className="px-4 py-3"
                style={{
                  backgroundColor: "oklch(0.22 0.025 250)",
                  borderLeft: "2px solid #00D4FF",
                  borderRadius: "0 8px 8px 8px",
                }}
              >
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* CTA button */}
          {showCTA && (
            <div className="flex justify-start animate-message-appear pl-9">
              <button
                onClick={onBookAssessment}
                className="b20-btn-primary text-sm mt-2"
              >
                View Assessment Times
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area — live text input */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid rgba(0, 212, 255, 0.15)" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{
              backgroundColor: "oklch(0.22 0.025 250)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Ask Jen anything..."
              className="flex-1 bg-transparent text-white text-sm font-['Barlow'] placeholder:text-white/25 outline-none border-none"
            />
            <button
              onClick={handleSend}
              disabled={!userInput.trim()}
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30"
              style={{ backgroundColor: "#00D4FF" }}
              aria-label="Send message"
            >
              <Send size={13} color="#0a0f1e" strokeWidth={2.5} />
            </button>
          </div>
          {/* Developer note visible in UI */}
          <p className="text-white/20 text-[10px] font-['Barlow'] text-center mt-2">
            Demo mode · Connect Agent 2 via DEVELOPER_NOTES.md
          </p>
        </div>
      </div>
    </>
  );
}
