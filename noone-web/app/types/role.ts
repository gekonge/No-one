export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoleResponse {
  data: Role[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RoleSearchParams {
  name: string;
  permissions: string[];
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
