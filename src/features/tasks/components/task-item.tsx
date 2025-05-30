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
import { useDeleteTask } from "../api/mutations";

interface TaskItemProps {
  task: TaskDTO;
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <div className="flex flex-col justify-between rounded-md border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{task.title}</h2>
        <div className="flex items-center gap-2">
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
      <p className="text-muted-foreground text-sm">{task.description}</p>
    </div>
  );
}
