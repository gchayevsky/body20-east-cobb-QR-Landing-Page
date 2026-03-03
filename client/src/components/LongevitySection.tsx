/*
 * LongevitySection — BODY20 East Cobb QR Landing Page
 * "Not Ready to Book Yet?" — Longevity Roadmap CTA
 * Palette: slightly lighter navy card bg, cyan accent, white text — matches lead magnet
 */

interface LongevitySectionProps {
  onOpenModal: () => void;
}

export default function LongevitySection({ onOpenModal }: LongevitySectionProps) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "oklch(0.17 0.022 250)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Cyan divider */}
        <div className="b20-divider mb-12" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="b20-label mb-4">Not Ready to Book Yet?</p>
            <h2
              className="font-['Barlow_Condensed'] font-800 text-white uppercase leading-none mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Explore What's{" "}
              <span style={{ color: "#00D4FF" }}>Possible</span>
            </h2>
            <p className="text-white/60 font-['Barlow'] font-300 text-base leading-relaxed mb-8">
              Explore what's realistically possible in 3, 6, and 12 months — based on your starting point and modern longevity science.
            </p>
            <button onClick={onOpenModal} className="b20-btn-primary">
              Get the Longevity Roadmap
            </button>
          </div>

          {/* Right — roadmap milestones */}
          <div className="space-y-4">
            {[
              { period: "3 Months", desc: "Measurable strength gains, improved body composition baseline, and a training habit that fits your schedule." },
              { period: "6 Months", desc: "Significant lean muscle increase, reduced visceral fat, and improved cardiovascular markers." },
              { period: "12 Months", desc: "Comprehensive transformation in strength, endurance, recovery, and long-term healthspan metrics." },
            ].map((item) => (
              <div
                key={item.period}
                className="p-5 flex gap-4 items-start rounded-lg"
                style={{
                  backgroundColor: "oklch(0.20 0.025 250)",
                  border: "1px solid rgba(0, 212, 255, 0.12)",
                }}
              >
                <div className="flex-shrink-0">
                  <span
                    className="font-['Barlow_Condensed'] font-700 text-lg uppercase tracking-wide"
                    style={{ color: "#00D4FF" }}
                  >
                    {item.period}
                  </span>
                </div>
                <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
