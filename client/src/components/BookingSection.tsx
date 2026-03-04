/*
 * BookingSection — BODY20 East Cobb QR Landing Page
 * Assessment details, pricing, and demo calendar UI
 * Palette: deep navy bg, cyan #00D4FF accent, white text — matches lead magnet site
 */

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const EMS_DETAIL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-ems-suit-photo_5a3e3ada.png";

const ASSESSMENT_INCLUDES = [
  "Initial Consultation",
  "Medical-grade InBody body composition scan",
  "20-minute coached EMS session",
  "Personalized training prescription",
];

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

interface BookingSectionProps {
  onOpenCalendar: () => void;
}

export default function BookingSection({ onOpenCalendar }: BookingSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const dates = getDates();

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "oklch(0.15 0.02 250)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Cyan divider */}
        <div className="b20-divider mb-12" />

        {/* Section label */}
        <p className="b20-label mb-4">Experience It for Yourself</p>

        {/* Heading */}
        <h2
          className="font-['Barlow_Condensed'] font-800 text-white uppercase leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}
        >
          Book Your Assessment
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Assessment details */}
          <div>
            <p className="text-white/70 font-['Barlow'] font-300 text-base leading-relaxed mb-8">
              The Assessment is designed to give you clarity, not a sales pitch. You'll leave with real data and a personalized plan — whether you join or not.
            </p>

            {/* Includes list */}
            <div className="space-y-3 mb-8">
              {ASSESSMENT_INCLUDES.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#00D4FF" }}
                  />
                  <span className="text-white/80 font-['Barlow'] text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing block */}
            <div
              className="p-6 mb-4 rounded-lg"
              style={{
                backgroundColor: "oklch(0.20 0.025 250)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
              }}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="b20-label">Assessment</span>
                <span className="font-['Barlow_Condensed'] font-800 text-white text-3xl">$49</span>
              </div>
              <p className="text-white/50 text-sm font-['Barlow']">
                Credited toward membership or session pack if you enroll.
              </p>
            </div>

            <p className="text-white/30 text-xs font-['Barlow'] italic">
              If you don't find it valuable, just let us know.
            </p>

            {/* EMS detail image */}
            <div className="mt-8 overflow-hidden rounded-lg">
              <img
                src={EMS_DETAIL_IMG}
                alt="BODY20 EMS Technology"
                className="w-full h-40 object-cover opacity-60"
              />
            </div>
          </div>

          {/* Right: Demo calendar */}
          <div>
            <p className="b20-label mb-4">Select a Date</p>

            {/* Date grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {dates.map((d) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => { setSelectedDate(d); setSelectedTime(null); setConfirmed(false); }}
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
                <p className="b20-label mb-3">
                  {formatDate(selectedDate)} — Select a Time
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {TIME_SLOTS.map((t) => {
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => { setSelectedTime(t); setConfirmed(false); }}
                        className="py-2.5 text-sm font-['Barlow'] font-500 rounded-lg transition-all duration-150"
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
            {selectedTime && !confirmed && (
              <div className="animate-fade-in-up">
                <button
                  onClick={() => setConfirmed(true)}
                  className="b20-btn-primary w-full"
                >
                  Continue to Secure Payment
                </button>
              </div>
            )}

            {/* Confirmation */}
            {confirmed && (
              <div
                className="p-5 animate-fade-in-up rounded-lg"
                style={{
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  backgroundColor: "rgba(0, 212, 255, 0.05)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={18} style={{ color: "#00D4FF" }} />
                  <span className="text-white font-['Barlow'] font-600 text-sm">Assessment Reserved</span>
                </div>
                <p className="text-white/60 text-sm font-['Barlow'] leading-relaxed">
                  You'll receive a secure payment link via text and email before your visit.
                </p>
                <p className="text-white/40 text-xs font-['Barlow'] mt-3">
                  {formatDate(selectedDate!)} at {selectedTime}
                </p>
              </div>
            )}

            {!selectedDate && (
              <p className="text-white/30 text-sm font-['Barlow'] text-center py-4">
                Select a date above to see available times.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
