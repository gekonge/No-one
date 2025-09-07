import type { Table } from "@tanstack/react-table";
import { Terminal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

interface ProjectTableActionBarProps {
  table: Table<Project>;
}

export function ProjectTableActionBar({ table }: ProjectTableActionBarProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return null;
  }

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedRows.length} selected projects? This action cannot be undone.`,
      )
    )
      return;

    // TODO: Implement bulk delete
    console.log(
      "Bulk delete projects:",
      selectedRows.map((row) => row.original.id),
    );
  };

  const handleBulkViewShells = () => {
    // TODO: Implement bulk view shells
    console.log(
      "View shells for projects:",
      selectedRows.map((row) => row.original.id),
    );
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b">
      <span className="text-sm text-muted-foreground">
        {selectedRows.length} project{selectedRows.length > 1 ? "s" : ""}{" "}
        selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={handleBulkViewShells}>
          <Terminal className="w-4 h-4 mr-2" />
          View Shells
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBulkDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
