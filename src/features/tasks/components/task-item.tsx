import { TaskDTO } from "@/schemas/tasks";

interface TaskItemProps {
  task: TaskDTO;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-slate-200 p-4">
      <h2 className="text-lg font-bold">{task.title}</h2>
      <p className="text-muted-foreground text-sm">{task.description}</p>
    </div>
  );
}
