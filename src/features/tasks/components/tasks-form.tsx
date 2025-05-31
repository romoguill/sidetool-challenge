"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActionText } from "@/components/global/action-text";
import { useCreateTask, useUpdateTask } from "../api/mutations";
import { CreateTask, createTaskSchema } from "@/schemas/tasks";
import { taskQueryOptions } from "../api/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface TasksFormProps {
  taskId?: string;
}

export function TasksForm({ taskId }: TasksFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const router = useRouter();

  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          completed: task.completed,
        }
      : {
          title: "",
          description: "",
          completed: false,
        },
  });

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  // To reuse from, the condition to know if its edit or create is when the taskId is provided
  const onSubmit: SubmitHandler<CreateTask> = (data) => {
    if (taskId) {
      updateTask(
        { id: taskId, task: data },
        {
          onError: (error) => {
            toast.error(error.message);
          },
          onSuccess: () => {
            toast.success("Tarea actualizada correctamente");
            router.push("/home");
          },
        },
      );
    } else {
      createTask(data, {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("Tarea creada correctamente");
          form.reset();
          titleRef.current?.focus();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} ref={titleRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="min-h-36"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreating || isUpdating}>
          <ActionText isLoading={isCreating || isUpdating}>
            {taskId ? "Actualizar" : "Crear"}
          </ActionText>
        </Button>
      </form>
    </Form>
  );
}
