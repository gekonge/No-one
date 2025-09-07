import type { Table } from "@tanstack/react-table";
import { Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Permission } from "@/types/permission";

interface PermissionTableActionBarProps {
  table: Table<Permission>;
}

export function PermissionTableActionBar({
  table,
}: PermissionTableActionBarProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return null;
  }

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedRows.length} selected permissions? This action cannot be undone.`,
      )
    )
      return;

    // TODO: Implement bulk delete
    console.log(
      "Bulk delete permissions:",
      selectedRows.map((row) => row.original.id),
    );
  };

  const handleBulkViewRoles = () => {
    // TODO: Implement bulk view roles
    console.log(
      "View roles for permissions:",
      selectedRows.map((row) => row.original.id),
    );
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b">
      <span className="text-sm text-muted-foreground">
        {selectedRows.length} permission{selectedRows.length > 1 ? "s" : ""}{" "}
        selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={handleBulkViewRoles}>
          <Users className="w-4 h-4 mr-2" />
          View Roles
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
