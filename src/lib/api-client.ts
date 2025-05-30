import { hc } from 'hono/client';
import { AppRouter } from '@/server/router';

const apiClient = hc<AppRouter>(process.env.NEXT_PUBLIC_API_URL!, {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, init);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response;
  },
}).api;

export default apiClient;
