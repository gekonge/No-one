import type { User, UserResponse } from "@/types/user";

// 生成50个mock用户数据
const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const permissions = [
    "user:read",
    "user:write", 
    "user:delete",
    "role:read",
    "role:write",
    "role:delete",
    "permission:read",
    "permission:write",
    "system:manage"
  ];

  const chineseNames = [
    "张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十",
    "郑十一", "王十二", "冯十三", "陈十四", "褚十五", "卫十六", "蒋十七", "沈十八",
    "韩十九", "杨二十", "朱二一", "秦二二", "尤二三", "许二四", "何二五", "吕二六",
    "施二七", "张二八", "孔二九", "曹三十", "严三一", "华三二", "金三三", "魏三四",
    "陶三五", "姜三六", "戚三七", "谢三八", "邹三九", "喻四十", "柏四一", "水四二",
    "窦四三", "章四四", "云四五", "苏四六", "潘四七", "葛四八", "奚四九", "范五十"
  ];

  const englishNames = [
    "Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Henry",
    "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul",
    "Quinn", "Ruby", "Sam", "Tina", "Uma", "Victor", "Wendy", "Xavier",
    "Yara", "Zoe", "Adam", "Bella", "Chris", "Diana", "Eric", "Fiona",
    "George", "Hannah", "Ian", "Julia", "Kevin", "Luna", "Mike", "Nina",
    "Oscar", "Penny", "Quincy", "Rachel", "Steve", "Tara", "Ulysses", "Vera"
  ];

  for (let i = 1; i <= 50; i++) {
    const isChinese = Math.random() > 0.5;
    const nameIndex = (i - 1) % 48; // 使用模运算避免越界
    const name = isChinese ? chineseNames[nameIndex] : englishNames[nameIndex];
    const username = isChinese ? `user${i}` : name.toLowerCase();
    const email = `${username}@company.com`;
    
    // 随机分配角色
    const userRoles = [];
    if (i === 1) {
      userRoles.push("ADMIN", "USER_MANAGER");
    } else if (i <= 3) {
      userRoles.push("MANAGER");
    } else if (i <= 8) {
      userRoles.push("USER_MANAGER");
    } else if (i <= 12) {
      userRoles.push("ROLE_MANAGER");
    } else if (i <= 20) {
      userRoles.push("MANAGER");
    } else if (i <= 35) {
      userRoles.push("USER");
    } else {
      userRoles.push("GUEST");
    }

    // 根据角色分配权限
    const userPermissions = [];
    if (userRoles.includes("ADMIN")) {
      userPermissions.push(...permissions);
    } else if (userRoles.includes("USER_MANAGER")) {
      userPermissions.push("user:read", "user:write", "role:read");
    } else if (userRoles.includes("ROLE_MANAGER")) {
      userPermissions.push("role:read", "role:write", "permission:read", "permission:write");
    } else if (userRoles.includes("MANAGER")) {
      userPermissions.push("user:read", "role:read");
    } else if (userRoles.includes("USER")) {
      userPermissions.push("user:read");
    } else {
      userPermissions.push("user:read");
    }

    // 随机状态，但确保大部分是active
    const status = Math.random() > 0.2 ? "active" : "inactive";
    
    // 生成创建时间（过去6个月内）
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 180));
    createdAt.setHours(Math.floor(Math.random() * 24));
    createdAt.setMinutes(Math.floor(Math.random() * 60));
    
    // 生成最后登录时间（创建时间之后）
    const lastLogin = new Date(createdAt);
    lastLogin.setDate(lastLogin.getDate() + Math.floor(Math.random() * 30));
    lastLogin.setHours(Math.floor(Math.random() * 24));
    lastLogin.setMinutes(Math.floor(Math.random() * 60));

    users.push({
      id: i,
      username,
      name,
      email,
      roles: userRoles,
      permissions: userPermissions,
      status,
      createdAt: createdAt.toISOString(),
      lastLogin: lastLogin.toISOString(),
    });
  }

  return users;
};

const mockUsers: User[] = generateMockUsers();

export async function getUsers(
  filters: Awaited<ReturnType<typeof import("@/lib/user-sreach-param").loadUserSearchParams>> = {
    name: "",
    status: "",
    roles: [],
    page: 1,
    perPage: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
): Promise<UserResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    name = "",
    status,
    roles = [],
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  let filteredUsers = [...mockUsers];
  if (name) {
    const searchLower = name.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower),
    );  
  }

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status);
  }

  if (roles.length > 0) {
    filteredUsers = filteredUsers.filter((user) =>
      roles.some((role) => user.roles.includes(role)),
    );
  }

  filteredUsers.sort((a, b) => {
    const aValue = a[sortBy as keyof User];
    const bValue = b[sortBy as keyof User];

    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = filteredUsers.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize: perPage,
    totalPages,
  };
}

export async function getUserById(id: number): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockUsers.find((user) => user.id === id) || null;
}

export async function createUser(
  userData: Omit<User, "id" | "createdAt">,
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newUser: User = {
    ...userData,
    id: Math.max(...mockUsers.map((u) => u.id)) + 1,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);
  return newUser;
}

export async function updateUser(
  id: number,
  userData: Partial<User>,
): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userIndex = mockUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
  return mockUsers[userIndex];
}

export async function deleteUser(id: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userIndex = mockUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) return false;

  mockUsers.splice(userIndex, 1);
  return true;
}
