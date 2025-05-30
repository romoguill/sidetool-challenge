import z from 'zod';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(50),
  description: z.string().trim().max(255).nullable(),
  completed: z.boolean().optional().default(false),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(50).optional(),
  description: z.string().trim().max(255).nullable().optional(),
  completed: z.boolean().optional(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
