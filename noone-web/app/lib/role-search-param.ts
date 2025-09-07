import type { LoaderFunctionArgs } from "react-router";
import type { RoleSearchParams } from "@/types/role";

export async function loadRoleSearchParams(
  request: LoaderFunctionArgs["request"],
): Promise<RoleSearchParams> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  return {
    name: searchParams.get("name") ?? "",
    permissions: searchParams.getAll("permissions"),
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 10,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };
}
