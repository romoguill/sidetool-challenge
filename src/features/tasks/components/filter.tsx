import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

export function Filter({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Todas</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Completadas</DropdownMenuItem>
        <DropdownMenuItem>Incompletas</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
