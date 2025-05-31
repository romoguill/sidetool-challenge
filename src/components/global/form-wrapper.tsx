import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface FormWrapperProps {
  children: React.ReactNode;
  title: "Editar" | "Crear";
}

export function FormWrapper({ children, title }: FormWrapperProps) {
  return (
    <main className="mx-auto my-32 max-w-xl space-y-8">
      <Link
        href="/home"
        className="group text-muted-foreground inline-flex items-center gap-2 py-2 pr-2 hover:underline"
      >
        <MoveLeftIcon size={16} className="group-hover:-translate-x-1" />
        Atrás
      </Link>
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </main>
  );
}
