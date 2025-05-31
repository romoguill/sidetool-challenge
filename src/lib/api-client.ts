import { hc } from "hono/client";
import { type AppRouter } from "@/server/router";

const apiClient = hc<AppRouter>(process.env.NEXT_PUBLIC_API_URL!, {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, init);

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      let errorMessage: string | object = "Unknown error";
      if (contentType?.includes("application/json")) {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorBody;
      } else {
        errorMessage = await response.text();
      }

      throw new Error(`Request failed: ${response.status} - ${errorMessage}`);
    }

    return response;
  },
}).api;

export default apiClient;
