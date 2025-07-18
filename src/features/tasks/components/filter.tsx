import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon, FunnelPlusIcon } from "lucide-react";
import { TaskFilter } from "@/schemas/queries";

interface FilterProps {
  className?: string;
  onFilterChange: (filter: TaskFilter) => void;
  filter: TaskFilter | undefined;
}

export function Filter({ className, onFilterChange, filter }: FilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          {filter?.status ? (
            <FunnelPlusIcon className="size-6" />
          ) : (
            <FilterIcon className="size-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onFilterChange({})}>
          Todas
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onFilterChange({ status: "completed" })}
        >
          Completadas
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onFilterChange({ status: "incomplete" })}
        >
          Incompletas
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
