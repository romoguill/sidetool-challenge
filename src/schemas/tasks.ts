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
  title: z
    .string()
    .trim()
    .min(1, { message: "El título es obligatorio" })
    .max(50, { message: "El título debe tener menos de 50 caracteres" }),
  description: z
    .string()
    .trim()
    .max(255, { message: "La descripción debe tener menos de 255 caracteres" })
    .nullish(),
  completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "El título es obligatorio" })
    .max(50, { message: "El título debe tener menos de 50 caracteres" })
    .optional(),
  description: z
    .string()
    .trim()
    .max(255, { message: "La descripción debe tener menos de 255 caracteres" })
    .nullish(),
  completed: z.boolean().optional(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
