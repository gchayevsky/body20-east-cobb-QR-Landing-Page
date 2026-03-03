/*
 * Footer — BODY20 Corporate Athletic Minimalism
 * Minimal: studio info, phone, address
 * Black background, white/gray text, red accent
 */

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <div className="font-['Barlow_Condensed'] font-800 text-white text-xl uppercase tracking-tight mb-1">
              BODY<span className="text-[#E31837]">20</span>{" "}
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
            >
              770-450-6127
            </a>
            <p className="text-white/30 text-xs font-['Barlow']">
              East Cobb, Georgia
            </p>
          </div>
        </div>

        <div className="b20-divider mt-8 mb-6" />

        <p className="text-white/20 text-xs font-['Barlow'] text-center">
          &copy; {new Date().getFullYear()} BODY20 East Cobb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
