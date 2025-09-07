import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarIcon,
  Edit,
  Key,
  MoreHorizontal,
  Shield,
  Text,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import type { Role } from "@/types/role";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";

export const roleColumns: ColumnDef<Role>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original;
      const getRoleTypeColor = (roleId: string) => {
        switch (roleId) {
          case "ADMIN":
            return "bg-red-100 text-red-800 hover:bg-red-100";
          case "USER_MANAGER":
          case "ROLE_MANAGER":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
          case "MANAGER":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className={getRoleTypeColor(role.id)}>{role.name}</Badge>
            {role.id === "ADMIN" && <Shield className="w-4 h-4 text-red-500" />}
          </div>
        </div>
      );
    },
    meta: {
      label: "Role",
      variant: "text",
      placeholder: "Search by name or description...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "permissions",
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permissions" />
    ),
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[];
      return (
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{permissions.length}</span>
          <span className="text-sm text-muted-foreground">Permissions</span>
        </div>
      );
    },
    meta: {
      label: "Permissions",
      variant: "multiSelect",
      options: [
        { label: "user:read", value: "user:read" },
        { label: "user:write", value: "user:write" },
        { label: "user:delete", value: "user:delete" },
        { label: "role:read", value: "role:read" },
        { label: "role:write", value: "role:write" },
        { label: "role:delete", value: "role:delete" },
        { label: "permission:read", value: "permission:read" },
        { label: "permission:write", value: "permission:write" },
        { label: "system:manage", value: "system:manage" },
        { label: "audit:read", value: "audit:read" },
        { label: "log:read", value: "log:read" },
        { label: "project:read", value: "project:read" },
        { label: "project:write", value: "project:write" },
        { label: "plugin:read", value: "plugin:read" },
        { label: "plugin:write", value: "plugin:write" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "userCount",
    accessorKey: "userCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users" />
    ),
    cell: ({ row }) => {
      const userCount = row.getValue("userCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{userCount}</span>
          <span className="text-sm text-muted-foreground">Users</span>
        </div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Time" />
    ),
    cell: ({ cell }) => formatDate(cell.getValue<Date>()),
    meta: {
      label: "Created At",
      variant: "dateRange",
      icon: CalendarIcon,
    },
    enableColumnFilter: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original;

      const handleEditRole = () => {
        // TODO: Implement edit role
        console.log("Edit role:", role.id);
      };

      const handleDeleteRole = async () => {
        if (
          !confirm(
            "Are you sure you want to delete this role? This action cannot be undone.",
          )
        )
          return;
        // TODO: Implement delete role
        console.log("Delete role:", role.id);
      };

      const handleViewUsers = () => {
        // TODO: Implement view users
        console.log("View users for role:", role.id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEditRole}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewUsers}>
              <Users className="mr-2 h-4 w-4" />
              View Users
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteRole}
              className="text-destructive"
              disabled={role.id === "ADMIN"}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 40,
  },
];
