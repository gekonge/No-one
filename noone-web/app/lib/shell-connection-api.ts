import type {
  ShellConnection,
  ShellConnectionResponse,
  ShellConnectionSearchParams,
} from "@/types/shell-connection";

// 生成mock Shell连接数据
const generateMockShellConnections = (): ShellConnection[] => {
  const shellConnections: ShellConnection[] = [
    {
      id: "1",
      name: "Web Server 01",
      description: "主要Web服务器",
      url: "http://192.168.1.100:8080/shell.jsp",
      host: "192.168.1.100",
      port: 8080,
      username: "admin",
      password: "password123",
      projectId: "1",
      projectName: "RASP VUL",
      groupId: "group_1",
      groupName: "Web Servers",
      shellType: "webshell",
      status: "connected",
      createdAt: "2024-01-15T08:00:00Z",
      firstConnectedAt: "2024-01-15T08:30:00Z",
      lastConnectedAt: "2024-01-20T10:00:00Z",
      tags: ["web", "production"],
    },
    {
      id: "2",
      name: "Database Server",
      description: "数据库服务器",
      url: "ssh://192.168.1.101:22",
      host: "192.168.1.101",
      port: 22,
      username: "root",
      privateKey: "-----BEGIN PRIVATE KEY-----",
      projectId: "1",
      projectName: "RASP VUL",
      groupId: "group_2",
      groupName: "Database Servers",
      shellType: "reverse",
      status: "disconnected",
      createdAt: "2024-01-16T09:00:00Z",
      firstConnectedAt: "2024-01-16T09:15:00Z",
      lastConnectedAt: "2024-01-19T16:00:00Z",
      tags: ["database", "mysql"],
    },
    {
      id: "3",
      name: "Tomcat Instance 1",
      description: "Tomcat应用服务器实例1",
      url: "http://192.168.1.102:8080/shell.jsp",
      host: "192.168.1.102",
      port: 8080,
      username: "tomcat",
      password: "tomcat123",
      projectId: "2",
      projectName: "Tomcat Server",
      groupId: "group_3",
      groupName: "Tomcat Servers",
      shellType: "webshell",
      status: "connected",
      createdAt: "2024-01-20T10:00:00Z",
      firstConnectedAt: "2024-01-20T10:30:00Z",
      lastConnectedAt: "2024-01-25T14:00:00Z",
      tags: ["tomcat", "java", "production"],
    },
    {
      id: "4",
      name: "TongWeb Server",
      description: "东方通TongWeb服务器",
      url: "http://192.168.1.103:8080/shell.jsp",
      host: "192.168.1.103",
      port: 8080,
      username: "tongweb",
      password: "tongweb123",
      projectId: "3",
      projectName: "TongWeb Server",
      groupId: "group_4",
      groupName: "TongWeb Servers",
      shellType: "webshell",
      status: "connecting",
      createdAt: "2024-02-01T11:00:00Z",
      tags: ["tongweb", "java", "enterprise"],
    },
    {
      id: "5",
      name: "Mobile App Server",
      description: "移动应用服务器",
      url: "http://192.168.1.104:8080/shell.jsp",
      host: "192.168.1.104",
      port: 8080,
      username: "mobile",
      password: "mobile123",
      projectId: "4",
      projectName: "Mobile System",
      groupId: "group_5",
      groupName: "Mobile Servers",
      shellType: "webshell",
      status: "error",
      createdAt: "2024-02-10T12:00:00Z",
      firstConnectedAt: "2024-02-10T12:30:00Z",
      lastConnectedAt: "2024-02-15T09:00:00Z",
      tags: ["mobile", "app", "development"],
    },
    {
      id: "6",
      name: "Web App Server 2",
      description: "Web应用服务器2",
      url: "http://192.168.1.105:8080/shell.jsp",
      host: "192.168.1.105",
      port: 8080,
      username: "webapp",
      password: "webapp123",
      projectId: "5",
      projectName: "Web Application",
      groupId: "group_6",
      groupName: "Web App Servers",
      shellType: "webshell",
      status: "connected",
      createdAt: "2024-02-15T13:00:00Z",
      firstConnectedAt: "2024-02-15T13:30:00Z",
      lastConnectedAt: "2024-02-20T11:00:00Z",
      tags: ["web", "application", "production"],
    },
    {
      id: "7",
      name: "Database Server 2",
      description: "数据库服务器2",
      url: "ssh://192.168.1.106:22",
      host: "192.168.1.106",
      port: 22,
      username: "dbadmin",
      privateKey: "-----BEGIN PRIVATE KEY-----",
      projectId: "6",
      projectName: "Database Security",
      groupId: "group_7",
      groupName: "Database Servers",
      shellType: "reverse",
      status: "disconnected",
      createdAt: "2024-02-20T14:00:00Z",
      firstConnectedAt: "2024-02-20T14:30:00Z",
      lastConnectedAt: "2024-02-25T10:00:00Z",
      tags: ["database", "postgresql", "security"],
    },
    {
      id: "8",
      name: "API Gateway",
      description: "API网关服务器",
      url: "http://192.168.1.107:8080/shell.jsp",
      host: "192.168.1.107",
      port: 8080,
      username: "apigateway",
      password: "apigateway123",
      projectId: "7",
      projectName: "API Gateway",
      groupId: "group_8",
      groupName: "API Servers",
      shellType: "webshell",
      status: "connected",
      createdAt: "2024-03-01T15:00:00Z",
      firstConnectedAt: "2024-03-01T15:30:00Z",
      lastConnectedAt: "2024-03-05T15:00:00Z",
      tags: ["api", "gateway", "microservice"],
    },
  ];

  return shellConnections;
};

