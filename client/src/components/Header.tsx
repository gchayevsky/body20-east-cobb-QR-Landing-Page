/*
 * Header — BODY20 East Cobb QR Landing Page
 * Mobile-first: 100% of traffic is QR scan on mobile
 * Phone number always visible as tap-to-call link on mobile
 */

const BODY20_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-logo_3057d141.png";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "oklch(0.12 0.02 250 / 0.88)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto px-4 sm:px-6 h-14 flex items-center justify-between max-w-5xl">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={BODY20_LOGO}
            alt="BODY20 — EMS-Powered Strength Training"
            className="h-9 sm:h-11 w-auto object-contain"
            draggable={false}
          />
          <span
            className="text-white/60 text-sm font-['Barlow'] font-medium tracking-wide hidden sm:block"
            style={{ borderLeft: "1px solid rgba(0,212,255,0.3)", paddingLeft: "10px" }}
          >
            East Cobb
          </span>
        </div>

        {/* Phone — always visible on mobile as tap-to-call */}
        <a
          href="tel:7704506127"
          className="text-white/70 text-sm font-['Barlow'] font-semibold hover:text-white transition-colors"
          style={{ borderBottom: "1.5px solid #00D4FF", paddingBottom: "2px" }}
          aria-label="Call BODY20 East Cobb: 770-450-6127"
        >
          770-450-6127
        </a>
      </div>
    </header>
  );
}
