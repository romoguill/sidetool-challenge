"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { tasksQueryOptions } from "../api/queries";
import { TaskItem } from "./task-item";
import { cn } from "@/lib/utils";
import { Filter } from "./filter";
import { useState } from "react";
import { TaskFilter } from "@/schemas/queries";
import { AnimatePresence } from "motion/react";

export function TasksList() {
  // Filter will be set by the dropdown and trigger a query refetch
  const [filter, setFilter] = useState<TaskFilter>({});
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions(filter));

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <section className="mx-auto w-full border-none sm:max-w-xl md:max-w-xl lg:max-w-2xl">
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

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
