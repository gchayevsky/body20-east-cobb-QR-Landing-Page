/*
 * JenChat — BODY20 East Cobb QR Landing Page
 * ─────────────────────────────────────────────
 * Full-screen chat panel where visitors can text with Jen, BODY20's AI guide.
 *
 * Features:
 *   - Jen's portrait appears next to each of her response bubbles
 *   - Conversation is saved to the database via tRPC (chat.start / chat.sendMessage)
 *   - "Text me this conversation" button at the end sends SMS transcript via Twilio
 *   - Branded dark navy design matching the site aesthetic
 *
 * tRPC procedures used:
 *   trpc.chat.start.useMutation()           → creates session, returns sessionKey
 *   trpc.chat.sendMessage.useMutation()     → sends message, returns Jen's reply
 *   trpc.chat.end.useMutation()             → marks session ended on close
 *   trpc.chat.sendTranscript.useMutation()  → sends SMS transcript to visitor
 *
 * For Ukrainian developers:
 *   - Jen's system prompt is in server/routers.ts → JEN_SYSTEM_PROMPT constant
 *   - Update that string to change Jen's personality, knowledge, or tone
 *   - The chat history (last 10 turns) is sent with every message for context
 */

import { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare, Phone, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";

// Jen's portrait — same image used in OrbSection hero
const JEN_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface JenChatProps {
  open: boolean;
  onClose: () => void;
}

// Jen's opening message — shown immediately when chat opens
const OPENING_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm Jen, your BODY20 East Cobb guide 👋 I'm here to answer any questions about our EMS training and help you take the next step. What brings you in today?",
};

