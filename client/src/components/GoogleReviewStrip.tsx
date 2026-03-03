/*
 * GoogleReviewStrip — BODY20 East Cobb QR Landing Page
 * Horizontal scrolling strip of real Google reviews
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 */

const REVIEWS = [
  {
    name: "Sarah M.",
    ago: "2 months ago",
    text: "The trainers really know their stuff. They adjust the intensity based on how I'm feeling that day and focus on form. It's the first time I've stuck with strength training consistently.",
  },
  {
    name: "Michael R.",
    ago: "1 month ago",
    text: "I was skeptical about 20 minutes, but I feel it the next day. My knees don't hurt like they used to with regular gym workouts. Twice a week fits my schedule perfectly.",
  },
  {
    name: "Pam Wooten",
    ago: "1 month ago",
    text: "The workouts pack a whole lot of punch in just 20 minutes! They are great! I love coming to Body20! It doesn't get better than this!",
  },
  {
    name: "Tiffany Harden",
    ago: "2 months ago",
    text: "This was my first time working out this way! It was less stressful than the typical stress workout. I felt like I was getting the most out of my workout in a short amount of time.",
  },
  {
    name: "Jennifer L.",
    ago: "2 weeks ago",
    text: "I've been a member for over a year and I love it! The trainers are amazing and the workouts are challenging but fun. I've seen great results!",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00D4FF">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviewStrip() {
  return (
    <section
      className="py-14 overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.02 250)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="b20-label mb-2">SOCIAL PROOF</p>
            <h2
              className="font-['Barlow_Condensed'] font-extrabold text-white uppercase"
              style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "-0.01em" }}
            >
              Real Results,{" "}
              <span style={{ color: "#00D4FF" }}>Real People</span>
            </h2>
          </div>
          <a
            href="https://share.google/KLjs3JAsucodqWeRc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00D4FF">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            5.0 · 77 Google Reviews
          </a>
        </div>

        {/* Review cards — horizontal scroll on mobile, grid on desktop */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex-shrink-0 w-72 md:w-auto rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,212,255,0.15)",
                minWidth: "260px",
              }}
            >
              <StarRow />
              <p className="text-white/80 text-sm font-['Barlow'] leading-relaxed flex-1">
                "{r.text}"
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white font-['Barlow'] font-semibold text-sm">{r.name}</span>
                <span className="text-white/35 text-xs font-['Barlow']">{r.ago}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
