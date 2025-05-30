import { TaskFilter } from "@/schemas/queries";

export const tasksKeys = {
  all: ["tasks"] as const,
  detail: (id: number) => [...tasksKeys.all, id] as const,
  list: (filter: TaskFilter) => [...tasksKeys.all, filter] as const,
};
