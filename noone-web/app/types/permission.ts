export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  category: string;
  roleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionResponse {
  data: Permission[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PermissionSearchParams {
  name: string;
  resource: string;
  action: string;
  category: string;
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
