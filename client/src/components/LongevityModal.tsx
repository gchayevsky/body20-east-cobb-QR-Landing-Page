/*
 * LongevityModal — BODY20 East Cobb QR Landing Page
 * "Get the Longevity Roadmap" lead capture modal
 * Palette: deep navy bg, cyan accent, white text — matches lead magnet site
 * 
 * On submit: calls /api/send-roadmap-sms to text the lead a PDF link via Twilio
 */

import { useState } from "react";
import { X } from "lucide-react";

interface LongevityModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LongevityModal({ open, onClose }: LongevityModalProps) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/send-roadmap-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message ?? "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setSubmitted(false);
      setError(null);
    }, 300);
  };

  if (!open) return null;

  const inputStyle = {
    backgroundColor: "oklch(0.22 0.025 250)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
    borderRadius: "8px",
    color: "#ffffff",
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(0.10 0.02 250 / 0.85)" }}
        onClick={handleClose}
      />
      <div
        className="fixed z-50 w-full max-w-md mx-auto animate-fade-in-up"
        style={{
          backgroundColor: "oklch(0.18 0.025 250)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          borderRadius: "12px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.12)" }}
        >
          <div>
            <p className="b20-label mb-1">Free Resource</p>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase tracking-wide">
              Your Longevity Roadmap
            </h3>
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {!submitted ? (
            <>
              <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed mb-6">
                Get a personalized look at what's realistically possible in 3, 6, and 12 months — based on modern longevity science and your starting point. We'll text you the PDF instantly.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                    Name <span style={{ color: "#00D4FF" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                    Phone <span style={{ color: "#00D4FF" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(###) ###-####"
                    required
                    className="w-full placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                    Email <span className="text-white/30 font-400 normal-case">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none"
                    style={inputStyle}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-['Barlow'] text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="b20-btn-primary w-full mt-2"
                  disabled={loading}
                  style={loading ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                >
                  {loading ? "Sending…" : "Text Me the Roadmap"}
                </button>

                {/* Privacy notice */}
                <p className="text-white/25 text-xs font-['Barlow'] text-center mt-4 leading-relaxed">
                  By submitting, you agree to receive a text from BODY20 East Cobb. Message & data rates may apply.{" "}
                  <a
                    href="https://www.body20.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white/50 transition-colors"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-6 animate-fade-in-up">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ border: "1px solid #00D4FF", backgroundColor: "rgba(0, 212, 255, 0.1)" }}
              >
                <span className="font-['Barlow_Condensed'] font-700 text-xl" style={{ color: "#00D4FF" }}>✓</span>
              </div>
              <h4 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase mb-3">
                Roadmap Sent!
              </h4>
              <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed">
                Check your texts — we've sent your Longevity Roadmap PDF. When you're ready, the next step is coming in for the Assessment.
              </p>
              <button onClick={handleClose} className="b20-btn-outline mt-6 text-sm">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
