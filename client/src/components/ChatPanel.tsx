/*
 * ChatPanel — BODY20 East Cobb QR Landing Page
 * Simulated Jen conversation — deep navy bg, cyan accents, white text
 * Palette matches lead magnet site: oklch(0.15 0.02 250) bg, #00D4FF accent
 */

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Message {
  id: number;
  from: "jen" | "user";
  text: string;
  delay: number;
}

const CONVERSATION: Message[] = [
  {
    id: 1,
    from: "jen",
    text: "Hey — I'm Jen with BODY20 East Cobb. You just scanned our window. We're not a traditional gym — we deliver personalized 20-minute strength, endurance, and recovery sessions using advanced EMS technology. What caught your attention?",
    delay: 600,
  },
  {
    id: 2,
    from: "user",
    text: "I'm curious how this works.",
    delay: 2200,
  },
  {
    id: 3,
    from: "jen",
    text: "The best way to understand it is through our Assessment. It includes a body composition scan, a coached session, and a personalized training prescription. Would you like to see availability?",
    delay: 3800,
  },
];

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onBookAssessment: () => void;
}

export default function ChatPanel({ open, onClose, onBookAssessment }: ChatPanelProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showCTA, setShowCTA] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (open) {
      setVisibleMessages([]);
      setShowCTA(false);
      setIsTyping(false);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      CONVERSATION.forEach((msg) => {
        if (msg.from === "jen") {
          const typingTimeout = setTimeout(() => setIsTyping(true), msg.delay - 800);
          const msgTimeout = setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((prev) => [...prev, msg]);
          }, msg.delay);
          timeoutsRef.current.push(typingTimeout, msgTimeout);
        } else {
          const msgTimeout = setTimeout(() => {
            setVisibleMessages((prev) => [...prev, msg]);
          }, msg.delay);
          timeoutsRef.current.push(msgTimeout);
        }
      });

      const ctaTimeout = setTimeout(() => setShowCTA(true), 5200);
      timeoutsRef.current.push(ctaTimeout);
    } else {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping, showCTA]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(0.10 0.02 250 / 0.8)" }}
        onClick={onClose}
      />

      {/* Panel — deep navy, matches lead magnet */}
      <div
        className="fixed z-50 flex flex-col animate-chat-slide-up
          bottom-0 left-0 right-0 h-[85vh] rounded-t-none
          md:bottom-auto md:top-14 md:right-0 md:left-auto md:h-[calc(100vh-3.5rem)] md:w-[420px] md:rounded-none"
        style={{
          backgroundColor: "oklch(0.18 0.025 250)",
          borderLeft: "1px solid rgba(0, 212, 255, 0.15)",
          borderTop: "1px solid rgba(0, 212, 255, 0.15)",
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.15)" }}
        >
          <div className="flex items-center gap-3">
            {/* Jen avatar — cyan */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#00D4FF" }}
            >
              <span className="text-black text-xs font-['Barlow_Condensed'] font-700 uppercase">J</span>
            </div>
            <div>
              <p className="text-white text-sm font-['Barlow'] font-600">Jen</p>
              <p className="text-white/40 text-xs font-['Barlow']">BODY20 East Cobb</p>
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
          {visibleMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex animate-message-appear ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "jen" && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                  style={{ backgroundColor: "#00D4FF" }}
                >
                  <span className="text-black text-[10px] font-['Barlow_Condensed'] font-700">J</span>
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm font-['Barlow'] leading-relaxed rounded-lg ${
                  msg.from === "jen"
                    ? "text-white"
                    : "text-white/80"
                }`}
                style={{
                  backgroundColor: msg.from === "jen" ? "oklch(0.22 0.025 250)" : "oklch(0.28 0.02 250)",
                  borderLeft: msg.from === "jen" ? "2px solid #00D4FF" : "none",
                  borderRadius: msg.from === "jen" ? "0 8px 8px 8px" : "8px 0 8px 8px",
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
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                style={{ backgroundColor: "#00D4FF" }}
              >
                <span className="text-black text-[10px] font-['Barlow_Condensed'] font-700">J</span>
              </div>
              <div
                className="px-4 py-3 rounded-lg"
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
            <div className="flex justify-start animate-message-appear pl-8">
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

        {/* Input area — decorative */}
        <div
          className="px-5 py-4"
          style={{ borderTop: "1px solid rgba(0, 212, 255, 0.15)" }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{ backgroundColor: "oklch(0.22 0.025 250)" }}
          >
            <span className="text-white/20 text-sm font-['Barlow'] flex-1">
              Continue with Jen...
            </span>
            <button
              onClick={onBookAssessment}
              className="text-xs font-['Barlow'] font-600 uppercase tracking-wide hover:text-white transition-colors"
              style={{ color: "#00D4FF" }}
            >
              Book Now
            </button>
          </div>
          <p className="text-white/20 text-xs font-['Barlow'] text-center mt-2">
            Demo experience — tap Book Assessment to continue
          </p>
        </div>
      </div>
    </>
  );
}
