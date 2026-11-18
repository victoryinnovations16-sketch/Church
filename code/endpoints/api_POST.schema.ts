import { z } from "zod";

// One endpoint carries the site's original REST-style API (see helpers/siteApi).
// The frontend calls it through helpers/queryClient (apiRequest / default queryFn).
export const schema = z.object({
  method: z.enum(["GET", "POST", "PATCH", "PUT", "DELETE"]),
  path: z.string().startsWith("/api/").max(300),
  body: z.unknown().optional(),
});

export type InputType = z.infer<typeof schema>;
export type OutputType = unknown;
