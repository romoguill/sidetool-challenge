import { queryOptions, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { tasksKeys } from "./query-keys";

export const tasksQueryOptions = queryOptions({
  queryKey: tasksKeys.all,
  queryFn: async () => {
    const response = await apiClient.tasks.$get();
    return response.json();
  },
});

export const useGetTasks = () => {
  return useQuery(tasksQueryOptions);
};

export const taskQueryOptions = (taskId: string | undefined) =>
  queryOptions({
    queryKey: tasksKeys.detail(Number(taskId)),
    queryFn: async () => {
      if (!taskId) {
        return null;
      }

      const response = await apiClient.tasks[":id"].$get({
        param: { id: taskId },
      });
      return response.json();
    },
  });
