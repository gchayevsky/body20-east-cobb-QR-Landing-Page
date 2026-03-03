/*
 * StickyBookingBar — BODY20 East Cobb QR Landing Page
 * Fixed bottom bar: deep navy bg, cyan-green CTA button, white text
 * Matches lead magnet site palette
 */

interface StickyBookingBarProps {
  onBook: () => void;
}

export default function StickyBookingBar({ onBook }: StickyBookingBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        backgroundColor: "oklch(0.18 0.025 250)",
        borderTop: "1px solid rgba(0, 212, 255, 0.15)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-white/50 text-xs font-['Barlow'] uppercase tracking-wide">
            BODY20 East Cobb
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="text-right hidden sm:block">
            <p className="text-white text-sm font-['Barlow'] font-600">Assessment — $49</p>
            <p className="text-white/40 text-xs font-['Barlow']">Credited toward membership if you join</p>
          </div>
          <button onClick={onBook} className="b20-btn-primary whitespace-nowrap">
            Book Your Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
