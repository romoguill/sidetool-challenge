import { FormWrapper } from "@/components/global/form-wrapper";
import { taskQueryOptions } from "@/features/tasks/api/queries";
import { TasksForm } from "@/features/tasks/components/tasks-form";
import { getQueryClient } from "@/lib/get-query-client";

type Params = Promise<{ taskId: string | undefined }>;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { taskId } = await params;

  return {
    title: "Sidetool - Editar tarea",
    description: `Editar tarea ${taskId}`,
  };
};

async function EditTaskPage({ params }: { params: Params }) {
  const { taskId } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(taskQueryOptions(taskId));

  return (
    <FormWrapper title="Editar">
      <TasksForm taskId={taskId} />
    </FormWrapper>
  );
}

export default EditTaskPage;
