import { TaskDTO } from '../schemas/tasks';

import { Task } from '../schemas/tasks';

// Transform Task/s to TaskDTO

export const toTaskDTO = (task: Task): TaskDTO => ({
  ...task,
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});

export const toTaskDTOs = (tasks: Task[]): TaskDTO[] => tasks.map(toTaskDTO);
