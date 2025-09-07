import type {
  Permission,
  PermissionResponse,
  PermissionSearchParams,
} from "@/types/permission";

// 生成mock权限数据
const generateMockPermissions = (): Permission[] => {
  const permissions: Permission[] = [
    // User permissions
    {
      id: "user:read",
      name: "查看用户",
      description: "查看用户信息和列表",
      resource: "user",
      action: "read",
      category: "用户管理",
      roleCount: 4,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    {
      id: "user:write",
      name: "编辑用户",
      description: "创建、编辑用户信息",
      resource: "user",
      action: "write",
      category: "用户管理",
      roleCount: 2,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    {
      id: "user:delete",
      name: "删除用户",
      description: "删除用户账户",
      resource: "user",
      action: "delete",
      category: "用户管理",
      roleCount: 1,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    // Role permissions
    {
      id: "role:read",
      name: "查看角色",
      description: "查看角色信息和列表",
      resource: "role",
      action: "read",
      category: "角色管理",
      roleCount: 3,
      createdAt: "2024-01-16T09:00:00Z",
      updatedAt: "2024-01-16T09:00:00Z",
    },
    {
      id: "role:write",
      name: "编辑角色",
      description: "创建、编辑角色信息",
      resource: "role",
      action: "write",
      category: "角色管理",
      roleCount: 2,
      createdAt: "2024-01-16T09:00:00Z",
      updatedAt: "2024-01-16T09:00:00Z",
    },
    {
      id: "role:delete",
      name: "删除角色",
      description: "删除角色",
      resource: "role",
      action: "delete",
      category: "角色管理",
      roleCount: 1,
      createdAt: "2024-01-16T09:00:00Z",
      updatedAt: "2024-01-16T09:00:00Z",
    },
    // Permission permissions
    {
      id: "permission:read",
      name: "查看权限",
      description: "查看权限信息和列表",
      resource: "permission",
      action: "read",
      category: "权限管理",
      roleCount: 2,
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z",
    },
    {
      id: "permission:write",
      name: "编辑权限",
      description: "创建、编辑权限信息",
      resource: "permission",
      action: "write",
      category: "权限管理",
      roleCount: 1,
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z",
    },
    // System permissions
    {
      id: "system:manage",
      name: "系统管理",
      description: "系统配置和管理权限",
      resource: "system",
      action: "manage",
      category: "系统管理",
      roleCount: 1,
      createdAt: "2024-01-18T11:00:00Z",
      updatedAt: "2024-01-18T11:00:00Z",
    },
    // Audit permissions
    {
      id: "audit:read",
      name: "查看审计日志",
      description: "查看系统审计日志",
      resource: "audit",
      action: "read",
      category: "审计管理",
      roleCount: 2,
      createdAt: "2024-01-19T12:00:00Z",
      updatedAt: "2024-01-19T12:00:00Z",
    },
    {
      id: "log:read",
      name: "查看系统日志",
      description: "查看系统运行日志",
      resource: "log",
      action: "read",
      category: "日志管理",
      roleCount: 2,
      createdAt: "2024-01-20T13:00:00Z",
      updatedAt: "2024-01-20T13:00:00Z",
    },
    // Project permissions
    {
      id: "project:read",
      name: "查看项目",
      description: "查看项目信息和列表",
      resource: "project",
      action: "read",
      category: "项目管理",
      roleCount: 3,
      createdAt: "2024-01-21T14:00:00Z",
      updatedAt: "2024-01-21T14:00:00Z",
    },
    {
      id: "project:write",
      name: "编辑项目",
      description: "创建、编辑项目信息",
      resource: "project",
      action: "write",
      category: "项目管理",
      roleCount: 2,
      createdAt: "2024-01-21T14:00:00Z",
      updatedAt: "2024-01-21T14:00:00Z",
    },
    // Plugin permissions
    {
      id: "plugin:read",
      name: "查看插件",
      description: "查看插件信息和列表",
      resource: "plugin",
      action: "read",
      category: "插件管理",
      roleCount: 2,
      createdAt: "2024-01-22T15:00:00Z",
      updatedAt: "2024-01-22T15:00:00Z",
    },
    {
      id: "plugin:write",
      name: "编辑插件",
      description: "创建、编辑插件信息",
      resource: "plugin",
      action: "write",
      category: "插件管理",
      roleCount: 1,
      createdAt: "2024-01-22T15:00:00Z",
      updatedAt: "2024-01-22T15:00:00Z",
    },
  ];

  return permissions;
};

const mockPermissions: Permission[] = generateMockPermissions();

export async function getPermissions(
  filters: PermissionSearchParams = {
    name: "",
    resource: "",
    action: "",
    category: "",
    page: 1,
    perPage: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
): Promise<PermissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    name = "",
    resource = "",
    action = "",
    category = "",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  let filteredPermissions = [...mockPermissions];

  if (name) {
    const searchLower = name.toLowerCase();
    filteredPermissions = filteredPermissions.filter(
      (permission) =>
        permission.name.toLowerCase().includes(searchLower) ||
        permission.description.toLowerCase().includes(searchLower),
    );
  }

  if (resource) {
    filteredPermissions = filteredPermissions.filter(
      (permission) => permission.resource === resource,
    );
  }

  if (action) {
    filteredPermissions = filteredPermissions.filter(
      (permission) => permission.action === action,
    );
  }

  if (category) {
    filteredPermissions = filteredPermissions.filter(
      (permission) => permission.category === category,
    );
  }

  filteredPermissions.sort((a, b) => {
    const aValue = a[sortBy as keyof Permission];
    const bValue = b[sortBy as keyof Permission];

    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filteredPermissions.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = filteredPermissions.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize: perPage,
    totalPages,
  };
}

export async function getPermissionById(
  id: string,
): Promise<Permission | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockPermissions.find((permission) => permission.id === id) || null;
}

export async function createPermission(
  permissionData: Omit<
    Permission,
    "id" | "createdAt" | "updatedAt" | "roleCount"
  >,
): Promise<Permission> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newPermission: Permission = {
    ...permissionData,
    id: `${permissionData.resource}:${permissionData.action}`,
    roleCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockPermissions.push(newPermission);
  return newPermission;
}

export async function updatePermission(
  id: string,
  permissionData: Partial<Permission>,
): Promise<Permission | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const permissionIndex = mockPermissions.findIndex(
    (permission) => permission.id === id,
  );
  if (permissionIndex === -1) return null;

  mockPermissions[permissionIndex] = {
    ...mockPermissions[permissionIndex],
    ...permissionData,
    updatedAt: new Date().toISOString(),
  };
  return mockPermissions[permissionIndex];
}

export async function deletePermission(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const permissionIndex = mockPermissions.findIndex(
    (permission) => permission.id === id,
  );
  if (permissionIndex === -1) return false;

  mockPermissions.splice(permissionIndex, 1);
  return true;
}
