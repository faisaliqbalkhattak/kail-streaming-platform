import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const matchStatusEnum = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

// ─── Matches ─────────────────────────────────────────────────────────────────

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  sport: text("sport").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  status: matchStatusEnum("status").default("scheduled").notNull(),
  homeScore: integer("home_score").default(0).notNull(),
  awayScore: integer("away_score").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Commentary ──────────────────────────────────────────────────────────────

export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id")
    .references(() => matches.id, { onDelete: "cascade" })
    .notNull(),
  actor: text("actor").notNull(),            // who performed the action
  message: text("message").notNull(),           // human-readable description
  minute: integer("minute"),                   // match minute the event occurred
  sequenceNo: integer("sequence_no").notNull(),    // ordering within the same minute
  details: jsonb("details"),                    // flexible JSON bucket for extra data
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});