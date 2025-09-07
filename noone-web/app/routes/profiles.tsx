import { Download, Plus } from "lucide-react";
import React, { use } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDate } from "@/lib/format";

// Mock profile data
interface Profile {
  id: string;
  name: string;
  type: "json" | "xml";
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "RuoYi-Admin",
    type: "json",
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    name: "NCCloud EAP",
    type: "json",
    status: "active",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-25T14:00:00Z",
  },
  {
    id: "3",
    name: "SOAP WebService",
    type: "xml",
    status: "draft",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-05T16:00:00Z",
  },
];

export async function loader(_args: LoaderFunctionArgs) {
  return {
    profileResponse: Promise.resolve({
      data: mockProfiles,
      total: mockProfiles.length,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    }),
  };
}

export default function Profiles() {
  const { profileResponse } = useLoaderData() as {
    profileResponse: Promise<{
      data: Profile[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }>;
  };

  const handleCreateProfile = () => {
    console.log("Create profile");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Profile Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system configuration profiles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateProfile}>
            <Plus className="w-4 h-4 mr-2" />
            Add Profile
          </Button>
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            filterCount={2}
            cellWidths={["20rem", "15rem", "12rem", "10rem", "6rem"]}
            shrinkZero
          />
        }
      >
        <ProfileTable profileResponse={profileResponse} />
      </React.Suspense>
    </div>
  );
}

export function ProfileTable({
  profileResponse,
}: {
  profileResponse: Promise<{
    data: Profile[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;
}) {
  const profileResponseData = use(profileResponse);
  const { table } = useDataTable({
    columns: [
      {
        id: "name",
        accessorKey: "name",
        header: "Profile",
        cell: ({ row }) => <div className="w-20">{row.getValue("name")}</div>,
      },
      {
        id: "type",
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          const getTypeColor = (type: string) => {
            switch (type) {
              case "security":
                return "bg-red-100 text-red-800 hover:bg-red-100";
              case "performance":
                return "bg-green-100 text-green-800 hover:bg-green-100";
              case "compliance":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
              default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
            }
          };

          return (
            <Badge className={getTypeColor(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const getStatusColor = (status: string) => {
            switch (status) {
              case "active":
                return "bg-green-100 text-green-800 hover:bg-green-100";
              case "inactive":
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
              case "draft":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
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
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Last Updated",
        cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      },
    ],
    data: profileResponseData.data,
    pageCount: profileResponseData.totalPages,
    initialState: {
      pagination: {
        pageIndex: profileResponseData.page - 1,
        pageSize: profileResponseData.pageSize,
      },
    },
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
