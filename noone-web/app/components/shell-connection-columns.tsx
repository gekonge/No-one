import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  CalendarIcon,
  Clock,
  Edit,
  MoreHorizontal,
  Terminal,
  Trash2,
  Wifi,
  WifiOff,
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
import type { ShellConnection } from "@/types/shell-connection";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";

export const shellConnectionColumns: ColumnDef<ShellConnection>[] = [
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
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const shell = row.original;
      return (
        <div className="space-y-1">
          <div className="font-medium">{shell.name}</div>
        </div>
      );
    },
    meta: {
      label: "Shell Connection",
      variant: "text",
      placeholder: "Search by name or description...",
    },
    enableColumnFilter: true,
  },
  {
    id: "projectName",
    accessorKey: "projectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      const projectName = row.getValue("projectName") as string;
      return (
        <Badge variant="outline" className="py-1">
          <span className="capitalize">{projectName}</span>
        </Badge>
      );
    },
    meta: {
      label: "Project",
      variant: "select",
      options: [
        { label: "RASP VUL", value: "1" },
        { label: "Tomcat Server", value: "2" },
        { label: "TongWeb Server", value: "3" },
        { label: "Mobile System", value: "4" },
        { label: "Web Application", value: "5" },
        { label: "Database Security", value: "6" },
        { label: "API Gateway", value: "7" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "shellType",
    accessorKey: "shellType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const shellType = row.getValue("shellType") as string;
      const getTypeColor = (type: string) => {
        switch (type) {
          case "webshell":
            return "bg-blue-100 text-blue-800 hover:bg-blue-100";
          case "reverse":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          case "bind":
            return "bg-purple-100 text-purple-800 hover:bg-purple-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return <Badge className={getTypeColor(shellType)}>{shellType}</Badge>;
    },
    meta: {
      label: "Type",
      variant: "select",
      options: [
        { label: "Webshell", value: "webshell" },
        { label: "Reverse", value: "reverse" },
        { label: "Bind", value: "bind" },
      ],
    },
    enableColumnFilter: true,
    size: 40,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusIcon = (status: string) => {
        switch (status) {
          case "connected":
            return <Wifi className="w-4 h-4 text-green-600" />;
          case "disconnected":
            return <WifiOff className="w-4 h-4 text-gray-600" />;
          case "connecting":
            return <Clock className="w-4 h-4 text-yellow-600" />;
          case "error":
            return <AlertCircle className="w-4 h-4 text-red-600" />;
          default:
            return <WifiOff className="w-4 h-4 text-gray-600" />;
        }
      };

      const getStatusColor = (status: string) => {
        switch (status) {
          case "connected":
            return "bg-green-100 text-green-800 hover:bg-green-100";
          case "disconnected":
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
          case "connecting":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
          case "error":
            return "bg-red-100 text-red-800 hover:bg-red-100";
          default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
      };

      return (
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      );
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Connected", value: "connected" },
        { label: "Disconnected", value: "disconnected" },
        { label: "Connecting", value: "connecting" },
        { label: "Error", value: "error" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "lastConnectedAt",
    accessorKey: "lastConnectedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Connected" />
    ),
    cell: ({ row }) => {
      const lastConnectedAt = row.getValue("lastConnectedAt") as
        | string
        | undefined;
      return (
        <div className="text-sm text-muted-foreground">
          {lastConnectedAt
            ? new Date(lastConnectedAt).toLocaleDateString()
            : "Never connected"}
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
      const shell = row.original;

      const handleEditShell = () => {
        // TODO: Implement edit shell
        console.log("Edit shell:", shell.id);
      };

      const handleDeleteShell = async () => {
        if (
          !confirm(
            "Are you sure you want to delete this shell connection? This action cannot be undone.",
          )
        )
          return;
        // TODO: Implement delete shell
        console.log("Delete shell:", shell.id);
      };

      const handleConnectShell = () => {
        console.log("Connect shell:", shell.id);
        window.open(`/shells/${shell.id}`, "_blank");
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
            <DropdownMenuItem onClick={handleEditShell}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleConnectShell}>
              <Terminal className="mr-2 h-4 w-4" />
              Connect
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteShell}
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
