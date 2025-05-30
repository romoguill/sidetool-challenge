"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { tasksQueryOptions } from "../api/queries";
import { TaskItem } from "./task-item";
import { cn } from "@/lib/utils";
import { Filter } from "./filter";

export function TasksList() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);

  return (
    <section className="mx-auto w-full border-none md:max-w-xl lg:max-w-2xl">
      <div className="bg-background mb-6 flex w-full items-center rounded-sm border p-4">
        <h1 className="text-2xl font-bold">Tareas</h1>
        <span className="ml-10 text-3xl font-bold">3/10</span>
        <Filter className="mr-2 ml-auto" />
        <Link
          href="/tasks/create"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <PlusIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
