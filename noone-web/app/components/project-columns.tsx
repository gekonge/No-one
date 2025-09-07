import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarIcon,
  Edit,
  MoreHorizontal,
  Server,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router";
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
import type { Project } from "@/types/project";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";

export const projectColumns: ColumnDef<Project>[] = [
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
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium">{project.name}</div>
        </div>
      );
    },
    meta: {
      label: "Project",
      variant: "text",
      placeholder: "Search by name or description...",
    },
    enableColumnFilter: true,
  },
  {
    id: "creator",
    accessorKey: "creator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creator" />
    ),
    cell: ({ row }) => {
      const creator = row.getValue("creator") as string;
      return (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{creator}</span>
        </div>
      );
    },
    meta: {
      label: "Creator",
      variant: "text",
      placeholder: "Search by creator...",
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
      const getStatusColor = (status: string) => {
        switch (status) {
          case "active":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          case "inactive":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
          case "archived":
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return (
        <Badge className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Archived", value: "archived" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "hostCount",
    accessorKey: "hostCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hosts" />
    ),
    cell: ({ row }) => {
      const hostCount = row.getValue("hostCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{hostCount}</span>
          <span className="text-sm text-muted-foreground">Hosts</span>
        </div>
      );
    },
  },
  {
    id: "shellCount",
    accessorKey: "shellCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shells" />
    ),
    cell: ({ row }) => {
      const shellCount = row.getValue("shellCount") as number;
      return (
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{shellCount}</span>
          <span className="text-sm text-muted-foreground">Shells</span>
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
      const project = row.original;
      const navigate = useNavigate();
      const handleEditProject = () => {
        // TODO: Implement edit project
        console.log("Edit project:", project.id);
      };

      const handleDeleteProject = async () => {
        if (
          !confirm(
            "Are you sure you want to delete this project? This action cannot be undone.",
          )
        )
          return;
        // TODO: Implement delete project
        console.log("Delete project:", project.id);
      };

      const handleViewShells = () => {
        // TODO: Navigate to shells page
        console.log("View shells for project:", project.id);
        navigate(`/shells?projectId=${project.id}`);
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
            <DropdownMenuItem onClick={handleEditProject}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewShells}>
              <Terminal className="mr-2 h-4 w-4" />
              View Shells
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteProject}
              className="text-destructive"
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
