interface FormWrapperProps {
  children: React.ReactNode;
  title: "Editar" | "Crear";
}

export function FormWrapper({ children, title }: FormWrapperProps) {
  return (
    <section className="mx-auto max-w-xl space-y-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
