"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TaskDTO } from "@/schemas/tasks";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteTask, useUpdateTask } from "../api/mutations";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "../../../lib/utils";

interface TaskItemProps {
  task: TaskDTO;
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  console.log(task);

  return (
    <div
      className={cn(
        "bg-background flex flex-col justify-between rounded-md border p-4",
        task.completed && "stripes",
      )}
    >
      <div className="flex items-center">
        <Checkbox
          className="mr-2 size-5 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-500"
          checked={task.completed}
          onCheckedChange={(checked) => {
            updateTask({
              id: task.id.toString(),
              task: { completed: Boolean(checked.valueOf()) },
            });
          }}
        />
        <h2 className="text-lg font-bold">{task.title}</h2>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  href={`/tasks/edit/${task.id}`}
                  className="flex items-center gap-2"
                >
                  <EditIcon className="h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteTask(task.id.toString())}
              >
                <TrashIcon className="h-4 w-4 stroke-red-500" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="text-muted-foreground ml-7 text-sm">{task.description}</p>
    </div>
  );
}
