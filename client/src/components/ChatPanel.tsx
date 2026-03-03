/*
 * ChatPanel — BODY20 Corporate Athletic Minimalism
 * Simulated Jen conversation — dark bg, white text, red accents
 * Slides in from bottom on mobile, right side on desktop
 * NO emoji. NO cartoon styling.
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
      // Reset state
      setVisibleMessages([]);
      setShowCTA(false);
      setIsTyping(false);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      // Schedule messages
      CONVERSATION.forEach((msg, idx) => {
        if (msg.from === "jen") {
          // Show typing indicator before Jen's message
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

      // Show CTA after final message
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
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed z-50 bg-[#0d0d0d] border border-white/10 flex flex-col animate-chat-slide-up
          bottom-0 left-0 right-0 h-[85vh] rounded-t-none
          md:bottom-auto md:top-14 md:right-0 md:left-auto md:h-[calc(100vh-3.5rem)] md:w-[420px] md:rounded-none"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Jen avatar */}
            <div className="w-8 h-8 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-['Barlow_Condensed'] font-700 uppercase">J</span>
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
                <div className="w-6 h-6 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <span className="text-white text-[10px] font-['Barlow_Condensed'] font-700">J</span>
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm font-['Barlow'] leading-relaxed ${
                  msg.from === "jen"
                    ? "bg-[#1a1a1a] text-white border-l-2 border-[#E31837]"
                    : "bg-[#2a2a2a] text-white/80"
                }`}
                style={{ borderRadius: "2px" }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-message-appear">
              <div className="w-6 h-6 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <span className="text-white text-[10px] font-['Barlow_Condensed'] font-700">J</span>
              </div>
              <div className="bg-[#1a1a1a] border-l-2 border-[#E31837] px-4 py-3" style={{ borderRadius: "2px" }}>
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

        {/* Input area — decorative, shows it's a demo */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 bg-[#1a1a1a] px-4 py-3" style={{ borderRadius: "2px" }}>
            <span className="text-white/20 text-sm font-['Barlow'] flex-1">
              Continue with Jen...
            </span>
            <button
              onClick={onBookAssessment}
              className="text-[#E31837] text-xs font-['Barlow_Condensed'] font-700 uppercase tracking-wide hover:text-white transition-colors"
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
