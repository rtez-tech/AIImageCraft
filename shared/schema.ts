import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const generatedImages = pgTable("generated_images", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url").notNull(),
  size: text("size").notNull().default("1024x1024"),
  style: text("style").notNull().default("photorealistic"),
  quality: text("quality").notNull().default("standard"),
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertImageSchema = createInsertSchema(generatedImages).omit({
  id: true,
  createdAt: true,
});

export const generateImageRequestSchema = z.object({
  prompt: z.string().min(1).max(500),
  size: z.enum(["1024x1024", "1024x768", "768x1024"]).default("1024x1024"),
  style: z.enum(["photorealistic", "digital_art", "oil_painting", "watercolor", "sketch"]).default("photorealistic"),
  quality: z.enum(["standard", "hd"]).default("standard"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type GeneratedImage = typeof generatedImages.$inferSelect;
export type GenerateImageRequest = z.infer<typeof generateImageRequestSchema>;
