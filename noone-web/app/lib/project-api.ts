import type {
  Project,
  ProjectResponse,
  ProjectSearchParams,
} from "@/types/project";

// 生成mock项目数据
const generateMockProjects = (): Project[] => {
  const projects: Project[] = [
    {
      id: "1",
      name: "RASP VUL",
      description: "RASP漏洞检测项目",
      creator: "张三",
      creatorId: "user_1",
      hostCount: 12,
      shellCount: 8,
      status: "active",
      tags: ["RASP", "安全", "漏洞检测"],
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "2",
      name: "Tomcat Server",
      description: "Tomcat服务器管理项目",
      creator: "李四",
      creatorId: "user_2",
      hostCount: 8,
      shellCount: 5,
      status: "active",
      tags: ["Tomcat", "服务器", "Java"],
      createdAt: "2024-01-20T09:00:00Z",
      updatedAt: "2024-01-25T14:00:00Z",
    },
    {
      id: "3",
      name: "TongWeb Server",
      description: "东方通TongWeb应用服务器项目",
      creator: "王五",
      creatorId: "user_3",
      hostCount: 15,
      shellCount: 12,
      status: "active",
      tags: ["TongWeb", "东方通", "应用服务器"],
      createdAt: "2024-02-01T10:00:00Z",
      updatedAt: "2024-02-05T16:00:00Z",
    },
    {
      id: "4",
      name: "Mobile System",
      description: "移动端系统安全检测项目",
      creator: "赵六",
      creatorId: "user_4",
      hostCount: 6,
      shellCount: 4,
      status: "active",
      tags: ["移动端", "安全", "检测"],
      createdAt: "2024-02-10T11:00:00Z",
      updatedAt: "2024-02-15T09:00:00Z",
    },
    {
      id: "5",
      name: "Web Application",
      description: "Web应用程序安全测试项目",
      creator: "钱七",
      creatorId: "user_5",
      hostCount: 20,
      shellCount: 15,
      status: "active",
      tags: ["Web", "安全测试", "应用"],
      createdAt: "2024-02-15T12:00:00Z",
      updatedAt: "2024-02-20T11:00:00Z",
    },
    {
      id: "6",
      name: "Database Security",
      description: "数据库安全审计项目",
      creator: "孙八",
      creatorId: "user_6",
      hostCount: 10,
      shellCount: 7,
      status: "inactive",
      tags: ["数据库", "安全审计", "审计"],
      createdAt: "2024-02-20T13:00:00Z",
      updatedAt: "2024-02-25T10:00:00Z",
    },
    {
      id: "7",
      name: "API Gateway",
      description: "API网关安全监控项目",
      creator: "周九",
      creatorId: "user_7",
      hostCount: 5,
      shellCount: 3,
      status: "active",
      tags: ["API", "网关", "监控"],
      createdAt: "2024-03-01T14:00:00Z",
      updatedAt: "2024-03-05T15:00:00Z",
    },
    {
      id: "8",
      name: "Legacy System",
      description: "遗留系统安全评估项目",
      creator: "吴十",
      creatorId: "user_8",
      hostCount: 3,
      shellCount: 2,
      status: "archived",
      tags: ["遗留系统", "安全评估", "评估"],
      createdAt: "2024-03-05T15:00:00Z",
      updatedAt: "2024-03-10T12:00:00Z",
    },
  ];

  return projects;
};

const mockProjects: Project[] = generateMockProjects();

export async function getProjects(
  filters: ProjectSearchParams = {
    name: "",
    creator: "",
    status: "",
    tags: [],
    page: 1,
    perPage: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
): Promise<ProjectResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    name = "",
    creator = "",
    status = "",
    tags = [],
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  let filteredProjects = [...mockProjects];

  if (name) {
    const searchLower = name.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower),
    );
  }

  if (creator) {
    const creatorLower = creator.toLowerCase();
    filteredProjects = filteredProjects.filter((project) =>
      project.creator.toLowerCase().includes(creatorLower),
    );
  }

  if (status) {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === status,
    );
  }

  if (tags.length > 0) {
    filteredProjects = filteredProjects.filter((project) =>
      tags.some((tag) => project.tags.includes(tag)),
    );
  }

  filteredProjects.sort((a, b) => {
    const aValue = a[sortBy as keyof Project];
    const bValue = b[sortBy as keyof Project];

    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filteredProjects.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = filteredProjects.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize: perPage,
    totalPages,
  };
}

export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProjects.find((project) => project.id === id) || null;
}

export async function createProject(
  projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<Project> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newProject: Project = {
    ...projectData,
    id: `project_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockProjects.push(newProject);
  return newProject;
}

export async function updateProject(
  id: string,
  projectData: Partial<Project>,
): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const projectIndex = mockProjects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return null;

  mockProjects[projectIndex] = {
    ...mockProjects[projectIndex],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };
  return mockProjects[projectIndex];
}

export async function deleteProject(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const projectIndex = mockProjects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return false;

  mockProjects.splice(projectIndex, 1);
  return true;
}
