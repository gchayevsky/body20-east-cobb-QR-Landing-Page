/*
 * CallModal — BODY20 East Cobb QR Landing Page
 * ─────────────────────────────────────────────
 * "Request a Callback from the Studio" modal
 *
 * Layout: fixed header + scrollable content area + sticky submit button
 * This ensures the submit button is always visible on mobile screens
 * regardless of screen height, and the Best Time dropdown is reachable.
 *
 * When the visitor submits their name + phone, this component calls the
 * tRPC mutation `leads.requestCallback` which sends an SMS via Twilio to
 * the studio number (770-450-6127) with the visitor's details.
 *
 * For Ukrainian developers:
 *   - Backend route: server/routers.ts → leads.requestCallback
 *   - Twilio credentials: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
 *   - Studio recipient: +17704506127 (hardcoded in server/routers.ts)
 */

import { useState } from "react";
import { X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface CallModalProps {
  open: boolean;
  onClose: () => void;
}

const TIME_OPTIONS = [
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 5pm)" },
  { value: "evening", label: "Evening (5pm – 8pm)" },
  { value: "anytime", label: "Anytime" },
];

export default function CallModal({ open, onClose }: CallModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const callbackMutation = trpc.leads.requestCallback.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMsg("");
    },
    onError: (err) => {
      setErrorMsg("Something went wrong. Please call us directly at 770-450-6127.");
      console.error("[CallModal] Twilio error:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setErrorMsg("");
    callbackMutation.mutate({
      name: name.trim(),
      phone: phone.trim(),
      bestTime: bestTime || undefined,
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setBestTime("");
      setSubmitted(false);
      setErrorMsg("");
    }, 300);
  };

  if (!open) return null;

  const fieldBg = "oklch(0.22 0.025 250)";
  const fieldBorder = "1px solid rgba(0, 212, 255, 0.2)";
  const fieldStyle: React.CSSProperties = {
    backgroundColor: fieldBg,
    border: fieldBorder,
    borderRadius: "10px",
    color: "#ffffff",
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    WebkitAppearance: "none",
    appearance: "none",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(5, 10, 20, 0.88)" }}
        onClick={handleClose}
      />

      {/* Modal — uses flex column so footer is always pinned */}
      <div
        className="fixed z-50 flex flex-col"
        style={{
          backgroundColor: "oklch(0.18 0.025 250)",
          border: "1px solid rgba(0, 212, 255, 0.22)",
          borderRadius: "16px",
          /* Position: centred horizontally, anchored near bottom on mobile */
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: "440px",
          /* Cap height so it never overflows viewport */
          maxHeight: "calc(100dvh - 48px)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Sticky Header ── */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.12)" }}
        >
          <div>
            <p
              className="font-['Barlow'] font-semibold uppercase tracking-widest text-xs mb-1"
              style={{ color: "#00D4FF" }}
            >
              Studio Callback
            </p>
            <h3 className="font-['Barlow_Condensed'] font-bold text-white text-xl uppercase tracking-wide">
              Request a Call
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5" style={{ overscrollBehavior: "contain" }}>
          {!submitted ? (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block font-['Barlow'] font-semibold uppercase tracking-wide text-xs mb-2"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={fieldStyle}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block font-['Barlow'] font-semibold uppercase tracking-wide text-xs mb-2"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  required
                  style={fieldStyle}
                />
              </div>

              {/* Best Time — custom styled select with visible chevron */}
              <div>
                <label
                  className="block font-['Barlow'] font-semibold uppercase tracking-wide text-xs mb-2"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Best Time to Call
                </label>
                <div className="relative">
                  <select
                    value={bestTime}
                    onChange={(e) => setBestTime(e.target.value)}
                    style={{ ...fieldStyle, paddingRight: "40px", cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: "#1a2535" }}>
                      Select a time…
                    </option>
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} style={{ backgroundColor: "#1a2535" }}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown chevron */}
                  <div
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: "#00D4FF" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error */}
              {errorMsg && (
                <p className="text-red-400 text-xs font-['Barlow'] text-center">{errorMsg}</p>
              )}

              {/* Privacy */}
              <p className="text-xs font-['Barlow'] text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
                By submitting, you agree to be contacted by BODY20 East Cobb.{" "}
                <a
                  href="https://www.body20.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(0,212,255,0.5)", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ border: "2px solid #00D4FF", backgroundColor: "rgba(0,212,255,0.1)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4 className="font-['Barlow_Condensed'] font-bold text-white text-2xl uppercase mb-3">
                Request Received
              </h4>
              <p className="font-['Barlow'] text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Thanks, {name}! Our studio team will call you back at {phone} shortly.
              </p>
            </div>
          )}
        </div>

        {/* ── Sticky Footer — submit button always visible ── */}
        <div
          className="flex-shrink-0 px-6 pb-6 pt-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={callbackMutation.isPending || !name.trim() || !phone.trim()}
              className="w-full font-['Barlow'] font-bold uppercase tracking-wide text-sm rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#00D4FF",
                color: "#0a0f1e",
                padding: "16px 24px",
                fontSize: "15px",
                minHeight: "52px",
              }}
            >
              {callbackMutation.isPending ? "Sending…" : "Request My Call"}
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="w-full font-['Barlow'] font-bold uppercase tracking-wide text-sm rounded-full transition-all duration-200 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)",
                padding: "16px 24px",
                minHeight: "52px",
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
}
