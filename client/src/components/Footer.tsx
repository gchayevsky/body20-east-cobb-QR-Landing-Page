/*
 * Footer — BODY20 East Cobb QR Landing Page
 * Minimal: studio info, phone, address, legal links
 * Palette: deep navy bg, cyan accent, white/gray text — matches lead magnet site
 * Official corporate legal URLs sourced from body20.com footer (March 2026)
 */

const PRIVACY_URL = "https://www.body20.com/privacy-policy?hsLang=en";
const TERMS_URL = "https://www.body20.com/terms?hsLang=en";
const PRIVACY_CHOICES_URL = "https://www.body20.com/privacy-choices?hsLang=en";

export default function Footer() {
  return (
    <footer
      className="py-10 px-6 pb-24"
      style={{
        backgroundColor: "oklch(0.13 0.02 250)",
        borderTop: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <div className="font-['Barlow_Condensed'] font-800 text-white text-xl uppercase tracking-tight mb-1">
              BODY<span style={{ color: "#00D4FF" }}>20</span>{" "}
              <span className="text-white/40 font-400 text-base">East Cobb</span>
            </div>
            <p className="text-white/30 text-xs font-['Barlow']">
              Prescription-based EMS training for strength, endurance, and recovery.
            </p>
          </div>

          {/* Contact */}
          <div className="text-right">
            <a
              href="tel:7704506127"
              className="text-white/60 text-sm font-['Barlow'] hover:text-white transition-colors block mb-1"
              style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.3)", paddingBottom: "2px" }}
            >
              770-450-6127
            </a>
            <a
              href="https://maps.google.com/?q=1100+Johnson+Ferry+Road+Suite+270+Marietta+GA+30068"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs font-['Barlow'] hover:text-white/50 transition-colors leading-relaxed block"
            >
              1100 Johnson Ferry Road, Suite 270<br />
              Marietta, GA 30068
            </a>
          </div>
        </div>

        <div className="b20-divider mt-8 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-['Barlow']">
            &copy; {new Date().getFullYear()} BODY20 East Cobb. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-xs font-['Barlow'] hover:text-white/50 transition-colors underline"
              style={{ color: "rgba(0,212,255,0.35)" }}
            >
              Privacy Policy
            </a>
            <span className="text-white/10 text-xs">·</span>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-xs font-['Barlow'] hover:text-white/50 transition-colors underline"
              style={{ color: "rgba(0,212,255,0.35)" }}
            >
              Terms {"&"} Conditions
            </a>
            <span className="text-white/10 text-xs">·</span>
            <a
              href={PRIVACY_CHOICES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 text-xs font-['Barlow'] hover:text-white/50 transition-colors underline"
              style={{ color: "rgba(0,212,255,0.35)" }}
            >
              Privacy Choices
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
