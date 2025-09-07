import { Download, Plus } from "lucide-react";
import React, { use } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { RoleTableActionBar } from "@/components/role-action-bar";
import { roleColumns } from "@/components/role-columns";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { getRoles } from "@/lib/role-api";
import { loadRoleSearchParams } from "@/lib/role-search-param";
import type { RoleResponse } from "@/types/role";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = await loadRoleSearchParams(request);
  return {
    roleResponse: getRoles(params),
  };
}

export default function Roles() {
  const { roleResponse } = useLoaderData() as {
    roleResponse: Promise<RoleResponse>;
  };

  const handleCreateRole = () => {
    console.log("Create role");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Role Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system roles and permission configurations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateRole}>
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            filterCount={2}
            cellWidths={["10rem", "30rem", "10rem", "10rem", "6rem"]}
            shrinkZero
          />
        }
      >
        <RoleTable roleResponse={roleResponse} />
      </React.Suspense>
    </div>
  );
}

export function RoleTable({
  roleResponse,
}: {
  roleResponse: Promise<RoleResponse>;
}) {
  const roleResponseData = use(roleResponse);
  const { table } = useDataTable({
    columns: roleColumns,
    data: roleResponseData.data,
    pageCount: roleResponseData.totalPages,
    initialState: {
      pagination: {
        pageIndex: roleResponseData.page - 1,
        pageSize: roleResponseData.pageSize,
      },
    },
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table} actionBar={<RoleTableActionBar table={table} />}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
