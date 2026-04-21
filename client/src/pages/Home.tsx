/*
 * BODY20 East Cobb — QR Landing Page — Home
 * Design: Corporate Athletic Minimalism
 * Colors: Deep navy bg, Cyan #00D4FF accent, White text — matches lead magnet site
 * Fonts: Barlow Condensed (headlines), Barlow (body)
 */

import { useState, useRef } from "react";
import Header from "@/components/Header";
import OrbSection from "@/components/OrbSection";
import ChatPanel from "@/components/ChatPanel";
import GoogleReviewStrip from "@/components/GoogleReviewStrip";
import MemberTestimonials from "@/components/MemberTestimonials";
import WhatIsEMS from "@/components/WhatIsEMS";
import AuthorityQuotes from "@/components/AuthorityQuotes";
import BookingSection from "@/components/BookingSection";
import LongevitySection from "@/components/LongevitySection";
import StickyBookingBar from "@/components/StickyBookingBar";
import CallModal from "@/components/CallModal";
import LongevityModal from "@/components/LongevityModal";
import CalendarModal from "@/components/CalendarModal";
import Footer from "@/components/Footer";

// BotDisplay widget API — injected by the chat-widget.js script in index.html
declare global {
  interface Window {
    __botdisplay?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
    };
  }
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [longevityModalOpen, setLongevityModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  // Opens the BotDisplay chat widget when the "Chat with Jen" button is tapped.
  // The BotDisplay widget (loaded by <script> in index.html) does not expose a global API.
  // The only way to open it programmatically is to click its own floating button (.chat-button).
  // If the widget hasn't rendered yet, we retry after 600ms.
  const openJenChat = () => {
    const triggerWidget = () => {
      const widgetBtn = document.querySelector<HTMLButtonElement>('.chat-button');
      if (widgetBtn) {
        // Only click if the chat window isn't already open
        const chatWindow = document.querySelector('.chat-window');
        const isAlreadyOpen = chatWindow && chatWindow.classList.contains('open');
        if (!isAlreadyOpen) widgetBtn.click();
      }
    };
    const widgetBtn = document.querySelector('.chat-button');
    if (widgetBtn) {
      triggerWidget();
    } else {
      // Widget may still be loading — retry once after a short delay
      setTimeout(triggerWidget, 600);
    }
  };

  const bookingRef = useRef<HTMLDivElement>(null);

  const BOOKING_URL = "https://www.body20.com/location/east-cobb";

  const openBooking = () => {
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  // Also scroll to the demo calendar section for users who want to preview
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      <Header />

      {/* Hero / Orb Section */}
      <OrbSection
        onOrbTap={() => setChatOpen(true)}
        onRequestCall={() => setCallModalOpen(true)}
        onBookAssessment={openBooking}
        onChatWithJen={openJenChat}
      />

      {/* Chat Panel — slides in when orb is tapped */}
      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onBookAssessment={() => {
          setChatOpen(false);
          openBooking();
        }}
      />

      {/* What Is EMS? — right after hero so cold passersby understand before social proof */}
      <WhatIsEMS />

      {/* Google Review Strip */}
      <GoogleReviewStrip />

      {/* Authority quotes — Gary Brecka + Peter Attia on strength & longevity */}
      <AuthorityQuotes />

      {/* Member Testimonial Videos */}
      <MemberTestimonials />

      {/* Booking Section */}
      <div ref={bookingRef}>
        <BookingSection onOpenCalendar={() => setCalendarModalOpen(true)} />
      </div>

      {/* Longevity Roadmap Section */}
      <LongevitySection onOpenModal={() => setLongevityModalOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Sticky bottom CTA */}
      <StickyBookingBar onBook={openBooking} />

      {/* Modals */}
      <CallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
      <LongevityModal open={longevityModalOpen} onClose={() => setLongevityModalOpen(false)} />
      <CalendarModal open={calendarModalOpen} onClose={() => setCalendarModalOpen(false)} />
    </div>
  );
}
