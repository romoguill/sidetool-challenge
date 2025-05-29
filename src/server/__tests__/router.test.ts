import { testClient } from 'hono/testing';
import { describe, expect, it } from 'vitest';
import app from '../router';

describe('Router', () => {
  // Get RPC types for testing
  const client = testClient(app);

  it('should return pong when calling /ping', async () => {
    const res = await client.api.ping.$get();

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('pong');
  });
});
