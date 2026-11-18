// Server-side only: admin sign-in sessions for the website dashboard.
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import type { Selectable } from "kysely";
import { db } from "./db";
import type { Users } from "./schema";

export const SESSION_COOKIE = "emr_admin_session";
const SESSION_DAYS = 7;

export type AdminUser = Selectable<Users>;
export type PublicUser = Omit<AdminUser, "passwordHash">;

export function sanitizeUser(user: AdminUser): PublicUser {
  const { passwordHash: _omit, ...rest } = user;
  return rest;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

export async function getSessionUser(request: Request): Promise<AdminUser | null> {
  const sid = readCookie(request, SESSION_COOKIE);
  if (!sid) return null;
  const row = await db
    .selectFrom("adminSessions")
    .innerJoin("users", "users.id", "adminSessions.userId")
    .selectAll("users")
    .where("adminSessions.id", "=", sid)
    .where("adminSessions.expiresAt", ">", new Date())
    .executeTakeFirst();
  if (!row || !row.isActive) return null;
  return row as AdminUser;
}

export async function createSession(userId: string): Promise<string> {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.deleteFrom("adminSessions").where("expiresAt", "<", new Date()).execute();
  await db.insertInto("adminSessions").values({ id, userId, expiresAt }).execute();
  return `${SESSION_COOKIE}=${id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`;
}

export async function destroySession(request: Request): Promise<string> {
  const sid = readCookie(request, SESSION_COOKIE);
  if (sid) await db.deleteFrom("adminSessions").where("id", "=", sid).execute();
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
