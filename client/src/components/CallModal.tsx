/*
 * CallModal — BODY20 Corporate Athletic Minimalism
 * "Request a Call from the Studio" modal
 * Black background, white labels, red submit button
 * Sharp corners, no rounded styling
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="fixed z-50 bg-[#0d0d0d] border border-white/10 w-full max-w-md mx-auto animate-fade-in-up"
        style={{
          borderRadius: "2px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
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
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none focus:border-[#E31837] transition-colors"
                  style={{ borderRadius: "2px" }}
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
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none focus:border-[#E31837] transition-colors"
                  style={{ borderRadius: "2px" }}
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-['Barlow'] font-600 uppercase tracking-wide mb-2">
                  Best Time to Call
                </label>
                <select
                  value={bestTime}
                  onChange={(e) => setBestTime(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm font-['Barlow'] outline-none focus:border-[#E31837] transition-colors appearance-none"
                  style={{ borderRadius: "2px" }}
                >
                  <option value="" className="bg-[#1a1a1a]">Select a time</option>
                  <option value="morning" className="bg-[#1a1a1a]">Morning (8am – 12pm)</option>
                  <option value="afternoon" className="bg-[#1a1a1a]">Afternoon (12pm – 5pm)</option>
                  <option value="evening" className="bg-[#1a1a1a]">Evening (5pm – 8pm)</option>
                  <option value="anytime" className="bg-[#1a1a1a]">Anytime</option>
                </select>
              </div>
              <button type="submit" className="b20-btn-primary w-full mt-2">
                Request My Call
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-fade-in-up">
              <div className="w-12 h-12 border border-[#E31837] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#E31837] font-['Barlow_Condensed'] font-700 text-xl">✓</span>
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
