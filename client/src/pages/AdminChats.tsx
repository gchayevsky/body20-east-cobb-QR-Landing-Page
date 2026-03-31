/*
 * AdminChats — BODY20 East Cobb Chat Transcript Viewer
 * ─────────────────────────────────────────────────────
 * Route: /admin/chats
 * Access: Password-protected (ADMIN_PASSWORD env var, default: "body20admin")
 *
 * Features:
 *   - Session list: newest first, shows visitor name/phone, message count, status, date
 *   - Click a session to view the full message thread
 *   - Clean dark branded UI matching the site aesthetic
 *   - No authentication required — just the admin password
 *
 * For your QA AI pipeline:
 *   - All sessions and messages are stored in the database (chat_sessions + chat_messages tables)
 *   - Your AI agent can query the DB directly using the connection info in the Manus Database panel
 *   - Schema: see drizzle/schema.ts for column definitions
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, MessageSquare, Phone, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";

const BODY20_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/body20-logo-white-cRJqhHvfxuHmLQpWJyKHoX.webp";

// ── Types ────────────────────────────────────────────────────────────────────
type Session = {
  id: number;
  sessionKey: string;
  visitorName: string | null;
  visitorPhone: string | null;
  source: string | null;
  transcriptSent: number;
  status: "active" | "ended";
  createdAt: Date;
  endedAt: Date | null;
  messageCount: number;
};

type Message = {
  id: number;
  sessionId: number;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) { setError("Please enter the admin password."); return; }
    setError("");
    onLogin(pw.trim());
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "oklch(0.12 0.02 250)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(0,212,255,0.2)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={BODY20_LOGO} alt="BODY20" className="h-8 object-contain" />
        </div>

        <h1
          className="font-['Barlow_Condensed'] font-extrabold uppercase text-white text-center mb-1"
          style={{ fontSize: "1.6rem", letterSpacing: "0.02em" }}
        >
          Admin Access
        </h1>
        <p className="text-white/40 text-center text-sm font-['Barlow'] mb-6">
          Chat Transcript Viewer
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-white text-sm font-['Barlow'] outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(0,212,255,0.25)",
            }}
          />
          {error && (
            <p className="text-red-400 text-xs font-['Barlow'] text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-['Barlow'] font-bold text-sm uppercase tracking-wide transition-all duration-200 active:scale-95"
            style={{ background: "#00D4FF", color: "#0a0f1e" }}
          >
            View Transcripts
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Session List ─────────────────────────────────────────────────────────────
function SessionList({
  password,
  onSelect,
}: {
  password: string;
  onSelect: (session: Session) => void;
}) {
  const { data: sessions, isLoading, error } = trpc.admin.listSessions.useQuery(
    { password },
    { retry: false }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-['Barlow'] text-sm">
          {error.message === "Unauthorized" ? "Incorrect password." : "Failed to load sessions."}
        </p>
      </div>
    );
  }

  if (!sessions?.length) {
    return (
      <div className="text-center py-20">
        <MessageSquare size={40} className="mx-auto mb-3 opacity-20" color="#00D4FF" />
        <p className="text-white/40 font-['Barlow'] text-sm">No chat sessions yet.</p>
        <p className="text-white/25 font-['Barlow'] text-xs mt-1">
          Sessions will appear here once visitors start chatting with Jen.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sessions.map((session: Session) => (
        <button
          key={session.sessionKey}
          onClick={() => onSelect(session)}
          className="w-full text-left rounded-xl px-4 py-4 transition-all duration-150 active:scale-[0.99]"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Visitor name / anonymous */}
              <p className="font-['Barlow_Condensed'] font-bold uppercase text-white text-base leading-tight truncate">
                {session.visitorName ?? "Anonymous Visitor"}
              </p>

              {/* Phone + transcript sent */}
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {session.visitorPhone && (
                  <span className="flex items-center gap-1 text-white/50 text-xs font-['Barlow']">
                    <Phone size={10} />
                    {session.visitorPhone}
                  </span>
                )}
                {session.transcriptSent === 1 && (
                  <span className="flex items-center gap-1 text-xs font-['Barlow']" style={{ color: "#00D4FF" }}>
                    <CheckCircle size={10} />
                    Transcript sent
                  </span>
                )}
              </div>

              {/* Date + message count + status */}
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-white/35 text-xs font-['Barlow']">
                  <Clock size={10} />
                  {new Date(session.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "numeric", minute: "2-digit",
                  })}
                </span>
                <span className="flex items-center gap-1 text-white/35 text-xs font-['Barlow']">
                  <MessageSquare size={10} />
                  {session.messageCount} message{session.messageCount !== 1 ? "s" : ""}
                </span>
                <span
                  className="text-xs font-['Barlow'] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: session.status === "ended"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,212,255,0.12)",
                    color: session.status === "ended" ? "rgba(255,255,255,0.35)" : "#00D4FF",
                  }}
                >
                  {session.status === "ended" ? "Ended" : "Active"}
                </span>
              </div>
            </div>

            <ChevronRight size={16} color="rgba(255,255,255,0.3)" className="flex-shrink-0 mt-1" />
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Session Detail ────────────────────────────────────────────────────────────
function SessionDetail({
  session,
  password,
  onBack,
}: {
  session: Session;
  password: string;
  onBack: () => void;
}) {
  const { data, isLoading, error } = trpc.admin.getSession.useQuery(
    { password, sessionKey: session.sessionKey },
    { retry: false }
  );

  const JEN_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663139156877/Q8rpXUDG6ufL2oWs24Lgdi/jen-avatar-full-9ztsJ4NuhsCBGXzvmUxito.webp";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 sticky top-0 z-10"
        style={{
          background: "oklch(0.12 0.02 250)",
          borderBottom: "1px solid rgba(0,212,255,0.12)",
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="font-['Barlow'] text-sm">Sessions</span>
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-['Barlow_Condensed'] font-bold uppercase text-white text-base truncate">
            {session.visitorName ?? "Anonymous Visitor"}
          </p>
          <p className="text-white/35 text-xs font-['Barlow']">
            {new Date(session.createdAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
              hour: "numeric", minute: "2-digit",
            })}
            {session.visitorPhone && ` · ${session.visitorPhone}`}
          </p>
        </div>
        {session.status === "ended" ? (
          <XCircle size={14} color="rgba(255,255,255,0.3)" />
        ) : (
          <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF" }} />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div
              className="w-6 h-6 rounded-full border-2 animate-spin"
              style={{ borderColor: "#00D4FF", borderTopColor: "transparent" }}
            />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm font-['Barlow'] text-center py-8">
            Failed to load messages.
          </p>
        )}

        {data?.messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            {msg.role === "assistant" ? (
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end"
                style={{ border: "1px solid rgba(0,212,255,0.3)" }}
              >
                <img src={JEN_AVATAR} alt="Jen" className="w-full h-full object-cover object-top" />
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 self-end flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <span className="text-white/60 text-xs font-['Barlow'] font-bold">V</span>
              </div>
            )}

            {/* Bubble */}
            <div
              className="max-w-[75%] rounded-2xl px-4 py-3"
              style={
                msg.role === "assistant"
                  ? {
                      background: "rgba(0,212,255,0.08)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      borderBottomLeftRadius: "4px",
                    }
                  : {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderBottomRightRadius: "4px",
                    }
              }
            >
              <p className="text-white text-sm font-['Barlow'] leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
              <p className="text-white/30 text-xs font-['Barlow'] mt-1.5">
                {msg.role === "assistant" ? "Jen" : (session.visitorName ?? "Visitor")}
                {" · "}
                {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric", minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {data?.messages.length === 0 && (
          <p className="text-white/30 text-sm font-['Barlow'] text-center py-8">
            No messages in this session.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminChats() {
  const [password, setPassword] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (!password) {
    return <LoginScreen onLogin={pw => setPassword(pw)} />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.12 0.02 250)" }}
    >
      {/* Top bar */}
      {!selectedSession && (
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.12)" }}
        >
          <div className="flex items-center gap-3">
            <img src={BODY20_LOGO} alt="BODY20" className="h-6 object-contain" />
            <span
              className="font-['Barlow_Condensed'] font-bold uppercase text-white/60 text-sm tracking-widest"
            >
              Chat Transcripts
            </span>
          </div>
          <button
            onClick={() => setPassword(null)}
            className="text-white/30 hover:text-white/60 text-xs font-['Barlow'] transition-colors"
          >
            Sign out
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-4">
        {selectedSession ? (
          <SessionDetail
            session={selectedSession}
            password={password}
            onBack={() => setSelectedSession(null)}
          />
        ) : (
          <>
            <p className="text-white/30 text-xs font-['Barlow'] mb-3">
              Showing up to 200 most recent sessions
            </p>
            <SessionList password={password} onSelect={setSelectedSession} />
          </>
        )}
      </div>
    </div>
  );
}
