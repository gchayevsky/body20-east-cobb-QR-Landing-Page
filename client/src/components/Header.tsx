/*
 * Header — BODY20 East Cobb QR Landing Page
 * Matches lead magnet site: dark navy bg, cyan "20" accent, white text
 * bg: oklch(0.15 0.02 250) with slight transparency
 */

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ backgroundColor: "oklab(0 0 0 / 0.3)", backdropFilter: "blur(12px)" }}
    >
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-5xl">
        {/* Logo — matches lead magnet site exactly */}
        <div className="flex items-center gap-2">
          <span className="font-['Barlow_Condensed'] font-800 text-xl tracking-tight text-white uppercase">
            BODY<span style={{ color: "#00D4FF" }}>20</span>
          </span>
          <span className="text-white/50 text-sm font-['Barlow'] font-400 tracking-wide">
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
