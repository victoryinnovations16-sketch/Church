import { QueryClient, QueryFunction } from "@tanstack/react-query";

// The site talks to one backend endpoint (/_api/api) that routes the original
// Express-style paths ("/api/events/123") and methods (GET/POST/PATCH/DELETE).
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

async function callApi(method: string, url: string, data?: unknown): Promise<Response> {
  const path = url.split("?")[0];
  if (!path.startsWith("/api/")) {
    return fetch(url, { method, credentials: "include" });
  }
  return fetch("/_api/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method: method.toUpperCase(), path, body: data ?? null }),
    credentials: "include",
  });
}

export async function apiRequest(method: string, url: string, data?: unknown | undefined): Promise<Response> {
  const res = await callApi(method, url, data);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: { on401: UnauthorizedBehavior }) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await callApi("GET", queryKey.join("/") as string);
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }
    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
