import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  message: text("message").notNull(),
  reply: text("reply").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const users = pgTable("users", {
  userId: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// type inference for drizzle queries

export type ChatInsert = typeof chats.$inferInsert
export type ChatSelect = typeof chats.$inferSelect

export type UsersInsert = typeof users.$inferInsert
export type UsersSelect = typeof users.$inferSelect
