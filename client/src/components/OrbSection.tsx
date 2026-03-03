/*
 * OrbSection — BODY20 East Cobb QR Landing Page
 * Hero section with animated orb, headline, and orb controls
 * Palette: deep navy bg, cyan #00D4FF accent, white text — matches lead magnet site
 */

import { useState } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-hero-bg-n9nwdLwf3iGS2b3y4SuW5X.webp";
const ORB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-orb-visual-ZD8tb9cdMYYZEmTyDPNhNL.webp";

interface OrbSectionProps {
  onOrbTap: () => void;
  onRequestCall: () => void;
  onBookAssessment: () => void;
}

export default function OrbSection({ onOrbTap, onRequestCall, onBookAssessment }: OrbSectionProps) {
  const [orbPaused, setOrbPaused] = useState(false);

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
          filter: "brightness(0.15) saturate(0.5)",
        }}
      />
      {/* Gradient overlay — navy at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, oklch(0.15 0.02 250 / 0.6) 0%, transparent 40%, oklch(0.15 0.02 250) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Section label — cyan */}
        <p className="b20-label mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
          BODY20 East Cobb
        </p>

        {/* Headline */}
        <h1
          className="font-['Barlow_Condensed'] font-extrabold text-white uppercase leading-none mb-4 animate-fade-in-up"
          style={{
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            letterSpacing: "-0.01em",
            animationDelay: "0.2s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          Stronger. Fitter.<br />
          <span style={{ color: "#00D4FF" }}>In 20 Minutes.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/70 font-['Barlow'] font-300 text-lg leading-relaxed mb-12 max-w-lg animate-fade-in-up"
          style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
        >
          Personalized neuromuscular training and health optimization — right here in East Cobb.
        </p>

        {/* Cyan divider */}
        <div
          className="w-16 mb-12 animate-fade-in-up"
          style={{
            height: "1px",
            backgroundColor: "rgba(0, 212, 255, 0.5)",
            animationDelay: "0.4s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        />

        {/* ORB */}
        <div
          className="relative cursor-pointer group animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
          onClick={onOrbTap}
          role="button"
          aria-label="Tap to begin"
        >
          {/* Outer pulse ring — cyan */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              animation: orbPaused ? "none" : "orb-pulse 3s ease-in-out infinite",
              borderRadius: "50%",
            }}
          />
          {/* Orb image */}
          <div
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
            style={{
              animation: orbPaused ? "none" : "orb-ring-pulse 3s ease-in-out infinite",
            }}
          >
            <img
              src={ORB_IMG}
              alt="BODY20 Orb"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* TAP TO BEGIN label */}
        <p
          className="mt-4 text-white/50 text-xs font-['Barlow'] font-500 tracking-widest uppercase animate-fade-in-up"
          style={{ animationDelay: "0.65s", opacity: 0, animationFillMode: "forwards" }}
        >
          Tap to Begin
        </p>

        {/* Orb micro-controls */}
        <div
          className="flex items-center gap-6 mt-6 animate-fade-in-up"
          style={{ animationDelay: "0.75s", opacity: 0, animationFillMode: "forwards" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOrbPaused(!orbPaused); }}
            className="text-white/40 text-xs font-['Barlow'] font-500 tracking-wide uppercase hover:text-white/70 transition-colors"
          >
            {orbPaused ? "Resume" : "Pause"}
          </button>
          <span className="text-white/20 text-xs">|</span>
          <button
            onClick={onOrbTap}
            className="text-white/40 text-xs font-['Barlow'] font-500 tracking-wide uppercase hover:text-white/70 transition-colors"
          >
            Switch to Text
          </button>
          <span className="text-white/20 text-xs">|</span>
          <button
            onClick={onBookAssessment}
            className="text-white/40 text-xs font-['Barlow'] font-500 tracking-wide uppercase hover:text-white/70 transition-colors"
          >
            Book Assessment
          </button>
          <span className="text-white/20 text-xs">|</span>
          <button
            onClick={onRequestCall}
            className="text-white/40 text-xs font-['Barlow'] font-500 tracking-wide uppercase hover:text-white/70 transition-colors"
          >
            Request a Call
          </button>
        </div>

        {/* Request human option */}
        <div
          className="mt-10 animate-fade-in-up"
          style={{ animationDelay: "0.85s", opacity: 0, animationFillMode: "forwards" }}
        >
          <p className="text-white/40 text-sm font-['Barlow'] mb-3">
            Prefer to speak with someone directly?
          </p>
          <button
            onClick={onRequestCall}
            className="b20-btn-outline text-sm"
          >
            Request a Call from the Studio
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
