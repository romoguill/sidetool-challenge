export const tasksKeys = {
  all: ['tasks'] as const,
  detail: (id: number) => [...tasksKeys.all, id] as const,
};
