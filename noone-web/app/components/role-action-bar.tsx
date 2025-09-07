import type { Table } from "@tanstack/react-table";
import { Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Role } from "@/types/role";

interface RoleTableActionBarProps {
  table: Table<Role>;
}

export function RoleTableActionBar({ table }: RoleTableActionBarProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (selectedRows.length === 0) {
    return null;
  }

  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedRows.length} selected roles? This action cannot be undone.`,
      )
    )
      return;

    // TODO: Implement bulk delete
    console.log(
      "Bulk delete roles:",
      selectedRows.map((row) => row.original.id),
    );
  };

  const handleBulkViewUsers = () => {
    // TODO: Implement bulk view users
    console.log(
      "View users for roles:",
      selectedRows.map((row) => row.original.id),
    );
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b">
      <span className="text-sm text-muted-foreground">
        {selectedRows.length} role{selectedRows.length > 1 ? "s" : ""} selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={handleBulkViewUsers}>
          <Users className="w-4 h-4 mr-2" />
          View Users
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
