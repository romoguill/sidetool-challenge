import { TasksForm } from "@/features/tasks/components/tasks-form";
import { getQueryClient } from "@/lib/get-query-client";
import { taskQueryOptions } from "@/features/tasks/api/queries";
import { FormWrapper } from "@/components/global/form-wrapper";

type Params = Promise<{ taskId: string | undefined }>;

async function EditTaskPage({ params }: { params: Params }) {
  const { taskId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(taskQueryOptions(Number(taskId)));

  return (
    <FormWrapper title="Editar">
      <TasksForm taskId={taskId} />
    </FormWrapper>
  );
}

export default EditTaskPage;
