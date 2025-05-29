import { Hono } from 'hono';

const app = new Hono().basePath('/api').get('/ping', (c) => {
  return c.text('pong');
});

export default app;
