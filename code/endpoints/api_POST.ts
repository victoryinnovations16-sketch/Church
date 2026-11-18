import { schema } from "./api_POST.schema";
import { handleSiteApi } from "../helpers/siteApi";

export async function handle(request: Request) {
  let input;
  try {
    input = schema.parse(JSON.parse(await request.text()));
  } catch {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  return handleSiteApi(request, input.method === "PUT" ? "PATCH" : input.method, input.path, input.body ?? null);
}
