import { TasksList } from "@/features/tasks/components/tasks-list";
import { getQueryClient } from "@/lib/get-query-client";
import { tasksQueryOptions } from "@/features/tasks/api/queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(tasksQueryOptions({}));

  return (
    <main className="flex h-full w-full items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TasksList />
      </HydrationBoundary>
    </main>
  );
}

export default HomePage;
