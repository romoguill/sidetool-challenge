import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks';
import { TaskService } from './service/tasks.service';
import { toTaskDTO } from '../utils/to-dto';

const taskService = new TaskService();

const app = new Hono()
  .basePath('/api')
  .get('/ping', (c) => {
    return c.text('pong');
  })
  .get('/tasks', async (c) => {
    const tasks = await taskService.getTasks();
    return c.json(tasks.map(toTaskDTO));
  })
  .post('/tasks', zValidator('json', createTaskSchema), async (c) => {
    const payload = c.req.valid('json');
    const task = await taskService.createTask(payload);
    return c.json(toTaskDTO(task));
  })
  .put('/tasks/:id', zValidator('json', updateTaskSchema), async (c) => {
    const id = c.req.param('id');
    const payload = c.req.valid('json');
    const task = await taskService.updateTask(Number(id), payload);
    return c.json(toTaskDTO(task));
  })
  .delete('/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const task = await taskService.deleteTask(Number(id));
    return c.json(toTaskDTO(task));
  });

export type AppRouter = typeof app;
export default app;
