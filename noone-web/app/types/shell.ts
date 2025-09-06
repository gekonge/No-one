export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  createdAt: Date;
}

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
  groupId: string;
  status: "connected" | "disconnected" | "connecting" | "error";
  createdAt: Date;
  firstConnectedAt?: Date;
  lastConnectedAt?: Date;
  tags: string[];
}

export interface ShellStats {
  total: number;
  connected: number;
  disconnected: number;
  byProject: Record<string, number>;
  byGroup: Record<string, number>;
}
