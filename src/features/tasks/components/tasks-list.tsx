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
        <div className="flex flex-col gap-3">
          <h1 className="text-sm italic">Task Manager App</h1>
          <h2 className="text-2xl font-bold">
            Tareas
            <span className="text-muted-foreground mx-6">|</span>
            <span className="font-bold">{`${completedTasks}/${totalTasks}`}</span>
          </h2>
        </div>

        <div className="mr-3 ml-auto flex items-center gap-2">
          <span className="text-sm italic">
            {filter.status &&
              (filter.status === "completed" ? "Completadas" : "Incompletas")}
          </span>
          <Filter className="" onFilterChange={setFilter} filter={filter} />
        </div>

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
