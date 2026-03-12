/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * ─────────────────────────────────────────────
 * Design: Deep navy bg, cyan #00D4FF accent, white text
 * Mobile-first: 100% of traffic is mobile (QR scan)
 *
 * Interaction flow (browser-safe):
 *  1. Page loads → Jen portrait + iframes.ai widget visible immediately
 *  2. A pulsing "Tap the button above to speak with Jen" hint arrow points to the widget
 *  3. User taps the widget's own green button → voice activates (browser gesture satisfied)
 *  4. Hint arrow disappears after first tap on the widget area
 *
 * WHY NO OVERLAY:
 *  Browsers (especially iOS Safari) require the user's tap to land DIRECTLY on the
 *  iframe element to grant microphone + audio autoplay. An overlay intercepts the gesture
 *  before it reaches the iframe, so the widget never activates. The fix is to show the
 *  iframe immediately and guide the user to tap it directly.
 */

import { useState, useEffect } from "react";
import { CalendarCheck, PhoneCall, ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const JEN_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [visible, setVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    // Fade in page content
    const t1 = setTimeout(() => setVisible(true), 80);
    // Show hint arrow after 1.5s
    const t2 = setTimeout(() => setHintVisible(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Dismiss hint when user taps anywhere near the widget
  const handleWidgetAreaTap = () => {
    setHintDismissed(true);
    setHintVisible(false);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      {/* Background image — heavily darkened */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          filter: "brightness(0.08) saturate(0.2)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, oklch(0.15 0.02 250) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-5 flex flex-col items-center text-center">

        {/* Location label */}
        <p
          className="font-['Barlow'] font-semibold uppercase tracking-widest text-xs mb-4 transition-all duration-700"
          style={{
            color: "#00D4FF",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          BODY20 East Cobb
        </p>

        {/* Headline — mobile-optimized size */}
        <h1
          className="font-['Barlow_Condensed'] font-extrabold text-white uppercase leading-none mb-3 transition-all duration-700"
          style={{
            fontSize: "clamp(2.4rem, 11vw, 5rem)",
            letterSpacing: "-0.01em",
            transitionDelay: "0.1s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Stronger. Fitter.<br />
          <span style={{ color: "#00D4FF" }}>In 20 Minutes.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-white/60 font-['Barlow'] text-sm leading-relaxed max-w-xs mx-auto mb-8 transition-all duration-700"
          style={{
            transitionDelay: "0.18s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Personalized neuromuscular training — right here in East Cobb.
        </p>

        {/* ── Meet Jen headline ── */}
        <p
          className="font-['Barlow_Condensed'] font-bold uppercase text-white tracking-wide transition-all duration-700"
          style={{
            fontSize: "clamp(1rem, 4.5vw, 1.4rem)",
            transitionDelay: "0.24s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            marginBottom: "0.3rem",
          }}
        >
          Meet Jen,{" "}
          <span style={{ color: "#00D4FF" }}>Your BODY20 AI Guide</span>
        </p>

        {/* ── Jen Portrait + Widget ── */}
        <div
          className="flex flex-col items-center gap-4 w-full transition-all duration-700"
          style={{
            transitionDelay: "0.28s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Portrait container */}
          <div className="relative">
            {/* Static ambient glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-24px",
                background: "radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />

            {/* Portrait frame — mobile-optimized size */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "clamp(180px, 48vw, 300px)",
                height: "clamp(240px, 64vw, 400px)",
                borderRadius: "140px 140px 16px 16px",
                border: "2px solid rgba(0,212,255,0.4)",
                boxShadow: "0 0 50px rgba(0,212,255,0.2), 0 0 100px rgba(0,212,255,0.08)",
              }}
            >
              <img
                src={JEN_FULL}
                alt="Jen — BODY20 AI Guide"
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
              {/* Subtle cyan bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{
                  background: "linear-gradient(to top, rgba(0,212,255,0.12), transparent)",
                }}
              />
            </div>

            {/* Live indicator badge */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: "rgba(13,27,42,0.88)",
                border: "1px solid rgba(0,212,255,0.3)",
                backdropFilter: "blur(8px)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#00D4FF" }} />
              <span className="text-white font-['Barlow'] font-semibold text-xs">Jen</span>
              <span className="text-white/40 font-['Barlow'] text-xs">· BODY20 AI Guide</span>
            </div>
          </div>

          {/* ── Hint label above widget ── */}
          {!hintDismissed && (
            <div
              className="flex flex-col items-center gap-1 transition-all duration-500"
              style={{
                opacity: hintVisible ? 1 : 0,
                transform: hintVisible ? "translateY(0)" : "translateY(-8px)",
              }}
            >
              <p
                className="font-['Barlow_Condensed'] font-bold uppercase tracking-wide"
                style={{
                  color: "#00D4FF",
                  fontSize: "0.95rem",
                  animation: hintVisible ? "cta-pulse 2.2s ease-in-out infinite" : "none",
                }}
              >
                Tap the green button to speak with Jen
              </p>
              {/* Bouncing arrow pointing down to the widget */}
              <ChevronDown
                size={22}
                color="#00D4FF"
                strokeWidth={2.5}
                style={{ animation: hintVisible ? "bounce-down 1.2s ease-in-out infinite" : "none" }}
              />
            </div>
          )}

          {/* ── iframes.ai voice agent widget ── */}
          {/* The iframe is always visible so the user's tap lands directly on it.
              This is required by browsers (especially iOS Safari) to grant microphone
              and audio autoplay permissions. An overlay blocking the iframe prevents activation. */}
          <div
            className="w-full"
            style={{ maxWidth: "clamp(280px, 88vw, 400px)" }}
            onClick={handleWidgetAreaTap}
          >
            <iframe
              src="https://iframes.ai/o/1772634390258x895947552529842200?color=10A37F&icon=activity"
              allow="microphone"
              style={{
                width: "100%",
                height: "200px",
                border: "none",
                borderRadius: "16px",
                display: "block",
              }}
              id="assistantFrame"
              title="Speak with Jen — BODY20 AI Guide"
              onLoad={() => {
                navigator.permissions?.query({ name: "microphone" as PermissionName })
                  .then(result => { console.log("Microphone permission:", result.state); })
                  .catch(() => {});
              }}
            />
          </div>

          {/* ── Post-hint conversation prompt ── */}
          {hintDismissed && (
            <div
              className="w-full rounded-xl px-5 py-4 text-center"
              style={{
                maxWidth: "clamp(280px, 88vw, 400px)",
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.2)",
                animation: "fade-in-up 0.6s ease forwards",
              }}
            >
              <p className="text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-base mb-1">
                Ask Jen Anything
              </p>
              <p className="text-white/50 font-['Barlow'] text-xs leading-relaxed">
                Speak or type — Jen can answer questions, explain EMS, and help you book your free assessment.
              </p>
            </div>
          )}
        </div>

        {/* ── Secondary control chips ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-7 transition-all duration-700"
          style={{
            transitionDelay: "0.45s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {/* Book Assessment — solid fill, large tap target */}
          <button
            onClick={onBookAssessment}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-['Barlow'] font-bold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95"
            style={{
              background: "#00D4FF",
              color: "#0a0f1e",
              minHeight: "44px",
              animation: "cta-pulse 2.4s ease-in-out infinite",
            }}
          >
            <CalendarCheck size={16} strokeWidth={2.5} />
            Book Free Assessment
          </button>

          {/* Call us — ghost style */}
          <a
            href="tel:+17704506127"
            className="flex items-center gap-2 px-5 py-3 rounded-full font-['Barlow'] font-semibold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)",
              minHeight: "44px",
            }}
          >
            <PhoneCall size={15} strokeWidth={2} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
