import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { TaskFilter } from "@/schemas/queries";

interface FilterProps {
  className?: string;
  onFilterChange: (filter: TaskFilter) => void;
}

export function Filter({ className, onFilterChange }: FilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          <FilterIcon className="h-4 w-4" />
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
