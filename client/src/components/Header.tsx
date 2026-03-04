/*
 * Header — BODY20 East Cobb QR Landing Page
 * Matches lead magnet site: dark navy bg, cyan "20" accent, white text
 * bg: oklch(0.15 0.02 250) with slight transparency
 */

const BODY20_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-logo_3057d141.png";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "oklch(0.12 0.02 250 / 0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-5xl">
        {/* Logo — uploaded BODY20 logo image */}
        <div className="flex items-center gap-3">
          <img
            src={BODY20_LOGO}
            alt="BODY20 — EMS-Powered Strength Training"
            className="h-8 w-auto object-contain"
            draggable={false}
          />
          <span
            className="text-white/50 text-sm font-['Barlow'] font-400 tracking-wide hidden sm:block"
            style={{ borderLeft: "1px solid rgba(0,212,255,0.3)", paddingLeft: "12px" }}
          >
            East Cobb
          </span>
        </div>

        {/* Phone */}
        <a
          href="tel:7704506127"
          className="text-white/60 text-sm font-['Barlow'] hover:text-white transition-colors hidden sm:block"
          style={{ borderBottom: "2px solid #00D4FF", paddingBottom: "2px" }}
        >
          770-450-6127
        </a>
      </div>
    </header>
  );
}
