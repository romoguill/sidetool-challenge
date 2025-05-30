import { queryOptions, useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { tasksKeys } from './query-keys';

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
