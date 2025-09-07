import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarIcon,
  Edit,
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
import type { Permission } from "@/types/permission";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";

export const permissionColumns: ColumnDef<Permission>[] = [
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
      <DataTableColumnHeader column={column} title="Permission" />
    ),
    cell: ({ row }) => {
      const permission = row.original;
      const getCategoryColor = (category: string) => {
        switch (category) {
          case "用户管理":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
          case "角色管理":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          case "权限管理":
            return "bg-purple-100 text-purple-800 hover:bg-purple-100";
          case "系统管理":
            return "bg-red-100 text-red-800 hover:bg-red-100";
          case "审计管理":
            return "bg-orange-100 text-orange-800 hover:bg-orange-100";
          case "日志管理":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
          case "项目管理":
            return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
          case "插件管理":
            return "bg-pink-100 text-pink-800 hover:bg-pink-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(permission.category)}>
              {permission.name}
            </Badge>
            {permission.id === "system:manage" && (
              <Shield className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
      );
    },
    meta: {
      label: "Permission",
      variant: "text",
      placeholder: "Search by name or description...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "resource",
    accessorKey: "resource",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resource" />
    ),
    cell: ({ row }) => {
      const resource = row.getValue("resource") as string;
      return (
        <Badge variant="outline" className="text-xs">
          {resource}
        </Badge>
      );
    },
    meta: {
      label: "Resource",
      variant: "select",
      options: [
        { label: "user", value: "user" },
        { label: "role", value: "role" },
        { label: "permission", value: "permission" },
        { label: "system", value: "system" },
        { label: "audit", value: "audit" },
        { label: "log", value: "log" },
        { label: "project", value: "project" },
        { label: "plugin", value: "plugin" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "action",
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const action = row.getValue("action") as string;
      const getActionColor = (action: string) => {
        switch (action) {
          case "read":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
          case "write":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          case "delete":
            return "bg-red-100 text-red-800 hover:bg-red-100";
          case "manage":
            return "bg-purple-100 text-purple-800 hover:bg-purple-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return <Badge className={getActionColor(action)}>{action}</Badge>;
    },
    meta: {
      label: "Action",
      variant: "select",
      options: [
        { label: "read", value: "read" },
        { label: "write", value: "write" },
        { label: "delete", value: "delete" },
        { label: "manage", value: "manage" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <span className="w-20 text-sm text-muted-foreground">{category}</span>
      );
    },
    meta: {
      label: "Category",
      variant: "select",
      options: [
        { label: "用户管理", value: "用户管理" },
        { label: "角色管理", value: "角色管理" },
        { label: "权限管理", value: "权限管理" },
        { label: "系统管理", value: "系统管理" },
        { label: "审计管理", value: "审计管理" },
        { label: "日志管理", value: "日志管理" },
        { label: "项目管理", value: "项目管理" },
        { label: "插件管理", value: "插件管理" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "roleCount",
    accessorKey: "roleCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      const roleCount = row.getValue("roleCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{roleCount}</span>
          <span className="text-sm text-muted-foreground">Roles</span>
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
      const permission = row.original;

      const handleEditPermission = () => {
        // TODO: Implement edit permission
        console.log("Edit permission:", permission.id);
      };

      const handleDeletePermission = async () => {
        if (
          !confirm(
            "Are you sure you want to delete this permission? This action cannot be undone.",
          )
        )
          return;
        // TODO: Implement delete permission
        console.log("Delete permission:", permission.id);
      };

      const handleViewRoles = () => {
        // TODO: Implement view roles
        console.log("View roles for permission:", permission.id);
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
            <DropdownMenuItem onClick={handleEditPermission}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewRoles}>
              <Users className="mr-2 h-4 w-4" />
              View Roles
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeletePermission}
              className="text-destructive"
              disabled={permission.id === "system:manage"}
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
