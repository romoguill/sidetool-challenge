import { TasksList } from "@/features/tasks/components/tasks-list";
import { getQueryClient } from "@/lib/get-query-client";
import { tasksQueryOptions } from "../../../features/tasks/api/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

function HomePage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(tasksQueryOptions);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TasksList />
      </HydrationBoundary>
    </div>
  );
}

export default HomePage;
