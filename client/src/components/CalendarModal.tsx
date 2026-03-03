/*
 * CalendarModal — BODY20 East Cobb QR Landing Page
 * Full-screen calendar booking modal (triggered from chat CTA)
 * Palette: deep navy bg, cyan accent, white text — matches lead magnet site
 */

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

const today = new Date();
const getDates = () => {
  const dates = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      dates.push(d);
    }
  }
  return dates.slice(0, 10);
};

const TIME_SLOTS = ["7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CalendarModal({ open, onClose }: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const dates = getDates();

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelectedDate(null);
      setSelectedTime(null);
      setConfirmed(false);
    }, 300);
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(0.10 0.02 250 / 0.85)" }}
        onClick={handleClose}
      />
      <div
        className="fixed z-50 w-full max-w-lg mx-auto animate-fade-in-up"
        style={{
          backgroundColor: "oklch(0.18 0.025 250)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          borderRadius: "12px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.12)" }}
        >
          <div>
            <p className="b20-label mb-1">Book Now</p>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-xl uppercase tracking-wide">
              Select Your Assessment Time
            </h3>
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {!confirmed ? (
            <>
              {/* Pricing reminder */}
              <div
                className="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg"
                style={{
                  backgroundColor: "oklch(0.22 0.025 250)",
                  border: "1px solid rgba(0, 212, 255, 0.1)",
                }}
              >
                <span className="font-['Barlow_Condensed'] font-700 text-lg" style={{ color: "#00D4FF" }}>$49</span>
                <span className="text-white/50 text-sm font-['Barlow']">Assessment — credited toward membership if you join</span>
              </div>

              {/* Date selection */}
              <p className="b20-label mb-3">Choose a Date</p>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {dates.map((d) => {
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                      className="flex flex-col items-center py-3 rounded-lg transition-all duration-150"
                      style={{
                        border: `1px solid ${isSelected ? "#00D4FF" : "rgba(255,255,255,0.1)"}`,
                        backgroundColor: isSelected ? "rgba(0, 212, 255, 0.15)" : "transparent",
                      }}
                    >
                      <span className="text-white/50 text-[10px] font-['Barlow'] uppercase tracking-wide">
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span
                        className="font-['Barlow_Condensed'] font-700 text-lg"
                        style={{ color: isSelected ? "#00D4FF" : "#ffffff" }}
                      >
                        {d.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="animate-fade-in-up">
                  <p className="b20-label mb-3">{formatDate(selectedDate)}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {TIME_SLOTS.map((t) => {
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className="py-3 text-sm font-['Barlow'] font-500 rounded-lg transition-all duration-150"
                          style={{
                            border: `1px solid ${isSelected ? "#00D4FF" : "rgba(255,255,255,0.1)"}`,
                            backgroundColor: isSelected ? "rgba(0, 212, 255, 0.15)" : "transparent",
                            color: isSelected ? "#00D4FF" : "#ffffff",
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              {selectedTime && (
                <button
                  onClick={() => setConfirmed(true)}
                  className="b20-btn-primary w-full animate-fade-in-up"
                >
                  Continue to Secure Payment
                </button>
              )}

              {!selectedDate && (
                <p className="text-white/30 text-sm font-['Barlow'] text-center py-4">
                  Select a date to see available times.
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in-up">
              <CheckCircle size={40} className="mx-auto mb-4" style={{ color: "#00D4FF" }} />
              <h4 className="font-['Barlow_Condensed'] font-700 text-white text-2xl uppercase mb-3">
                Assessment Reserved
              </h4>
              <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed mb-2">
                You'll receive a secure payment link via text and email before your visit.
              </p>
              <p className="text-white/40 text-xs font-['Barlow'] mb-6">
                {formatDate(selectedDate!)} at {selectedTime}
              </p>
              <button onClick={handleClose} className="b20-btn-outline text-sm">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
