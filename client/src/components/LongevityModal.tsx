/*
 * LongevityModal — BODY20 Corporate Athletic Minimalism
 * "Get the Longevity Roadmap" lead capture modal
 * Black background, white fields, red submit button
 */

import { useState } from "react";
import { X } from "lucide-react";

interface LongevityModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LongevityModal({ open, onClose }: LongevityModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubmitted(false);
    }, 300);
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
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
                Get a personalized look at what's realistically possible in 3, 6, and 12 months — based on modern longevity science and your starting point.
              </p>
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-['Barlow'] outline-none focus:border-[#E31837] transition-colors"
                    style={{ borderRadius: "2px" }}
                  />
                </div>
                <button type="submit" className="b20-btn-primary w-full mt-2">
                  Send My Roadmap
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 animate-fade-in-up">
              <div className="w-12 h-12 border border-[#E31837] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#E31837] font-['Barlow_Condensed'] font-700 text-xl">✓</span>
              </div>
              <h4 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase mb-3">
                Roadmap Sent
              </h4>
              <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed">
                We've sent your Longevity Roadmap. When you're ready, the next step is simply coming in for the Assessment.
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
