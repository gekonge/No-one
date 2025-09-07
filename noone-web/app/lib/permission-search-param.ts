import type { LoaderFunctionArgs } from "react-router";
import type { PermissionSearchParams } from "@/types/permission";

export async function loadPermissionSearchParams(
  request: LoaderFunctionArgs["request"],
): Promise<PermissionSearchParams> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  return {
    name: searchParams.get("name") ?? "",
    resource: searchParams.get("resource") ?? "",
    action: searchParams.get("action") ?? "",
    category: searchParams.get("category") ?? "",
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 10,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };
}
