export interface ShellConnection {
  id: string;
  name: string;
  description?: string;
  url: string;
  proxyUrl?: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
  projectId: string;
  projectName: string;
  groupId: string;
  groupName: string;
  shellType: "webshell" | "reverse" | "bind";
  status: "connected" | "disconnected" | "connecting" | "error";
  createdAt: string;
  firstConnectedAt?: string;
  lastConnectedAt?: string;
  tags: string[];
}

export interface ShellConnectionResponse {
  data: ShellConnection[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ShellConnectionSearchParams {
  name: string;
  projectId: string;
  groupId: string;
  shellType: string;
  status: string;
  tags: string[];
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