const mockShellConnections: ShellConnection[] = generateMockShellConnections();

export async function getShellConnections(
  filters: ShellConnectionSearchParams = {
    name: "",
    projectId: "",
    groupId: "",
    shellType: "",
    status: "",
    tags: [],
    page: 1,
    perPage: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
): Promise<ShellConnectionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    name = "",
    projectId = "",
    groupId = "",
    shellType = "",
    status = "",
    tags = [],
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  let filteredShellConnections = [...mockShellConnections];

  if (name) {
    const searchLower = name.toLowerCase();
    filteredShellConnections = filteredShellConnections.filter(
      (shell) =>
        shell.name.toLowerCase().includes(searchLower) ||
        shell.description?.toLowerCase().includes(searchLower),
    );
  }

  if (projectId) {
    filteredShellConnections = filteredShellConnections.filter(
      (shell) => shell.projectId === projectId,
    );
  }

  if (groupId) {
    filteredShellConnections = filteredShellConnections.filter(
      (shell) => shell.groupId === groupId,
    );
  }

  if (shellType) {
    filteredShellConnections = filteredShellConnections.filter(
      (shell) => shell.shellType === shellType,
    );
  }

  if (status) {
    filteredShellConnections = filteredShellConnections.filter(
      (shell) => shell.status === status,
    );
  }

  if (tags.length > 0) {
    filteredShellConnections = filteredShellConnections.filter((shell) =>
      tags.some((tag) => shell.tags.includes(tag)),
    );
  }

  filteredShellConnections.sort((a, b) => {
    const aValue = a[sortBy as keyof ShellConnection];
    const bValue = b[sortBy as keyof ShellConnection];

    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filteredShellConnections.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = filteredShellConnections.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize: perPage,
    totalPages,
  };
}

export async function getShellConnectionById(
  id: string,
): Promise<ShellConnection | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockShellConnections.find((shell) => shell.id === id) || null;
}

export async function createShellConnection(
  shellData: Omit<ShellConnection, "id" | "createdAt">,
): Promise<ShellConnection> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newShellConnection: ShellConnection = {
    ...shellData,
    id: `shell_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  mockShellConnections.push(newShellConnection);
  return newShellConnection;
}

export async function updateShellConnection(
  id: string,
  shellData: Partial<ShellConnection>,
): Promise<ShellConnection | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const shellIndex = mockShellConnections.findIndex((shell) => shell.id === id);
  if (shellIndex === -1) return null;

  mockShellConnections[shellIndex] = {
    ...mockShellConnections[shellIndex],
    ...shellData,
  };
  return mockShellConnections[shellIndex];
}

export async function deleteShellConnection(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const shellIndex = mockShellConnections.findIndex((shell) => shell.id === id);
  if (shellIndex === -1) return false;

  mockShellConnections.splice(shellIndex, 1);
  return true;
}
