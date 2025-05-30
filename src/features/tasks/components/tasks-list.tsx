"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "../api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "./task-item";
import Link from "next/link";
import { buttonVariants } from "../../../components/ui/button";
import { PlusIcon } from "lucide-react";

export function TasksList() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);

  return (
    <Card className="mx-auto w-full md:max-w-xl lg:max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tareas</h1>
          <Link
            href="/tasks/create"
            className={buttonVariants({ variant: "default" })}
          >
            <PlusIcon className="h-4 w-4" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
