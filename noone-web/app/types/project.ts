export interface Project {
  id: string;
  name: string;
  description: string;
  creator: string;
  creatorId: string;
  hostCount: number;
  shellCount: number;
  status: "active" | "inactive" | "archived";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  data: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProjectSearchParams {
  name: string;
  creator: string;
  status: string;
  tags: string[];
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
