import type { Role, RoleResponse, RoleSearchParams } from "@/types/role";

// 生成mock角色数据
const generateMockRoles = (): Role[] => {
  const roles: Role[] = [
    {
      id: "ADMIN",
      name: "系统管理员",
      description: "拥有系统所有权限，可以管理用户、角色和权限",
      permissions: [
        "user:read",
        "user:write",
        "user:delete",
        "role:read",
        "role:write",
        "role:delete",
        "permission:read",
        "permission:write",
        "system:manage",
      ],
      userCount: 2,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    {
      id: "USER_MANAGER",
      name: "用户管理员",
      description: "可以管理用户账户和基本角色分配",
      permissions: ["user:read", "user:write", "role:read"],
      userCount: 3,
      createdAt: "2024-01-16T09:00:00Z",
      updatedAt: "2024-01-16T09:00:00Z",
    },
    {
      id: "ROLE_MANAGER",
      name: "角色管理员",
      description: "可以管理角色和权限配置",
      permissions: [
        "role:read",
        "role:write",
        "permission:read",
        "permission:write",
      ],
      userCount: 1,
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z",
    },
    {
      id: "MANAGER",
      name: "部门经理",
      description: "部门管理权限，可以查看用户和角色信息",
      permissions: ["user:read", "role:read"],
      userCount: 5,
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
    },
    {
      id: "USER",
      name: "普通用户",
      description: "基础用户权限，只能查看自己的信息",
      permissions: ["user:read"],
      userCount: 25,
      createdAt: "2024-01-19T12:00:00Z",
      updatedAt: "2024-01-19T12:00:00Z",
    },
    {
      id: "GUEST",
      name: "访客用户",
      description: "访客权限，只能查看公开信息",
      permissions: [],
      userCount: 8,
      createdAt: "2024-01-20T13:00:00Z",
      updatedAt: "2024-01-20T13:00:00Z",
    },
    {
      id: "AUDITOR",
      name: "审计员",
      description: "审计权限，可以查看系统日志和审计信息",
      permissions: ["audit:read", "log:read"],
      userCount: 2,
      createdAt: "2024-01-21T14:00:00Z",
      updatedAt: "2024-01-21T14:00:00Z",
    },
    {
      id: "DEVELOPER",
      name: "开发人员",
      description: "开发权限，可以管理项目和插件",
      permissions: [
        "project:read",
        "project:write",
        "plugin:read",
        "plugin:write",
      ],
      userCount: 6,
      createdAt: "2024-01-22T15:00:00Z",
      updatedAt: "2024-01-22T15:00:00Z",
    },
  ];

  return roles;
};

const mockRoles: Role[] = generateMockRoles();

export async function getRoles(
  filters: RoleSearchParams = {
    name: "",
    permissions: [],
    page: 1,
    perPage: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
): Promise<RoleResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    name = "",
    permissions = [],
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  let filteredRoles = [...mockRoles];

  if (name) {
    const searchLower = name.toLowerCase();
    filteredRoles = filteredRoles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchLower) ||
        role.description.toLowerCase().includes(searchLower),
    );
  }

  if (permissions.length > 0) {
    filteredRoles = filteredRoles.filter((role) =>
      permissions.some((permission) => role.permissions.includes(permission)),
    );
  }

  filteredRoles.sort((a, b) => {
    const aValue = a[sortBy as keyof Role];
    const bValue = b[sortBy as keyof Role];

    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filteredRoles.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = filteredRoles.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize: perPage,
    totalPages,
  };
}

export async function getRoleById(id: string): Promise<Role | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockRoles.find((role) => role.id === id) || null;
}

export async function createRole(
  roleData: Omit<Role, "id" | "createdAt" | "updatedAt" | "userCount">,
): Promise<Role> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newRole: Role = {
    ...roleData,
    id: `ROLE_${Date.now()}`,
    userCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockRoles.push(newRole);
  return newRole;
}

export async function updateRole(
  id: string,
  roleData: Partial<Role>,
): Promise<Role | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const roleIndex = mockRoles.findIndex((role) => role.id === id);
  if (roleIndex === -1) return null;

  mockRoles[roleIndex] = {
    ...mockRoles[roleIndex],
    ...roleData,
    updatedAt: new Date().toISOString(),
  };
  return mockRoles[roleIndex];
}

export async function deleteRole(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const roleIndex = mockRoles.findIndex((role) => role.id === id);
  if (roleIndex === -1) return false;

  mockRoles.splice(roleIndex, 1);
  return true;
}
