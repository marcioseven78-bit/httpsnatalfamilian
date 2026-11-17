import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial().primaryKey(),
  code: text().notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  address: text().notNull(),
  items: jsonb().notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  discountCents: integer("discount_cents").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text().notNull().default("aguardando_pagamento"),
  pixPayload: text("pix_payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
