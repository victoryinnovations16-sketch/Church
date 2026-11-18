// Shared types and form schemas for the website (ported from the original shared/schema.ts).
// Dates arrive from the API as ISO strings, so record types use `string | Date`.
import { z } from "zod";

type Stamp = string | Date;

export type UserRole = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  username: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  date: Stamp;
  endDate: Stamp | null;
  location: string;
  imageUrl: string | null;
  isRecurring: boolean | null;
  recurrencePattern: string | null;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  serviceTime: string;
  capacity: string | null;
  imageUrl: string | null;
  contactEmail: string | null;
  mapUrl: string | null;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface Devotional {
  id: string;
  title: string;
  scripture: string;
  content: string;
  date: Stamp;
  author: string | null;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface PrayerRequest {
  id: string;
  name: string | null;
  email: string | null;
  request: string;
  status: string;
  isAnonymous: boolean;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updatedAt: Stamp | null;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaLink: string | null;
  order: number;
  isActive: boolean;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string | null;
  order: number;
  isActive: boolean;
  createdAt: Stamp | null;
  updatedAt: Stamp | null;
}

const optionalText = z.string().nullable().optional();

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginCredentials = z.infer<typeof loginSchema>;

export const setupAdminSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(60),
  password: z.string().min(10, "Use at least 10 characters").max(200),
});

export const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(60),
  password: z.string().min(6, "Password must be at least 6 characters").max(200),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserRoleSchema = z.object({
  role: z.enum(["admin", "editor", "viewer"]).optional(),
  isActive: z.boolean().optional(),
});

export const insertEventSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  type: z.string().min(1),
  date: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  location: z.string(),
  imageUrl: optionalText,
  isRecurring: z.boolean().nullable().optional(),
  recurrencePattern: optionalText,
});
export type InsertEvent = z.infer<typeof insertEventSchema>;

export const insertLocationSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  address: z.string(),
  serviceTime: z.string(),
  capacity: optionalText,
  imageUrl: optionalText,
  contactEmail: optionalText,
  mapUrl: optionalText,
});
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export const insertDevotionalSchema = z.object({
  title: z.string().min(1),
  scripture: z.string(),
  content: z.string(),
  date: z.coerce.date(),
  author: optionalText,
});
export type InsertDevotional = z.infer<typeof insertDevotionalSchema>;

export const insertPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string(),
});
export type InsertPage = z.infer<typeof insertPageSchema>;

export const insertSiteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

export const publicContactSubmissionSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().min(1).max(200),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(10000),
});
export type PublicContactSubmission = z.infer<typeof publicContactSubmissionSchema>;

export const updateContactSubmissionStatusSchema = z.object({
  status: z.enum(["new", "read", "responded", "archived"]),
});

export const publicPrayerRequestSchema = z
  .object({
    name: z.string().max(200).nullable().optional(),
    email: z.string().max(200).nullable().optional(),
    request: z.string().min(1).max(10000),
    isAnonymous: z.boolean().default(false),
  })
  .refine((data) => data.isAnonymous || (!!data.name && !!data.email), {
    message: "Name and email are required for non-anonymous requests",
  });
export type PublicPrayerRequest = z.infer<typeof publicPrayerRequestSchema>;

export const updatePrayerRequestStatusSchema = z.object({
  status: z.enum(["pending", "praying", "answered"]),
});

export const insertHeroSlideSchema = z.object({
  title: z.string().min(1),
  subtitle: optionalText,
  imageUrl: z.string().min(1),
  ctaText: optionalText,
  ctaLink: optionalText,
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;

export const insertGalleryImageSchema = z.object({
  title: z.string().min(1),
  description: optionalText,
  imageUrl: z.string().min(1),
  category: optionalText,
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
