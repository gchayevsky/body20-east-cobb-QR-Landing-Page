/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * Hero section: AI orb (left) + Jen full-height portrait (right), side by side
 * Palette: deep navy bg, cyan #00D4FF accent, white text — matches lead magnet site
 * Orb auto-starts. Pause/Resume toggles on same button.
 */

import { useState, useEffect } from "react";
import { Pause, Play, MessageSquare, CalendarCheck, PhoneCall } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const ORB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-ai-orb-v3-NRiwf4sajgNFojuXLwtfXm.webp";
const JEN_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [orbPaused, setOrbPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      {/* Background image — heavily darkened */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          filter: "brightness(0.1) saturate(0.3)",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, oklch(0.15 0.02 250 / 0.6) 0%, transparent 40%, oklch(0.15 0.02 250) 100%)",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

        {/* Top text block */}
        <div
          className="text-center mb-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <p className="b20-label mb-4">BODY20 East Cobb</p>
          <h1
            className="font-['Barlow_Condensed'] font-extrabold text-white uppercase leading-none mb-3"
            style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)", letterSpacing: "-0.01em" }}
          >
            Stronger. Fitter.<br />
            <span style={{ color: "#00D4FF" }}>In 20 Minutes.</span>
          </h1>
          <p className="text-white/65 font-['Barlow'] text-base leading-relaxed max-w-lg mx-auto">
            Personalized neuromuscular training and health optimization — right here in East Cobb.
          </p>
        </div>

        {/* ── Side-by-side: ORB (left) + JEN (right) ── */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full transition-all duration-700"
          style={{
            transitionDelay: "0.25s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* ── LEFT: AI Orb ── */}
          <div className="flex flex-col items-center gap-4">
            {/* Orb label */}
            <p
              className="text-xs font-['Barlow'] font-semibold uppercase tracking-widest"
              style={{ color: "rgba(0,212,255,0.6)" }}
            >
              AI Concierge
            </p>

            {/* Orb clickable */}
            <div
              className="relative cursor-pointer group"
              onClick={onOrbTap}
              role="button"
              aria-label="Open Jen AI chat"
            >
              {/* Ambient glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-32px",
                  background: "radial-gradient(circle, rgba(0,212,255,0.22) 0%, transparent 70%)",
                  animation: orbPaused ? "none" : "orb-glow-pulse 3s ease-in-out infinite",
                  borderRadius: "50%",
                }}
              />
              {/* Orb image */}
              <div
                className="relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
                style={{
                  width: "clamp(220px, 28vw, 320px)",
                  height: "clamp(220px, 28vw, 320px)",
                  animation: orbPaused ? "none" : "orb-ring-pulse 3s ease-in-out infinite",
                  filter: "drop-shadow(0 0 36px rgba(0,212,255,0.5))",
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

            {/* "Tap to chat" hint */}
            <p
              className="text-xs font-['Barlow'] animate-pulse"
              style={{ color: "rgba(0,212,255,0.5)" }}
            >
              Tap orb to chat with Jen
            </p>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.25), transparent)" }}
          />

          {/* ── RIGHT: Jen full-height portrait ── */}
          <div
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={onOrbTap}
            role="button"
            aria-label="Chat with Jen"
          >
            {/* Jen label */}
            <p
              className="text-xs font-['Barlow'] font-semibold uppercase tracking-widest"
              style={{ color: "rgba(0,212,255,0.6)" }}
            >
              Meet Jen · Your BODY20 Guide
            </p>

            {/* Jen portrait */}
            <div
              className="relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                width: "clamp(180px, 22vw, 260px)",
                height: "clamp(270px, 33vw, 390px)",
                borderRadius: "120px 120px 16px 16px",
                border: "2px solid rgba(0,212,255,0.35)",
                boxShadow: "0 0 40px rgba(0,212,255,0.2), inset 0 0 0 1px rgba(0,212,255,0.1)",
              }}
            >
              <img
                src={JEN_FULL}
                alt="Jen — BODY20 AI Assistant"
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
              {/* Subtle cyan gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{
                  background: "linear-gradient(to top, rgba(0,212,255,0.12), transparent)",
                }}
              />
            </div>

            {/* Jen name + live indicator */}
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ backgroundColor: "#00D4FF" }}
              />
              <span className="text-white font-['Barlow'] font-semibold text-sm">Jen</span>
              <span className="text-white/40 font-['Barlow'] text-xs">· BODY20 AI</span>
            </div>
          </div>
        </div>

        {/* ── Pill-chip orb controls ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-8 transition-all duration-700"
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-8 animate-pulse" style={{ backgroundColor: "rgba(0, 212, 255, 0.6)" }} />
      </div>
    </section>
  );
}
