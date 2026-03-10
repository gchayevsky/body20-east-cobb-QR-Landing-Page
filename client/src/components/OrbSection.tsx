/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * ─────────────────────────────────────────────
 * Design: Deep navy bg, cyan #00D4FF accent, white text
 * Mobile-first: 100% of traffic is mobile (QR scan)
 *
 * Interaction flow:
 *  1. Page loads → 2.5s delay → "Tap to hear from Jen" overlay pulses
 *  2. Lead taps overlay → overlay fades out → iframe widget activates
 *  3. While Jen speaks → Pause button visible
 *  4. After monologue → clear "Ask Jen anything" prompt visible
 */

import { useState, useEffect, useRef } from "react";
import { CalendarCheck, PhoneCall, Mic, MicOff } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const JEN_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [visible, setVisible] = useState(false);
  // Overlay states: "waiting" → show after delay, "ready" → pulsing tap prompt, "loading" → initializing animation, "active" → dismissed
  const [overlayState, setOverlayState] = useState<"waiting" | "ready" | "loading" | "active">("waiting");
  const [jenSpeaking, setJenSpeaking] = useState(false);
  const [jenDone, setJenDone] = useState(false);
  const [iframePaused, setIframePaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Fade in page content
    const t1 = setTimeout(() => setVisible(true), 80);
    // Show tap overlay after 2.5s
    const t2 = setTimeout(() => setOverlayState("ready"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleTapOverlay = () => {
    // Step 1: show loading animation
    setOverlayState("loading");
    // Step 2: after ~2.5s loading, dismiss overlay and start Jen
    setTimeout(() => {
      setOverlayState("active");
      setJenSpeaking(true);
      // Simulate monologue duration ~28s then show conversation prompt
      setTimeout(() => {
        setJenSpeaking(false);
        setJenDone(true);
      }, 28000);
    }, 2500);
  };

  const handlePauseResume = () => {
    setIframePaused(p => !p);
    // Send postMessage to iframe — iframes.ai may support this
    iframeRef.current?.contentWindow?.postMessage(
      iframePaused ? { type: "resume" } : { type: "pause" },
      "*"
    );
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

        {/* ── Jen Portrait ── */}
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

          {/* ── Jen AI Voice Widget + Overlay ── */}
          <div
            className="relative w-full"
            style={{ maxWidth: "clamp(280px, 88vw, 400px)" }}
          >
            {/* iframes.ai voice agent widget */}
            <iframe
              ref={iframeRef}
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

            {/* ── Tap-to-Start Overlay ── */}
            {/* Shows 2.5s after load, pulses to invite tap, dismisses on tap */}
            {(overlayState === "waiting" || overlayState === "ready") && (
              <button
                onClick={handleTapOverlay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-500"
                style={{
                  background: "rgba(10,15,30,0.92)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  opacity: overlayState === "ready" ? 1 : 0,
                  pointerEvents: overlayState === "ready" ? "auto" : "none",
                  cursor: "pointer",
                }}
                aria-label="Tap to hear Jen's introduction"
              >
                {/* Pulsing mic icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    border: "2px solid rgba(0,212,255,0.6)",
                    animation: overlayState === "ready" ? "cta-pulse 2s ease-in-out infinite" : "none",
                  }}
                >
                  <Mic size={24} color="#00D4FF" strokeWidth={2} />
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide" style={{ fontSize: "1.1rem" }}>
                    Tap to Hear from Jen
                  </p>
                  <p className="text-white/45 font-['Barlow'] text-xs mt-1">
                    Jen will introduce herself and guide you
                  </p>
                </div>
              </button>
            )}

            {/* ── Loading Animation Overlay ── */}
            {/* Appears after tap while voice widget initializes (~2.5s) */}
            {overlayState === "loading" && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl"
                style={{
                  background: "rgba(10,15,30,0.95)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,212,255,0.25)",
                }}
              >
                {/* Animated concentric rings */}
                <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
                  {/* Outer ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 72, height: 72,
                      border: "2px solid rgba(0,212,255,0.15)",
                      animation: "jen-ring-spin 2s linear infinite",
                    }}
                  />
                  {/* Middle ring — faster, opposite direction */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 52, height: 52,
                      border: "2px solid rgba(0,212,255,0.35)",
                      borderTopColor: "#00D4FF",
                      animation: "jen-ring-spin 1.2s linear infinite reverse",
                    }}
                  />
                  {/* Inner dot */}
                  <div
                    className="rounded-full"
                    style={{
                      width: 12, height: 12,
                      backgroundColor: "#00D4FF",
                      animation: "cta-pulse 1.4s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Animated waveform bars */}
                <div className="flex items-end gap-1" style={{ height: 24 }}>
                  {[0.6, 1.0, 0.7, 1.0, 0.5, 0.9, 0.6].map((h, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 4,
                        backgroundColor: "#00D4FF",
                        animation: `jen-wave 0.8s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.1}s`,
                        height: `${h * 24}px`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>

                <div className="text-center px-6">
                  <p className="text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide" style={{ fontSize: "1rem" }}>
                    Connecting to Jen
                  </p>
                  <p className="text-white/40 font-['Barlow'] text-xs mt-1">
                    Initializing voice assistant…
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Pause button — visible while Jen is speaking ── */}
          {jenSpeaking && (
            <button
              onClick={handlePauseResume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 active:scale-95"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.35)",
                color: "#00D4FF",
              }}
            >
              {iframePaused
                ? <><Mic size={14} strokeWidth={2.5} /> Resume Jen</>
                : <><MicOff size={14} strokeWidth={2.5} /> Pause Jen</>
              }
            </button>
          )}

          {/* ── Post-monologue conversation prompt ── */}
          {jenDone && (
            <div
              className="w-full rounded-xl px-5 py-4 text-center transition-all duration-700"
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

          {/* Hint text — shown when overlay is active and Jen hasn't started yet */}
          {overlayState === "active" && !jenSpeaking && !jenDone && (
            <p className="text-white/30 font-['Barlow'] text-xs">
              Voice or text — Jen is ready
            </p>
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
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-['Barlow'] font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #00b8d9 100%)",
              color: "#0a0f1e",
              minHeight: "44px",
            }}
          >
            <CalendarCheck size={14} strokeWidth={2.5} /> Book Assessment
          </button>

          {/* Request a Call — large tap target */}
          <button
            onClick={onRequestCall}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.65)",
              minHeight: "44px",
            }}
          >
            <PhoneCall size={14} strokeWidth={2.5} /> Request a Call
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20">
        <div className="w-px h-8 animate-pulse" style={{ backgroundColor: "rgba(0,212,255,0.6)" }} />
      </div>
    </section>
  );
}
