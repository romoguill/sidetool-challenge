"use client";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TaskFilter } from "@/schemas/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { tasksQueryOptions } from "../api/queries";
import { Filter } from "./filter";
import { TaskItem } from "./task-item";

export function TasksList() {
  // Filter will be set by the dropdown and trigger a query refetch
  const [filter, setFilter] = useState<TaskFilter>({});
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions(filter));

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <section className="mx-auto w-full border-none py-30 sm:max-w-xl md:max-w-xl lg:max-w-2xl">
      <div className="bg-background/30 mb-6 flex w-full items-center rounded-sm border p-4">
        <h1 className="text-2xl font-bold">Tareas</h1>
        <span className="ml-10 text-3xl font-bold">{`${completedTasks}/${totalTasks}`}</span>

        <Filter
          className="mr-2 ml-auto"
          onFilterChange={setFilter}
          filter={filter}
        />

        <Link
          href="/tasks/create"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <PlusIcon className="h-4 w-4" />
        </Link>
      </div>

      <ScrollArea className="h-3/4">
        <div className="space-y-4">
          <AnimatePresence mode="sync">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </section>
  );
}