export default function JenChat({ open, onClose }: JenChatProps) {
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTranscriptForm, setShowTranscriptForm] = useState(false);
  const [transcriptPhone, setTranscriptPhone] = useState("");
  const [transcriptSent, setTranscriptSent] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startMutation = trpc.chat.start.useMutation();
  const sendMutation = trpc.chat.sendMessage.useMutation();
  const endMutation = trpc.chat.end.useMutation();
  const transcriptMutation = trpc.chat.sendTranscript.useMutation();

  // Start a session when chat opens
  useEffect(() => {
    if (open && !sessionKey) {
      startMutation.mutate(undefined, {
        onSuccess: (data) => {
          setSessionKey(data.sessionKey);
        },
        onError: (err) => {
          console.error("[JenChat] Failed to start session:", err);
        },
      });
    }
  }, [open]);

  // Reset state when chat closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setMessages([OPENING_MESSAGE]);
        setInputValue("");
        setSessionKey(null);
        setShowTranscriptForm(false);
        setTranscriptPhone("");
        setTranscriptSent(false);
        setTranscriptError("");
      }, 300);
    }
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isTyping || !sessionKey) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Build history for context (exclude opening message, last 10 turns)
    const history = messages
      .filter(m => !(m.role === "assistant" && m.content === OPENING_MESSAGE.content))
      .slice(-10);

    sendMutation.mutate(
      { sessionKey, message: text, history },
      {
        onSuccess: (data) => {
          setIsTyping(false);
          setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        },
        onError: () => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: "I'm having a little trouble right now. You can also reach us at 770-450-6127!" },
          ]);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    if (sessionKey) {
      endMutation.mutate({ sessionKey });
    }
    onClose();
  };

  const handleSendTranscript = () => {
    if (!transcriptPhone.trim() || !sessionKey) return;
    setTranscriptError("");
    transcriptMutation.mutate(
      { sessionKey, phone: transcriptPhone.trim() },
      {
        onSuccess: () => setTranscriptSent(true),
        onError: () => setTranscriptError("Couldn't send the transcript. Please try again or call us at 770-450-6127."),
      }
    );
  };

  if (!open) return null;

  const fieldStyle: React.CSSProperties = {
    backgroundColor: "oklch(0.22 0.025 250)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    borderRadius: "10px",
    color: "#ffffff",
    padding: "12px 16px",
    fontSize: "15px",
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    width: "100%",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(5, 10, 20, 0.92)" }}
        onClick={handleClose}
      />

      {/* Chat panel — full height on mobile, constrained on desktop */}
      <div
        className="fixed z-50 flex flex-col"
        style={{
          backgroundColor: "oklch(0.13 0.02 250)",
          border: "1px solid rgba(0, 212, 255, 0.18)",
          borderRadius: "20px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 24px)",
          maxWidth: "480px",
          height: "calc(100dvh - 40px)",
          maxHeight: "720px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.12)", backgroundColor: "oklch(0.16 0.025 250)" }}
        >
          {/* Jen avatar in header */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: "2px solid rgba(0, 212, 255, 0.5)" }}
          >
            <img src={JEN_AVATAR} alt="Jen" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Barlow_Condensed'] font-bold text-white text-base uppercase tracking-wide leading-tight">
              Jen
            </p>
            <p className="font-['Barlow'] text-xs" style={{ color: "#00D4FF" }}>
              BODY20 East Cobb AI Guide · Online
            </p>
          </div>
          {/* Persistent Get Transcript button — always visible in header */}
          <button
            onClick={() => setShowTranscriptForm(prev => !prev)}
            className="flex items-center gap-1.5 font-['Barlow'] text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full flex-shrink-0 transition-all"
            style={{
              border: "1px solid rgba(0, 212, 255, 0.35)",
              color: showTranscriptForm ? "#0a0f1e" : "rgba(0, 212, 255, 0.85)",
              backgroundColor: showTranscriptForm ? "#00D4FF" : "transparent",
            }}
            title="Get a text copy of this conversation"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">Transcript</span>
          </button>

          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-full flex-shrink-0"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Messages ── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          style={{ overscrollBehavior: "contain" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Jen's avatar next to her messages */}
              {msg.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1"
                  style={{ border: "1.5px solid rgba(0, 212, 255, 0.4)" }}
                >
                  <img src={JEN_AVATAR} alt="Jen" className="w-full h-full object-cover object-top" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className="max-w-[78%] rounded-2xl px-4 py-3 font-['Barlow'] text-sm leading-relaxed"
                style={
                  msg.role === "assistant"
                    ? {
                        backgroundColor: "oklch(0.20 0.03 250)",
                        border: "1px solid rgba(0, 212, 255, 0.15)",
                        color: "rgba(255,255,255,0.9)",
                        borderTopLeftRadius: "4px",
                      }
                    : {
                        background: "linear-gradient(135deg, #00D4FF, #0099BB)",
                        color: "#0a0f1e",
                        fontWeight: 500,
                        borderTopRightRadius: "4px",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 flex-row">
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1"
                style={{ border: "1.5px solid rgba(0, 212, 255, 0.4)" }}
              >
                <img src={JEN_AVATAR} alt="Jen" className="w-full h-full object-cover object-top" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-1"
                style={{
                  backgroundColor: "oklch(0.20 0.03 250)",
                  border: "1px solid rgba(0, 212, 255, 0.15)",
                  borderTopLeftRadius: "4px",
                }}
              >
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full inline-block"
                    style={{
                      backgroundColor: "#00D4FF",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Transcript request section — appears after 3+ messages */}
          {messages.length >= 5 && !showTranscriptForm && !transcriptSent && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowTranscriptForm(true)}
                className="font-['Barlow'] text-xs flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
                style={{
                  border: "1px solid rgba(0, 212, 255, 0.25)",
                  color: "rgba(0, 212, 255, 0.7)",
                  backgroundColor: "transparent",
                }}
              >
                <MessageSquare size={12} />
                Text me this conversation
              </button>
            </div>
          )}

          {/* Transcript form */}
          {showTranscriptForm && !transcriptSent && (
            <div
              className="rounded-2xl p-4 mx-1"
              style={{
                backgroundColor: "oklch(0.18 0.025 250)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              <p className="font-['Barlow'] text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                Text me this chat
              </p>
              <input
                type="tel"
                value={transcriptPhone}
                onChange={(e) => setTranscriptPhone(e.target.value)}
                placeholder="Your phone number"
                style={{ ...fieldStyle, marginBottom: "10px" }}
              />
              {transcriptError && (
                <p className="text-red-400 text-xs font-['Barlow'] mb-2">{transcriptError}</p>
              )}
              <button
                onClick={handleSendTranscript}
                disabled={transcriptMutation.isPending || !transcriptPhone.trim()}
                className="w-full font-['Barlow'] font-bold uppercase tracking-wide text-sm rounded-full py-3 transition-all disabled:opacity-50"
                style={{ background: "#00D4FF", color: "#0a0f1e" }}
              >
                {transcriptMutation.isPending ? "Sending…" : "Send Transcript"}
              </button>
            </div>
          )}

          {/* Transcript sent confirmation */}
          {transcriptSent && (
            <div className="flex justify-center">
              <p className="font-['Barlow'] text-xs text-center px-4 py-2 rounded-full" style={{ color: "#00D4FF", backgroundColor: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                ✓ Transcript sent to {transcriptPhone}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ── */}
        <div
          className="flex-shrink-0 px-4 py-4 flex items-center gap-3"
          style={{ borderTop: "1px solid rgba(0, 212, 255, 0.1)", backgroundColor: "oklch(0.16 0.025 250)" }}
        >
          {/* Call us shortcut */}
          <a
            href="tel:+17704506127"
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.25)", color: "rgba(0,212,255,0.6)" }}
            title="Call us at 770-450-6127"
          >
            <Phone size={16} />
          </a>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Jen…"
            disabled={isTyping || !sessionKey}
            className="flex-1 font-['Barlow'] text-sm outline-none bg-transparent placeholder:text-white/25"
            style={{
              color: "#ffffff",
              borderBottom: "1px solid rgba(0,212,255,0.2)",
              paddingBottom: "6px",
            }}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || !sessionKey}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-30"
            style={{ background: inputValue.trim() ? "#00D4FF" : "rgba(0,212,255,0.15)" }}
          >
            <Send size={16} style={{ color: inputValue.trim() ? "#0a0f1e" : "#00D4FF" }} />
          </button>
        </div>
      </div>

      {/* Bounce animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
