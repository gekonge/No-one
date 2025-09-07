import type { LoaderFunctionArgs } from "react-router";
import type { ShellConnectionSearchParams } from "@/types/shell-connection";

export async function loadShellConnectionSearchParams(
  request: LoaderFunctionArgs["request"],
): Promise<ShellConnectionSearchParams> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  return {
    name: searchParams.get("name") ?? "",
    projectId: searchParams.get("projectId") ?? "",
    groupId: searchParams.get("groupId") ?? "",
    shellType: searchParams.get("shellType") ?? "",
    status: searchParams.get("status") ?? "",
    tags: searchParams.getAll("tags"),
    page: Number(searchParams.get("page")) || 1,
    perPage: Number(searchParams.get("perPage")) || 10,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };
}
