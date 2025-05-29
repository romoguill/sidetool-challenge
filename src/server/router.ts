import { Hono } from 'hono';

const app = new Hono().basePath('/api');

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
