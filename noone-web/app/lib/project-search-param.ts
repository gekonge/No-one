import type { LoaderFunctionArgs } from "react-router";
import type { ProjectSearchParams } from "@/types/project";

export async function loadProjectSearchParams(
  request: LoaderFunctionArgs["request"],
): Promise<ProjectSearchParams> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  return {
    name: searchParams.get("name") ?? "",
    creator: searchParams.get("creator") ?? "",
    status: searchParams.get("status") ?? "",
    tags: searchParams.getAll("tags"),
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 10,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };
}
