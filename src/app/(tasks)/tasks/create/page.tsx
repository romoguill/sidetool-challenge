import { TasksForm } from "@/features/tasks/components/tasks-form";
import { FormWrapper } from "@/components/global/form-wrapper";

function CreateTaskPage() {
  return (
    <FormWrapper title="Crear">
      <TasksForm />
    </FormWrapper>
  );
}

export default CreateTaskPage;
