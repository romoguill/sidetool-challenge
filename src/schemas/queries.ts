import { z } from "zod";

export const taskFilterSchema = z.object({
  status: z.enum(["completed", "incomplete"]).optional(),
});

export type TaskFilter = z.infer<typeof taskFilterSchema>;
