/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * Hero section with animated orb, headline, and redesigned pill-chip controls
 * Palette: deep navy bg, cyan #00D4FF accent, white text — matches lead magnet site
 * Orb auto-starts (no "Tap to Begin"). Pause/Resume toggles on same button.
 */

import { useState, useEffect } from "react";
import { Pause, Play, MessageSquare, CalendarCheck, PhoneCall } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const ORB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-orb-cyan-ZkyKqZC3uPGiX8CoHPnEQk.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [orbPaused, setOrbPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      {/* Background image — darkened to navy */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          filter: "brightness(0.12) saturate(0.4)",
        }}
      />
      {/* Gradient overlay — navy at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, oklch(0.15 0.02 250 / 0.5) 0%, transparent 40%, oklch(0.15 0.02 250) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Section label — cyan */}
        <p
          className="b20-label mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          BODY20 East Cobb
        </p>

        {/* Headline */}
        <h1
          className="font-['Barlow_Condensed'] font-extrabold text-white uppercase leading-none mb-4 transition-all duration-700"
          style={{
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            letterSpacing: "-0.01em",
            transitionDelay: "0.1s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Stronger. Fitter.<br />
          <span style={{ color: "#00D4FF" }}>In 20 Minutes.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/70 font-['Barlow'] text-lg leading-relaxed mb-10 max-w-lg transition-all duration-700"
          style={{
            transitionDelay: "0.2s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Personalized neuromuscular training and health optimization — right here in East Cobb.
        </p>

        {/* Cyan divider */}
        <div
          className="w-16 mb-10 transition-all duration-700"
          style={{
            height: "1px",
            backgroundColor: "rgba(0, 212, 255, 0.4)",
            transitionDelay: "0.25s",
            opacity: visible ? 1 : 0,
          }}
        />

        {/* ORB — auto-starts, click opens chat */}
        <div
          className="relative cursor-pointer group transition-all duration-700"
          style={{
            transitionDelay: "0.3s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
          onClick={onOrbTap}
          role="button"
          aria-label="Open Jen AI chat"
        >
          {/* Outer ambient glow — cyan, pulses when active */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "-20px",
              background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
              animation: orbPaused ? "none" : "orb-glow-pulse 3s ease-in-out infinite",
              borderRadius: "50%",
            }}
          />
          {/* Orb image */}
          <div
            className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
            style={{
              animation: orbPaused ? "none" : "orb-ring-pulse 3s ease-in-out infinite",
              filter: "drop-shadow(0 0 24px rgba(0,212,255,0.35))",
            }}
          >
            <img
              src={ORB_IMG}
              alt="BODY20 AI Orb — tap to chat with Jen"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Auto-start label — replaces "Tap to Begin" */}
        <p
          className="mt-3 text-white/45 text-xs font-['Barlow'] tracking-widest uppercase transition-all duration-700"
          style={{
            transitionDelay: "0.4s",
            opacity: visible ? 0.45 : 0,
          }}
        >
          Tap orb to chat with Jen
        </p>

        {/* ── Redesigned pill-chip orb controls ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-7 transition-all duration-700"
          style={{
            transitionDelay: "0.5s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Pause / Resume */}
          <button
            onClick={(e) => { e.stopPropagation(); setOrbPaused(!orbPaused); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,212,255,0.18)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,212,255,0.08)")}
          >
            {orbPaused
              ? <><Play size={12} strokeWidth={2.5} /> Resume</>
              : <><Pause size={12} strokeWidth={2.5} /> Pause</>
            }
          </button>

          {/* Switch to Text */}
          <button
            onClick={onOrbTap}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.75)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <MessageSquare size={12} strokeWidth={2.5} /> Switch to Text
          </button>

          {/* Book Assessment — primary cyan */}
          <button
            onClick={onBookAssessment}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-['Barlow'] font-bold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #00D4FF 0%, #00b8d9 100%)",
              border: "none",
              color: "#0a0f1e",
            }}
          >
            <CalendarCheck size={12} strokeWidth={2.5} /> Book Assessment
          </button>

          {/* Request a Call */}
          <button
            onClick={onRequestCall}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.75)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <PhoneCall size={12} strokeWidth={2.5} /> Request a Call
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-8 animate-pulse" style={{ backgroundColor: "rgba(0, 212, 255, 0.6)" }} />
      </div>
    </section>
  );
}
