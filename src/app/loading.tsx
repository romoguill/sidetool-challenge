import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2Icon className="animte-spin size-10" />
    </div>
  );
}
