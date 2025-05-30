import z from "zod";

// Backend interface
export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Data Transfer Object for API responses
export interface TaskDTO {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Utility type to transform Task to TaskDTO
export type TaskToDTO<T extends Task> = Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(50),
  description: z.string().trim().max(255).nullish(),
  completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(50).optional(),
  description: z.string().trim().max(255).nullish(),
  completed: z.boolean().optional(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
