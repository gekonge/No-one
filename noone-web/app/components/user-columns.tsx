import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarIcon,
  Edit,
  MoreHorizontal,
  Text,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import type { User } from "@/types/user";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";

export const userColumns: ColumnDef<User>[] = [
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
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
    meta: {
      label: "User",
      variant: "text",
      placeholder: "Search by name...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "roles",
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {roles.slice(0, 2).map((role) => (
            <Badge key={role} variant="outline" className="text-xs">
              {role}
            </Badge>
          ))}
          {roles.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{roles.length - 2}
            </Badge>
          )}
        </div>
      );
    },
    meta: {
      label: "Role",
      variant: "multiSelect",
      options: [
        { label: "ADMIN", value: "ADMIN" },
        { label: "MANAGER", value: "MANAGER" },
        { label: "USER", value: "USER" },
        { label: "GUEST", value: "GUEST" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return status === "active" ? (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Active
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-800 hover:bg-red-100"
        >
          Inactive
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "lastLogin",
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLogin") as string | undefined;
      return (
        <div className="text-sm text-muted-foreground">
          {lastLogin
            ? new Date(lastLogin).toLocaleDateString()
            : "Never logged in"}
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
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      );
    },
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
      const user = row.original;

      const handleEditUser = () => {
        // TODO: Implement edit user
        console.log("Edit user:", user.id);
      };

      const handleDeleteUser = async () => {
        if (
          !confirm(
            "Are you sure you want to delete this user? This action cannot be undone.",
          )
        )
          return;
        // TODO: Implement delete user
        console.log("Delete user:", user.id);
      };

      const handleToggleUserStatus = async () => {
        if (
          !confirm(
            `Are you sure you want to ${user.status === "active" ? "disable" : "enable"} this user?`,
          )
        )
          return;
        // TODO: Implement toggle user status
        console.log("Toggle user status:", user.id, user.status);
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
            <DropdownMenuItem onClick={handleEditUser}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggleUserStatus}>
              {user.status === "active" ? (
                <>
                  <UserX className="mr-2 h-4 w-4" />
                  Disable
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Enable
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteUser}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
