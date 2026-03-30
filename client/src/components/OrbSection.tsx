/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * Hero: single centered Jen portrait — clean, human, on-brand
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 * Jen auto-starts speaking on load. Tap her portrait or "Speak with Jen" to open chat.
 */

import { useState, useEffect } from "react";
import { Pause, Play, MessageSquare, CalendarCheck, PhoneCall } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const JEN_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden"
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
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Label */}
        <p
          className="font-['Barlow'] font-semibold uppercase tracking-widest text-xs mb-5 transition-all duration-700"
          style={{
            color: "#00D4FF",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          BODY20 East Cobb
        </p>

        {/* Headline */}
        <h1
          className="font-['Barlow_Condensed'] font-extrabold text-white uppercase leading-none mb-4 transition-all duration-700"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
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
          className="text-white/60 font-['Barlow'] text-base leading-relaxed max-w-md mx-auto mb-10 transition-all duration-700"
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
            fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
            transitionDelay: "0.24s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            marginBottom: "0.25rem",
          }}
        >
          Meet Jen,{" "}
          <span style={{ color: "#00D4FF" }}>Your BODY20 AI Guide</span>
        </p>

        {/* ── Jen Portrait ── */}
        <div
          className="flex flex-col items-center gap-5 transition-all duration-700"
          style={{
            transitionDelay: "0.28s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Portrait container */}
          <div
            className="relative cursor-pointer group"
            onClick={onOrbTap}
            role="button"
            aria-label="Speak with Jen — BODY20 AI Guide"
          >
            {/* Static ambient glow — no animation */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-28px",
                background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />

            {/* Portrait frame */}
            <div
              className="relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]"
              style={{
                width: "clamp(220px, 40vw, 340px)",
                height: "clamp(300px, 54vw, 460px)",
                borderRadius: "160px 160px 20px 20px",
                border: "2px solid rgba(0,212,255,0.4)",
                boxShadow: "0 0 60px rgba(0,212,255,0.25), 0 0 120px rgba(0,212,255,0.1)",
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
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: "linear-gradient(to top, rgba(0,212,255,0.15), transparent)",
                }}
              />
            </div>

            {/* Live indicator badge */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(13,27,42,0.85)",
                border: "1px solid rgba(0,212,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: "#00D4FF",
                }}
              />
              <span className="text-white font-['Barlow'] font-semibold text-xs">Jen</span>
              <span className="text-white/40 font-['Barlow'] text-xs">· BODY20 AI Guide</span>
            </div>
          </div>

          {/* Primary CTA — pulsing glow draws the eye */}
          <button
            onClick={onOrbTap}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-['Barlow'] font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #00b8d9 100%)",
              color: "#0a0f1e",
              boxShadow: "0 0 24px rgba(0,212,255,0.35)",
              animation: paused ? "none" : "cta-pulse 2.4s ease-in-out infinite",
            }}
          >
            <MessageSquare size={14} strokeWidth={2.5} />
            Speak with Jen
          </button>

          {/* Hint text */}
          <p className="text-white/30 font-['Barlow'] text-xs">
            Tap to start — voice or text
          </p>
        </div>

        {/* ── Secondary control chips ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-8 transition-all duration-700"
          style={{
            transitionDelay: "0.45s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {/* Pause / Resume */}
          <button
            onClick={(e) => { e.stopPropagation(); setPaused(!paused); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "#00D4FF",
            }}
          >
            {paused
              ? <><Play size={11} strokeWidth={2.5} /> Resume</>
              : <><Pause size={11} strokeWidth={2.5} /> Pause</>
            }
          </button>

          {/* Book Assessment — solid fill */}
          <button
            onClick={onBookAssessment}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-['Barlow'] font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #00b8d9 100%)",
              color: "#0a0f1e",
            }}
          >
            <CalendarCheck size={11} strokeWidth={2.5} /> Book Assessment
          </button>

          {/* Call Us — tel: link on mobile, styled button on desktop */}
          <a
            href="tel:7704506127"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95 no-underline"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <PhoneCall size={11} strokeWidth={2.5} /> Call Us
          </a>

          {/* Request a Call */}
          <button
            onClick={onRequestCall}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <PhoneCall size={11} strokeWidth={2.5} /> Request a Call
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
