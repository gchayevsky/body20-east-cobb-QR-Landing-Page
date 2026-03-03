/*
 * CallModal — BODY20 East Cobb QR Landing Page
 * "Request a Call from the Studio" modal
 * Palette: deep navy bg, cyan accent, white text — matches lead magnet site
 */

import { useState } from "react";
import { X } from "lucide-react";

interface CallModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CallModal({ open, onClose }: CallModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setBestTime("");
      setSubmitted(false);
    }, 300);
  };

  if (!open) return null;

  const inputStyle = {
    backgroundColor: "oklch(0.22 0.025 250)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
    borderRadius: "8px",
    color: "#ffffff",
  };

  const inputFocusStyle = "outline-none";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(0.10 0.02 250 / 0.85)" }}
        onClick={handleClose}
      />

      {/* Modal */}
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
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.12)" }}
        >
          <div>
            <p className="b20-label mb-1">Studio Callback</p>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase tracking-wide">
              Request a Call
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className={`w-full placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] ${inputFocusStyle}`}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  required
                  className={`w-full placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] ${inputFocusStyle}`}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                  Best Time to Call
                </label>
                <select
                  value={bestTime}
                  onChange={(e) => setBestTime(e.target.value)}
                  className={`w-full px-4 py-3 text-sm font-['Barlow'] appearance-none ${inputFocusStyle}`}
                  style={inputStyle}
                >
                  <option value="" style={{ backgroundColor: "#1a2a3a" }}>Select a time</option>
                  <option value="morning" style={{ backgroundColor: "#1a2a3a" }}>Morning (8am – 12pm)</option>
                  <option value="afternoon" style={{ backgroundColor: "#1a2a3a" }}>Afternoon (12pm – 5pm)</option>
                  <option value="evening" style={{ backgroundColor: "#1a2a3a" }}>Evening (5pm – 8pm)</option>
                  <option value="anytime" style={{ backgroundColor: "#1a2a3a" }}>Anytime</option>
                </select>
              </div>
              <button type="submit" className="b20-btn-primary w-full mt-2">
                Request My Call
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-fade-in-up">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ border: "1px solid #00D4FF", backgroundColor: "rgba(0, 212, 255, 0.1)" }}
              >
                <span className="font-['Barlow_Condensed'] font-700 text-xl" style={{ color: "#00D4FF" }}>✓</span>
              </div>
              <h4 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase mb-3">
                Request Received
              </h4>
              <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed">
                Thanks. Our studio team will reach out shortly.
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
