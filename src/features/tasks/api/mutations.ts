import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { CreateTask } from "../../../schemas/tasks";
import { useQueryClient } from "@tanstack/react-query";
import { tasksKeys } from "./query-keys";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTask) =>
      apiClient.tasks.$post({
        json: task,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      apiClient.tasks[":id"].$delete({ param: { id: taskId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};
