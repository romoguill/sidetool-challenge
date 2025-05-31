import { TasksForm } from "@/features/tasks/components/tasks-form";
import { FormWrapper } from "@/components/global/form-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidetool - Crear tarea",
  description: "Agregar una nueva tarea",
};

function CreateTaskPage() {
  return (
    <FormWrapper title="Crear">
      <TasksForm />
    </FormWrapper>
  );
}

export default CreateTaskPage;
