"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TaskDTO } from "@/schemas/tasks";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useDeleteTask, useUpdateTask } from "../api/mutations";

interface TaskItemProps {
  task: TaskDTO;
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  return (
    <motion.div
      className={cn(
        "bg-background/30 flex flex-col justify-between rounded-md border p-4",
        task.completed && "stripes",
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{
        opacity: 0,
        x: task.completed ? 30 : -30,
        backgroundColor: task.completed
          ? "rgba(84, 163, 70, 0.7)"
          : "rgba(176, 48, 48, 0.7)",
      }}
      layout
    >
      <div className="flex items-center">
        <Checkbox
          className="mr-4 size-5 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-500"
          checked={task.completed}
          onCheckedChange={(checked) => {
            updateTask({
              id: task.id.toString(),
              task: { completed: Boolean(checked.valueOf()) },
            });
          }}
        />
        <h2 className="text-lg font-bold break-all">{task.title}</h2>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild className="group">
                <Link
                  href={`/tasks/edit/${task.id}`}
                  className="flex items-center gap-2"
                >
                  <EditIcon className="group-hover:stroke-primary h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="font-semibold"
                onClick={() => deleteTask(task.id.toString())}
              >
                <TrashIcon className="h-4 w-4 stroke-red-500" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="text-muted-foreground ml-9 text-sm break-all">
        {task.description}
      </p>
    </motion.div>
  );
}
