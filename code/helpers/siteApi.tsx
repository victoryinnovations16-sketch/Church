// Server-side only: the website's API, ported route-for-route from the
// original Express server (server/routes.ts). endpoints/api_POST.ts calls
// handleSiteApi with the original method + path, e.g. PATCH /api/events/123.
import { ZodError, type ZodType } from "zod";
import { upload } from "@floot/storage";
import { randomUUID } from "node:crypto";
import { db } from "./db";
import {
  createSession,
  destroySession,
  getSessionUser,
  hashPassword,
  sanitizeUser,
  verifyPassword,
  type AdminUser,
} from "./adminAuth";
import {
  createUserSchema,
  insertDevotionalSchema,
  insertEventSchema,
  insertGalleryImageSchema,
  insertHeroSlideSchema,
  insertLocationSchema,
  insertPageSchema,
  insertSiteSettingSchema,
  loginSchema,
  publicContactSubmissionSchema,
  publicPrayerRequestSchema,
  setupAdminSchema,
  updateContactSubmissionStatusSchema,
  updatePrayerRequestStatusSchema,
  updateUserRoleSchema,
} from "./siteSchema";
import { seedCalendarEvents } from "./seedCalendarEvents";
import { fetchDailyManna } from "./dailyManna";

type Ctx = {
  request: Request;
  method: string;
  params: Record<string, string>;
  body: unknown;
  user: AdminUser | null;
};
type Handler = (ctx: Ctx) => Promise<Response>;
type Access = "public" | "admin" | "adminOrEditor";

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } });
const text = (message: string, status: number) => new Response(message, { status });

function parse<T>(schema: ZodType<T>, body: unknown): T {
  return schema.parse(body ?? {});
}

function partial(schema: ZodType, body: unknown) {
  // PATCH: validate only the fields that were sent
  const shape = (schema as any).shape ?? (schema as any)._def?.schema?.shape;
  const sent = Object.keys((body as object) ?? {});
  if (!shape) return body as Record<string, unknown>;
  const picked: Record<string, true> = {};
  for (const k of sent) if (k in shape) picked[k] = true;
  return (schema as any).pick(picked).parse(body) as Record<string, unknown>;
}

const routes: { method: string; pattern: string; access: Access; handler: Handler }[] = [];
function route(method: string, pattern: string, access: Access, handler: Handler) {
  routes.push({ method, pattern, access, handler });
}

function match(pattern: string, path: string): Record<string, string> | null {
  const a = pattern.split("/").filter(Boolean);
  const b = path.split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

// ---------- auth ----------
route("GET", "/api/auth/setup-status", "public", async () => {
  const row = await db.selectFrom("users").select(db.fn.countAll<number>().as("n")).executeTakeFirstOrThrow();
  return json({ needsSetup: Number(row.n) === 0 });
});

route("POST", "/api/auth/setup", "public", async ({ body }) => {
  const data = parse(setupAdminSchema, body);
  const passwordHash = await hashPassword(data.password);
  // Only the very first account can be created this way.
  const created = await db.transaction().execute(async (trx) => {
    const row = await trx.selectFrom("users").select(trx.fn.countAll<number>().as("n")).executeTakeFirstOrThrow();
    if (Number(row.n) > 0) return null;
    return trx
      .insertInto("users")
      .values({ username: data.username, passwordHash, role: "admin", isActive: true })
      .returningAll()
      .executeTakeFirstOrThrow();
  });
  if (!created) return json({ message: "An admin account already exists. Please log in." }, 409);
  const cookie = await createSession(created.id);
  return json(sanitizeUser(created), 201, { "Set-Cookie": cookie });
});

route("POST", "/api/auth/login", "public", async ({ body }) => {
  const data = parse(loginSchema, body);
  const user = await db.selectFrom("users").selectAll().where("username", "=", data.username).executeTakeFirst();
  if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
    await new Promise((r) => setTimeout(r, 400));
    return json({ message: "Invalid username or password" }, 401);
  }
  if (!user.isActive) return json({ message: "Account is deactivated. Please contact an administrator." }, 403);
  const cookie = await createSession(user.id);
  return json(sanitizeUser(user), 200, { "Set-Cookie": cookie });
});

