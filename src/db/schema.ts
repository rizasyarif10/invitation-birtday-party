import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const invitations = pgTable("invitations", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  displayName: varchar("nama_undangan", { length: 200 }).notNull(),
  salutation: varchar("sapaan", { length: 240 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const rsvps = pgTable("rsvps", {
  id: uuid("id").defaultRandom().primaryKey(),
  invitationId: uuid("invitation_id")
    .notNull()
    .unique()
    .references(() => invitations.id, { onDelete: "cascade" }),
  attendance: boolean("kehadiran").notNull(),
  message: varchar("keterangan", { length: 500 }).default("").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
