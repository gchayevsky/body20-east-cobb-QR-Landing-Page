/*
 * MemberTestimonials — BODY20 East Cobb QR Landing Page
 * 6 real member video testimonials embedded from the FitGro landing page
 * Palette: deep navy bg, cyan #00D4FF accent, white text
 */

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

const VIDEOS = [
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/695c6fcf28cd46645ba9b792.mp4",
    caption: "Long-time member explains why the personalized coaching makes all the difference.",
    tags: ["Results", "Consistency", "Coaching"],
  },
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/695c6fcf58ef940f81ad68e7.mp4",
    caption: "Member describes how consistency finally clicked after years of trying other programs.",
    tags: ["Energy", "Strength", "Efficiency"],
  },
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/695c6e5d546d7308635c33e7.mp4",
    caption: "Client shares why twice-weekly sessions delivered progress other approaches couldn't.",
    tags: ["Support", "Accountability", "Progress"],
  },
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/69656dfebc898263510f3a46.mp4",
    caption: "Member who typically hates working out explains why 20 minutes twice a week actually works.",
    tags: ["Transformation", "Strength", "Confidence"],
  },
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/69656dfe1f5e0a44bdc4d4e6.mp4",
    caption: "Skeptical first-timer shares what changed her mind after one session.",
    tags: ["Energy", "Coaching", "Momentum"],
  },
  {
    src: "https://storage.googleapis.com/msgsndr/f9gRFMocuiAhHkj60CYh/media/69656dfe02f1be57fceee77c.mp4",
    caption: "Two-year member describes the difference new technology made in his training.",
    tags: ["Consistency", "Healthspan", "Results"],
  },
];

function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,212,255,0.15)",
        aspectRatio: "9/16",
      }}
      onClick={togglePlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.2) 50%, transparent 100%)",
        }}
      />

      {/* Play/Pause button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
        style={{ opacity: !playing || hovered ? 1 : 0 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
          style={{
            background: "rgba(0,212,255,0.2)",
            border: "2px solid rgba(0,212,255,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          {playing
            ? <Pause size={18} color="#00D4FF" strokeWidth={2.5} />
            : <Play size={18} color="#00D4FF" strokeWidth={2.5} style={{ marginLeft: "2px" }} />
          }
        </div>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white/85 text-xs font-['Barlow'] leading-snug mb-2">
          {video.caption}
        </p>
        <div className="flex flex-wrap gap-1">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-['Barlow'] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,212,255,0.12)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "#00D4FF",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MemberTestimonials() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "oklch(0.15 0.02 250)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="b20-label mb-3">MEMBER TESTIMONIALS</p>
          <h2
            className="font-['Barlow_Condensed'] font-extrabold text-white uppercase"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "-0.01em" }}
          >
            Hear It From{" "}
            <span style={{ color: "#00D4FF" }}>Our Members</span>
          </h2>
          <p className="text-white/55 text-sm font-['Barlow'] mt-3">
            Tap any video to watch
          </p>
        </div>

        {/* Video grid — 2 cols mobile, 3 cols tablet, 6 cols desktop (portrait videos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>

        {/* CTA below videos */}
        <div className="text-center mt-10">
          <a
            href="https://app.fitgro.ai/v2/preview/5hW5al2XnEPdyjXVR2Ml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-['Barlow'] font-semibold tracking-wide uppercase transition-all duration-200 hover:opacity-80"
            style={{ color: "#00D4FF", textDecoration: "none" }}
          >
            View Full Landing Page
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