route("POST", "/api/auth/logout", "public", async ({ request }) => {
  const cookie = await destroySession(request);
  return json({ message: "Logged out successfully" }, 200, { "Set-Cookie": cookie });
});

route("GET", "/api/auth/session", "public", async ({ user }) => {
  if (!user) return json({ message: "Not authenticated" }, 401);
  return json(sanitizeUser(user));
});

// ---------- users ----------
route("GET", "/api/users", "admin", async () => {
  const users = await db.selectFrom("users").selectAll().orderBy("createdAt", "desc").execute();
  return json(users.map(sanitizeUser));
});

route("POST", "/api/users", "admin", async ({ body }) => {
  const data = parse(createUserSchema, body);
  const existing = await db.selectFrom("users").select("id").where("username", "=", data.username).executeTakeFirst();
  if (existing) return json({ message: "Username already exists" }, 409);
  const user = await db
    .insertInto("users")
    .values({
      username: data.username,
      passwordHash: await hashPassword(data.password),
      email: data.email || null,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      role: data.role || "viewer",
      isActive: true,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  return json(sanitizeUser(user), 201);
});

route("PATCH", "/api/users/:id", "admin", async ({ params, body, user: me }) => {
  const data = parse(updateUserRoleSchema, body);
  if (me && params.id === me.id && (data.role && data.role !== "admin" || data.isActive === false)) {
    return json({ message: "You can't remove your own admin access" }, 400);
  }
  const user = await db
    .updateTable("users")
    .set({ ...data, updatedAt: new Date() })
    .where("id", "=", params.id)
    .returningAll()
    .executeTakeFirst();
  if (!user) return json({ message: "User not found" }, 404);
  if (data.isActive === false) await db.deleteFrom("adminSessions").where("userId", "=", user.id).execute();
  return json(sanitizeUser(user));
});

// ---------- simple CRUD tables ----------
type CrudTable = "events" | "locations" | "devotionals" | "heroSlides" | "galleryImages";

function crud(opts: {
  table: CrudTable;
  base: string;
  adminBase?: string;
  schema: ZodType;
  write: Access;
  list: (q: any) => any;
  publicList?: (q: any) => any;
  notFound: string;
}) {
  const t = opts.table;
  const listBase = opts.adminBase ?? opts.base;
  const listAccess: Access = opts.adminBase ? "adminOrEditor" : "public";
  route("GET", listBase, listAccess, async () => json(await opts.list(db.selectFrom(t as any).selectAll()).execute()));
  if (opts.adminBase && opts.publicList) {
    route("GET", opts.base, "public", async () => json(await opts.publicList!(db.selectFrom(t as any).selectAll()).execute()));
  }
  route("GET", `${listBase}/:id`, listAccess, async ({ params }) => {
    const row = await db.selectFrom(t as any).selectAll().where("id", "=", params.id).executeTakeFirst();
    return row ? json(row) : text(opts.notFound, 404);
  });
  route("POST", listBase, opts.write, async ({ body }) => {
    const data = parse(opts.schema, body) as Record<string, unknown>;
    const row = await db.insertInto(t as any).values(data as any).returningAll().executeTakeFirstOrThrow();
    return json(row, 201);
  });
  route("PATCH", `${listBase}/:id`, opts.write, async ({ params, body }) => {
    const data = partial(opts.schema, body);
    const row = await db
      .updateTable(t as any)
      .set({ ...data, updatedAt: new Date() } as any)
      .where("id", "=", params.id)
      .returningAll()
      .executeTakeFirst();
    return row ? json(row) : text(opts.notFound, 404);
  });
  route("DELETE", `${listBase}/:id`, opts.write, async ({ params }) => {
    await db.deleteFrom(t as any).where("id", "=", params.id).execute();
    return json({ success: true });
  });
}

route("POST", "/api/events/seed-calendar", "admin", async () => {
  const existing = await db.selectFrom("events").select("id").limit(1).execute();
  if (existing.length > 0) {
    return json({ message: "Events already exist. Delete existing events first if you want to reseed." }, 400);
  }
  for (const event of seedCalendarEvents) {
    await db.insertInto("events").values(event).execute();
  }
  return json({ message: `Seeded ${seedCalendarEvents.length} events successfully` }, 201);
});

crud({ table: "events", base: "/api/events", schema: insertEventSchema, write: "adminOrEditor", list: (q) => q.orderBy("date", "desc"), notFound: "Event not found" });
crud({ table: "locations", base: "/api/locations", schema: insertLocationSchema, write: "admin", list: (q) => q.orderBy("name"), notFound: "Location not found" });
crud({ table: "devotionals", base: "/api/devotionals", schema: insertDevotionalSchema, write: "admin", list: (q) => q.orderBy("date", "desc"), notFound: "Devotional not found" });
crud({
  table: "heroSlides", base: "/api/hero-slides", adminBase: "/api/admin/hero-slides", schema: insertHeroSlideSchema, write: "adminOrEditor",
  list: (q) => q.orderBy("order", "asc"), publicList: (q) => q.where("isActive", "=", true).orderBy("order", "asc"), notFound: "Hero slide not found",
});
crud({
  table: "galleryImages", base: "/api/gallery", adminBase: "/api/admin/gallery", schema: insertGalleryImageSchema, write: "adminOrEditor",
  list: (q) => q.orderBy("order", "asc"), publicList: (q) => q.where("isActive", "=", true).orderBy("order", "asc"), notFound: "Gallery image not found",
});

// ---------- pages ----------
route("GET", "/api/pages", "public", async () => json(await db.selectFrom("pages").selectAll().orderBy("slug").execute()));
route("GET", "/api/pages/:slugOrId", "public", async ({ params }) => {
  const page =
    (await db.selectFrom("pages").selectAll().where("slug", "=", params.slugOrId).executeTakeFirst()) ??
    (await db.selectFrom("pages").selectAll().where("id", "=", params.slugOrId).executeTakeFirst());
  return page ? json(page) : text("Page not found", 404);
});
route("POST", "/api/pages", "admin", async ({ body }) => {
  const data = parse(insertPageSchema, body);
  return json(await db.insertInto("pages").values(data).returningAll().executeTakeFirstOrThrow(), 201);
});
route("PATCH", "/api/pages/:id", "admin", async ({ params, body }) => {
  const data = partial(insertPageSchema, body);
  const page = await db.updateTable("pages").set({ ...data, updatedAt: new Date() }).where("id", "=", params.id).returningAll().executeTakeFirst();
  return page ? json(page) : text("Page not found", 404);
});
route("DELETE", "/api/pages/:id", "admin", async ({ params }) => {
  await db.deleteFrom("pages").where("id", "=", params.id).execute();
  return json({ success: true });
});

// ---------- settings ----------
route("GET", "/api/settings", "admin", async () => json(await db.selectFrom("siteSettings").selectAll().execute()));
route("GET", "/api/settings/:key", "admin", async ({ params }) => {
  const s = await db.selectFrom("siteSettings").selectAll().where("key", "=", params.key).executeTakeFirst();
  return s ? json(s) : text("Setting not found", 404);
});
route("POST", "/api/settings", "admin", async ({ body }) => {
  const data = parse(insertSiteSettingSchema, body);
  const s = await db
    .insertInto("siteSettings")
    .values(data)
    .onConflict((oc) => oc.column("key").doUpdateSet({ value: data.value, updatedAt: new Date() }))
    .returningAll()
    .executeTakeFirstOrThrow();
  return json(s);
});

// ---------- uploads (returns a direct-to-storage upload slot) ----------
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
route("POST", "/api/uploads", "adminOrEditor", async ({ body, user }) => {
  const b = (body ?? {}) as { fileName?: string; mimeType?: string; fileSize?: number; category?: string };
  if (!b.mimeType || !allowedMimeTypes.includes(b.mimeType)) {
    return json({ error: "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP" }, 400);
  }
  if (typeof b.fileSize !== "number" || b.fileSize <= 0 || b.fileSize > 5 * 1024 * 1024) {
    return json({ error: "File size must be less than 5MB" }, 400);
  }
  const category = (b.category || "general").replace(/[^a-z0-9-]/gi, "") || "general";
  if (user?.role === "editor" && !["gallery", "hero-slides", "general", "events"].includes(category)) {
    return json({ error: "Editors can only upload to gallery, hero slides and events" }, 403);
  }
  const ext = (b.fileName?.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
  const result = await upload({
    visibility: "public",
    filename: `uploads/${category}/${randomUUID()}.${ext}`,
    contentType: b.mimeType,
    sizeBytes: b.fileSize,
  });
  if (!result.ok) return json({ error: result.error.message }, 500);
  return json({ presignedUrl: result.presignedUrl, headers: result.headers, url: result.url }, 201);
});

// ---------- contact ----------
route("GET", "/api/contact-submissions", "admin", async () =>
  json(await db.selectFrom("contactSubmissions").selectAll().orderBy("createdAt", "desc").execute()));
route("POST", "/api/contact-submissions", "public", async ({ body }) => {
  const data = parse(publicContactSubmissionSchema, body);
  return json(await db.insertInto("contactSubmissions").values({ ...data, status: "new" }).returningAll().executeTakeFirstOrThrow(), 201);
});
route("PATCH", "/api/contact-submissions/:id", "admin", async ({ params, body }) => {
  const data = parse(updateContactSubmissionStatusSchema, body);
  const row = await db.updateTable("contactSubmissions").set({ status: data.status, updatedAt: new Date() }).where("id", "=", params.id).returningAll().executeTakeFirst();
  return row ? json(row) : text("Contact submission not found", 404);
});
route("DELETE", "/api/contact-submissions/:id", "admin", async ({ params }) => {
  await db.deleteFrom("contactSubmissions").where("id", "=", params.id).execute();
  return json({ success: true });
});

// ---------- prayer ----------
route("GET", "/api/prayer-requests", "admin", async () =>
  json(await db.selectFrom("prayerRequests").selectAll().orderBy("createdAt", "desc").execute()));
route("POST", "/api/prayer-requests", "public", async ({ body }) => {
  const data = parse(publicPrayerRequestSchema, body);
  const row = await db
    .insertInto("prayerRequests")
    .values({
      name: data.isAnonymous ? null : data.name ?? null,
      email: data.isAnonymous ? null : data.email ?? null,
      request: data.request,
      isAnonymous: data.isAnonymous,
      status: "pending",
    })
    .returningAll()
    .executeTakeFirstOrThrow();
  return json(row, 201);
});
route("PATCH", "/api/prayer-requests/:id", "admin", async ({ params, body }) => {
  const data = parse(updatePrayerRequestStatusSchema, body);
  const row = await db.updateTable("prayerRequests").set({ status: data.status, updatedAt: new Date() }).where("id", "=", params.id).returningAll().executeTakeFirst();
  return row ? json(row) : text("Prayer request not found", 404);
});
route("DELETE", "/api/prayer-requests/:id", "admin", async ({ params }) => {
  await db.deleteFrom("prayerRequests").where("id", "=", params.id).execute();
  return json({ success: true });
});

// ---------- daily manna ----------
route("GET", "/api/daily-manna", "public", async () => {
  try {
    return json(await fetchDailyManna());
  } catch (error) {
    console.error("Error fetching Daily Manna:", error);
    return json({ error: "Failed to fetch daily devotional" }, 500);
  }
});

export async function handleSiteApi(request: Request, method: string, path: string, body: unknown): Promise<Response> {
  const candidates = routes.map((r) => ({ r, params: match(r.pattern, path) })).filter((x) => x.params);
  const hit = candidates.find((x) => x.r.method === method);
  if (!hit) return text(candidates.length ? "Method not allowed" : "Not found", candidates.length ? 405 : 404);
  const user = await getSessionUser(request);
  if (hit.r.access !== "public") {
    if (!user) return json({ message: "Authentication required" }, 401);
    if (hit.r.access === "admin" && user.role !== "admin") return json({ message: "Admin access required" }, 403);
    if (hit.r.access === "adminOrEditor" && user.role !== "admin" && user.role !== "editor") {
      return json({ message: "Admin or editor access required" }, 403);
    }
  }
  try {
    return await hit.r.handler({ request, method, params: hit.params!, body, user });
  } catch (error) {
    if (error instanceof ZodError) return json({ errors: error.issues, message: error.issues[0]?.message }, 400);
    console.error(`Error handling ${method} ${path}:`, error);
    return json({ message: "Something went wrong" }, 500);
  }
}
