/*
 * AuthorityQuotes — BODY20 East Cobb QR Landing Page
 * Three expert quotes covering the full BODY20 Triad: Strength · Endurance · Restore
 * Gary Brecka (strength/muscle), Peter Attia #1 (muscle/longevity), Peter Attia #2 (VO2 max/endurance)
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 */

const quotes = [
  {
    quote:
      "Muscle isn't just about aesthetics — it's a longevity organ. Strength training builds muscle to protect joints, increases bone density, boosts metabolism, and enhances cognitive function. Your future self will thank you.",
    name: "Gary Brecka",
    title: "Human Biologist · Host, The Ultimate Human Podcast",
    initials: "GB",
    tag: "Strength",
  },
  {
    quote:
      "If you have the aspiration of kicking ass when you're 85, you can't afford to be average when you're 50. You've got to be strong. You've got to have muscle mass to accompany that strength.",
    name: "Dr. Peter Attia",
    title: "Longevity Physician · Author, Outlive",
    initials: "PA",
    tag: "Strength",
  },
  {
    quote:
      "Your VO₂ max is more strongly correlated with your lifespan than any other metric I can measure. It predicts your risk of death from any cause, even more than your blood pressure, cholesterol, or smoking status.",
    name: "Dr. Peter Attia",
    title: "Longevity Physician · CBS 60 Minutes, 2025",
    initials: "PA",
    tag: "Endurance",
  },
];

export default function AuthorityQuotes() {
  return (
    <section
      className="py-12 px-4 sm:px-6"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <p
          className="font-['Barlow'] font-semibold uppercase tracking-widest text-xs mb-4 text-center"
          style={{ color: "#00D4FF" }}
        >
          What the Experts Say
        </p>

        {/* Headline */}
        <h2
          className="font-['Barlow_Condensed'] font-extrabold uppercase text-white text-center leading-none mb-4"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)" }}
        >
          Strength. Endurance. Recovery.{" "}
          <span style={{ color: "#00D4FF" }}>The Science Is Clear.</span>
        </h2>

        {/* Sub-copy */}
        <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed text-center max-w-xl mx-auto mb-8">
          The world's leading longevity experts agree: building and maintaining muscle, maximizing cardiovascular capacity, and prioritizing recovery are the three most powerful investments you can make in your long-term health.
        </p>

        {/* Quote cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex flex-col gap-4"
              style={{
                background: "oklch(0.18 0.02 250)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              {/* Tag chip */}
              <span
                className="self-start font-['Barlow'] font-semibold uppercase tracking-widest text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  color: "#00D4FF",
                }}
              >
                {q.tag}
              </span>

              {/* Opening quote mark */}
              <span
                className="font-['Barlow_Condensed'] font-extrabold leading-none select-none -mt-2"
                style={{ fontSize: "3.5rem", color: "rgba(0,212,255,0.2)", lineHeight: 0.8 }}
                aria-hidden="true"
              >
                "
              </span>

              {/* Quote text */}
              <p
                className="font-['Barlow'] text-white/85 leading-relaxed flex-1"
                style={{ fontSize: "clamp(0.85rem, 1.8vw, 0.98rem)" }}
              >
                {q.quote}
              </p>

              {/* Attribution */}
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-['Barlow'] font-bold text-xs"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#00D4FF",
                  }}
                >
                  {q.initials}
                </div>
                <div>
                  <p className="text-white font-['Barlow'] font-semibold text-sm leading-tight">{q.name}</p>
                  <p className="text-white/35 font-['Barlow'] text-xs leading-tight mt-0.5">{q.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge copy — connects to BODY20 Triad */}
        <p className="text-white/35 font-['Barlow'] text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          BODY20's three-mode training system — <span style={{ color: "rgba(0,212,255,0.7)" }}>Strength · Endurance · Restore</span> — is built on exactly this science, delivering all three pillars in 20 minutes, without heavy loads or joint stress.
        </p>

      </div>
    </section>
  );
}
