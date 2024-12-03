import {
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: text("password").notNull(),
	role: text("role", { enum: ["admin", "user"] }).default("user"),
	createdAt: timestamp().notNull().defaultNow(),
});
