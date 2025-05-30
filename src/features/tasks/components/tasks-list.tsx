"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "../api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskItem } from "./task-item";

export function TasksList() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);

  return (
    <Card className="mx-auto w-full md:max-w-xl lg:max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tareas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
