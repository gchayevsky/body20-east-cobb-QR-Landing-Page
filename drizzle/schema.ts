import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * chat_sessions — one row per visitor conversation with Jen.
 *
 * Used by:
 *   - tRPC chat.start    → creates a session
 *   - tRPC chat.end      → marks session ended
 *   - tRPC chat.sendTranscript → records phone number and marks transcript sent
 *
 * QA pipeline: query this table joined with chat_messages to get full
 * conversation transcripts for any session. Filter by createdAt for date ranges.
 */
export const chatSessions = mysqlTable("chat_sessions", {
  id: int("id").autoincrement().primaryKey(),
  /** Random nanoid assigned at session start — used as the public session key */
  sessionKey: varchar("sessionKey", { length: 32 }).notNull().unique(),
  /** Visitor's name if collected during the chat */
  visitorName: varchar("visitorName", { length: 100 }),
  /** Visitor's phone number if they requested an SMS transcript */
  visitorPhone: varchar("visitorPhone", { length: 20 }),
  /** Source tag for analytics — e.g. "qr-landing-page" */
  source: varchar("source", { length: 64 }).default("qr-landing-page"),
  /** Whether the visitor requested an SMS transcript */
  transcriptSent: int("transcriptSent").default(0).notNull(),
  /** ISO status: "active" | "ended" */
  status: mysqlEnum("status", ["active", "ended"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;

/**
 * chat_messages — every individual message in a session.
 *
 * role: "user" = visitor message, "assistant" = Jen's response
 *
 * QA pipeline: SELECT * FROM chat_messages WHERE sessionId = ? ORDER BY createdAt ASC
 * to reconstruct the full conversation in order.
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  /** "user" = visitor, "assistant" = Jen */
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;
