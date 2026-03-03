/*
 * Header — BODY20 Corporate Athletic Minimalism
 * Minimal: logo left, no nav, no menu
 * Black background, white BODY20 text, red accent on "20"
 */

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/5">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-5xl">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-['Barlow_Condensed'] font-800 text-xl tracking-tight text-white uppercase">
            BODY<span className="text-[#E31837]">20</span>
          </span>
          <span className="text-white/40 text-sm font-['Barlow'] font-400 tracking-wide">
            East Cobb
          </span>
        </div>

        {/* Studio info */}
        <a
          href="tel:7704506127"
          className="text-white/50 text-sm font-['Barlow'] hover:text-white transition-colors hidden sm:block"
        >
          770-450-6127
        </a>
      </div>
    </header>
  );
}
