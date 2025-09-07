import { Download, Plus } from "lucide-react";
import React, { use } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { shellConnectionColumns } from "@/components/shell-connection-columns";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { getShellConnections } from "@/lib/shell-connection-api";
import { loadShellConnectionSearchParams } from "@/lib/shell-connection-search-param";
import type { ShellConnectionResponse } from "@/types/shell-connection";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = await loadShellConnectionSearchParams(request);
  return {
    shellConnectionResponse: getShellConnections(params),
  };
}

export default function Shells() {
  const { shellConnectionResponse } = useLoaderData() as {
    shellConnectionResponse: Promise<ShellConnectionResponse>;
  };

  const handleCreateShell = () => {
    console.log("Create shell connection");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Shell Connections
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage shell connections and remote access
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateShell}>
            <Plus className="w-4 h-4 mr-2" />
            Add Shell
          </Button>
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={8}
            filterCount={5}
            cellWidths={[
              "10rem",
              "25rem",
              "12rem",
              "8rem",
              "12rem",
              "12rem",
              "15rem",
              "6rem",
            ]}
            shrinkZero
          />
        }
      >
        <ShellConnectionTable
          shellConnectionResponse={shellConnectionResponse}
        />
      </React.Suspense>
    </div>
  );
}

export function ShellConnectionTable({
  shellConnectionResponse,
}: {
  shellConnectionResponse: Promise<ShellConnectionResponse>;
}) {
  const shellConnectionResponseData = use(shellConnectionResponse);
  const { table } = useDataTable({
    columns: shellConnectionColumns,
    data: shellConnectionResponseData.data,
    pageCount: shellConnectionResponseData.totalPages,
    initialState: {
      pagination: {
        pageIndex: shellConnectionResponseData.page - 1,
        pageSize: shellConnectionResponseData.pageSize,
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
