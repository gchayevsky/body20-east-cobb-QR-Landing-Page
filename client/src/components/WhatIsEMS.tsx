/*
 * WhatIsEMS — BODY20 East Cobb QR Landing Page
 * Placed immediately after the hero so cold passersby understand EMS before seeing social proof.
 * Content sourced from BODY20 Science of EMS Appendix C (3.1.26 final).
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 */

export default function WhatIsEMS() {
  const stats = [
    { value: "20", unit: "min", label: "Full-body workout" },
    { value: "85–95%", unit: "", label: "Muscle fiber activation" },
    { value: "Hours", unit: "", label: "Replaced in the gym" },
    { value: "3", unit: " modes", label: "Strength · Endurance · Restore" },
  ];

  const modalities = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <path d="M6.5 6.5h11M6.5 17.5h11M12 2v20M4 9l2 2-2 2M20 9l-2 2 2 2" />
        </svg>
      ),
      label: "Strength",
      body:
        "EMS recruits 85–95% of your muscle fibers simultaneously — including the deep fast-twitch fibers that traditional lifting rarely reaches. The result is a strength stimulus that would take hours to replicate in a conventional gym.",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: "Endurance",
      body:
        "EMS increases capillary density, mitochondrial activity, and oxygen extraction — the same adaptations that come from cardio training. You build cardiovascular efficiency without the joint impact of running or cycling.",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      label: "Restore",
      body:
        "Our Restore mode uses gentle EMS pulses to improve blood flow and lymphatic drainage, clearing metabolic waste and accelerating recovery. It's active recovery that actually works.",
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
        <p className="text-white/55 font-['Barlow'] text-base leading-relaxed text-center max-w-2xl mx-auto mb-14">
          Electrical Muscle Stimulation uses controlled impulses to activate dramatically more muscle fibers than voluntary movement alone — which is why 20 minutes at BODY20 replaces hours in the gym.
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
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "#00D4FF", lineHeight: 1 }}
                >
                  {s.value}
                </span>
                {s.unit && (
                  <span
                    className="font-['Barlow'] font-semibold text-white/50 mb-0.5"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p className="text-white/55 font-['Barlow'] text-xs uppercase tracking-wide leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Three modalities ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {modalities.map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-7 flex flex-col gap-4"
              style={{
                background: "oklch(0.18 0.02 250)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,212,255,0.08)" }}
                >
                  {m.icon}
                </div>
                <h3
                  className="font-['Barlow_Condensed'] font-bold uppercase text-white"
                  style={{ fontSize: "1.15rem", letterSpacing: "0.04em" }}
                >
                  {m.label}
                </h3>
              </div>
              <p className="text-white/55 font-['Barlow'] text-sm leading-relaxed">
                {m.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-white/25 font-['Barlow'] text-xs text-center mt-4 max-w-lg mx-auto">
          BODY20 uses FDA-cleared, medical-grade EMS technology. Every session is led one-on-one by a certified trainer.
        </p>

      </div>
    </section>
  );
}
