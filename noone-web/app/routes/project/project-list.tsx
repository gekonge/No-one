import { Download, Plus } from "lucide-react";
import React, { use } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { ProjectTableActionBar } from "@/components/project-action-bar";
import { projectColumns } from "@/components/project-columns";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { getProjects } from "@/lib/project-api";
import { loadProjectSearchParams } from "@/lib/project-search-param";
import type { ProjectResponse } from "@/types/project";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = await loadProjectSearchParams(request);
  return {
    projectResponse: getProjects(params),
  };
}

export default function ProjectList() {
  const { projectResponse } = useLoaderData() as {
    projectResponse: Promise<ProjectResponse>;
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Project Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage your all projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link to="/projects/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Link>
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={8}
            filterCount={4}
            cellWidths={[
              "10rem",
              "25rem",
              "12rem",
              "8rem",
              "8rem",
              "8rem",
              "15rem",
              "6rem",
            ]}
            shrinkZero
          />
        }
      >
        <ProjectTable projectResponse={projectResponse} />
      </React.Suspense>
    </div>
  );
}

export function ProjectTable({
  projectResponse,
}: {
  projectResponse: Promise<ProjectResponse>;
}) {
  const projectResponseData = use(projectResponse);
  const { table } = useDataTable({
    columns: projectColumns,
    data: projectResponseData.data,
    pageCount: projectResponseData.totalPages,
    initialState: {
      pagination: {
        pageIndex: projectResponseData.page - 1,
        pageSize: projectResponseData.pageSize,
      },
    },
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable
      table={table}
      actionBar={<ProjectTableActionBar table={table} />}
    >
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
