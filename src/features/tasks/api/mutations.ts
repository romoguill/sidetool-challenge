import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { CreateTask, TaskDTO, UpdateTask } from "@/schemas/tasks";
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

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, task }: { id: string; task: UpdateTask }) => {
      const res = await apiClient.tasks[":id"].$patch({
        param: { id },
        json: task,
      });

      return res.json();
    },
    // Optimistic update
    onMutate: async ({ id, task }) => {
      await queryClient.cancelQueries({
        queryKey: tasksKeys.all,
      });

      const previousTasks =
        queryClient.getQueryData<TaskDTO[]>(tasksKeys.all) || [];

      // Helper function to update the cache
      const cacheUpdate = (old: TaskDTO[] | undefined) => {
        if (!old) return [];
        return old.map((existingTask) => {
          if (existingTask.id.toString() === id) {
            return {
              ...existingTask,
              ...task,
              updatedAt: new Date().toISOString(),
            };
          }
          return existingTask;
        });
      };

      // Update all task lists with their respective filters
      queryClient.setQueryData<TaskDTO[]>(tasksKeys.list({}), cacheUpdate);

      // Also update the completed filter
      queryClient.setQueryData<TaskDTO[]>(
        tasksKeys.list({ status: "completed" }),
        cacheUpdate,
      );

      // And the incomplete filter
      queryClient.setQueryData<TaskDTO[]>(
        tasksKeys.list({ status: "incomplete" }),
        cacheUpdate,
      );

      return { previousTasks };
    },
    onError: (_error, _newTask, context) => {
      queryClient.setQueryData(tasksKeys.all, context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
    },
  });
};
