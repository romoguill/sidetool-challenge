import { Hono } from 'hono';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks';
import { zValidator } from '@hono/zod-validator';
import { TaskService } from './service/tasks.service';

const taskService = new TaskService();

const app = new Hono()
  .basePath('/api')
  .get('/ping', (c) => {
    return c.text('pong');
  })
  .get('/tasks', async (c) => {
    const tasks = await taskService.getTasks();

    return c.json(tasks);
  })
  .post('/tasks', zValidator('json', createTaskSchema), async (c) => {
    const payload = c.req.valid('json');

    const task = await taskService.createTask(payload);

    return c.json(task);
  })
  .put('/tasks/:id', zValidator('json', updateTaskSchema), async (c) => {
    const id = c.req.param('id');
    const payload = c.req.valid('json');

    const task = await taskService.updateTask(id, payload);

    return c.json(task);
  })
  .delete('/tasks/:id', async (c) => {
    const id = c.req.param('id');

    await taskService.deleteTask(id);

    return;
  });

export default app;
