/*
 * AuthorityQuotes — BODY20 East Cobb QR Landing Page
 * Gary Brecka + Peter Attia quotes on strength training and longevity.
 * Placed above member testimonials to establish authority before social proof.
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 */

const quotes = [
  {
    quote:
      "Muscle isn't just about aesthetics — it's a longevity organ. Strength training builds muscle to protect joints, increases bone density, boosts metabolism, and enhances cognitive function. Your future self will thank you.",
    name: "Gary Brecka",
    title: "Human Biologist · Host, The Ultimate Human Podcast",
    initials: "GB",
  },
  {
    quote:
      "If you have the aspiration of kicking ass when you're 85, you can't afford to be average when you're 50. You've got to be strong. You've got to have muscle mass. Exercise is by far the most potent longevity drug we have.",
    name: "Dr. Peter Attia",
    title: "Longevity Physician · Author, Outlive",
    initials: "PA",
  },
];

export default function AuthorityQuotes() {
  return (
    <section
      className="py-16 px-6"
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
          className="font-['Barlow_Condensed'] font-extrabold uppercase text-white text-center leading-none mb-12"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)" }}
        >
          Strength Training Is the{" "}
          <span style={{ color: "#00D4FF" }}>Foundation of Longevity</span>
        </h2>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="rounded-xl p-8 flex flex-col gap-6"
              style={{
                background: "oklch(0.18 0.02 250)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              {/* Opening quote mark */}
              <span
                className="font-['Barlow_Condensed'] font-extrabold leading-none select-none"
                style={{ fontSize: "4rem", color: "rgba(0,212,255,0.25)", lineHeight: 0.8 }}
                aria-hidden="true"
              >
                "
              </span>

              {/* Quote text */}
              <p
                className="font-['Barlow'] text-white/85 leading-relaxed flex-1"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
              >
                {q.quote}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Avatar initials */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-['Barlow'] font-bold text-sm"
                  style={{
                    background: "rgba(0,212,255,0.12)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#00D4FF",
                  }}
                >
                  {q.initials}
                </div>
                <div>
                  <p className="text-white font-['Barlow'] font-semibold text-sm">{q.name}</p>
                  <p className="text-white/40 font-['Barlow'] text-xs">{q.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge copy */}
        <p className="text-white/40 font-['Barlow'] text-sm text-center mt-10 max-w-xl mx-auto leading-relaxed">
          BODY20's EMS training is built on the same science these experts champion — delivering the strength stimulus your body needs, in 20 minutes, without heavy loads or joint stress.
        </p>

      </div>
    </section>
  );
}
