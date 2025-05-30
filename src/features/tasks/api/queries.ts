import { queryOptions, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { tasksKeys } from "./query-keys";
import { TaskFilter } from "../../../schemas/queries";

export const tasksQueryOptions = (filter: TaskFilter) =>
  queryOptions({
    queryKey: tasksKeys.list(filter),
    queryFn: async () => {
      console.log(tasksKeys.list(filter));
      const response = await apiClient.tasks.$get({
        query: filter,
      });
      return response.json();
    },
  });

export const useGetTasks = (filter: TaskFilter) => {
  return useQuery(tasksQueryOptions(filter));
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
