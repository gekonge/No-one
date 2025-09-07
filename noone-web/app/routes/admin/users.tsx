import { Download, Plus } from "lucide-react";
import React, { use } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { UsersTableActionBar } from "@/components/user-action-bar";
import { userColumns } from "@/components/user-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { getUsers } from "@/lib/user-api";
import { loadUserSearchParams } from "@/lib/user-sreach-param";
import type { UserResponse } from "@/types/user";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = await loadUserSearchParams(request);
  return {
    userResponse: getUsers(params),
  };
}

export default function Users() {
  const { userResponse } = useLoaderData() as {
    userResponse: Promise<UserResponse>;
  };
  const handleCreateUser = () => {
    console.log("Create user");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system user accounts and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateUser}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            filterCount={3}
            cellWidths={[
              "10rem",
              "30rem",
              "10rem",
              "10rem",
              "6rem",
              "6rem",
              "6rem",
            ]}
            shrinkZero
          />
        }
      >
        <UserTable userResponse={userResponse} />
      </React.Suspense>
    </div>
  );
}

export function UserTable({
  userResponse,
}: {
  userResponse: Promise<UserResponse>;
}) {
  const userResponseData = use(userResponse);
  const { table } = useDataTable({
    columns: userColumns,
    data: userResponseData.data,
    pageCount: userResponseData.totalPages,
    initialState: {
      pagination: {
        pageIndex: userResponseData.page - 1,
        pageSize: userResponseData.pageSize,
      },
    },
    shallow: false,
    clearOnDefault: true,
  });
  return (
    <DataTable table={table} actionBar={<UsersTableActionBar table={table} />}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
