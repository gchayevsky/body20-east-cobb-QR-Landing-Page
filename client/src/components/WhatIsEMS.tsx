/*
 * WhatIsEMS — BODY20 East Cobb QR Landing Page
 * Educates cold passersby on EMS technology before they reach the booking section.
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 * Layout: label + headline, then a 2×2 stat row, then a 3-column benefit grid
 */

export default function WhatIsEMS() {
  const stats = [
    { value: "20", unit: "min", label: "Full-body workout" },
    { value: "90", unit: "min", label: "Equivalent gym session" },
    { value: "2×", unit: "/wk", label: "All you need" },
    { value: "98%", unit: "", label: "Of muscles activated" },
  ];

  const benefits = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Electrical Muscle Stimulation",
      body:
        "EMS uses low-level electrical impulses — the same signals your brain sends — to contract your muscles directly. A full-body suit delivers the impulses while a certified trainer guides every movement.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "20 Minutes Is Enough",
      body:
        "Because EMS recruits up to 98% of your muscle fibers simultaneously — versus ~30–40% in conventional training — a single 20-minute session delivers the stimulus of a 90-minute gym workout.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Safe, Low-Impact, Proven",
      body:
        "EMS training is used by professional athletes, physical therapists, and NASA astronauts for muscle maintenance. It's gentle on joints — ideal for all fitness levels, including post-rehab and beginners.",
    },
  ];

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: "oklch(0.13 0.02 250)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <p
          className="font-['Barlow'] font-semibold uppercase tracking-widest text-xs mb-4 text-center"
          style={{ color: "#00D4FF" }}
        >
          The Science Behind the Suit
        </p>

        {/* Headline */}
        <h2
          className="font-['Barlow_Condensed'] font-extrabold uppercase text-white text-center leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
        >
          What Is{" "}
          <span style={{ color: "#00D4FF" }}>EMS Training?</span>
        </h2>

        {/* Sub-copy */}
        <p className="text-white/55 font-['Barlow'] text-base leading-relaxed text-center max-w-xl mx-auto mb-14">
          If you've never heard of EMS, you're not alone. Here's why it works — and why 20 minutes twice a week is genuinely all you need.
        </p>

        {/* ── Stat row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-4 rounded-xl text-center"
              style={{
                background: "oklch(0.18 0.02 250)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              <div className="flex items-end gap-1 leading-none mb-2">
                <span
                  className="font-['Barlow_Condensed'] font-extrabold"
                  style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)", color: "#00D4FF" }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span
                    className="font-['Barlow'] font-semibold text-white/50 mb-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p className="text-white/60 font-['Barlow'] text-xs uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Benefit cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl p-7 flex flex-col gap-4"
              style={{
                background: "oklch(0.18 0.02 250)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.08)" }}
              >
                {b.icon}
              </div>
              <h3
                className="font-['Barlow_Condensed'] font-bold uppercase text-white leading-tight"
                style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}
              >
                {b.title}
              </h3>
              <p className="text-white/55 font-['Barlow'] text-sm leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-white/30 font-['Barlow'] text-xs text-center mt-10 max-w-lg mx-auto">
          BODY20 uses FDA-cleared, medical-grade EMS technology. Every session is led one-on-one by a certified trainer.
        </p>

      </div>
    </section>
  );
}
