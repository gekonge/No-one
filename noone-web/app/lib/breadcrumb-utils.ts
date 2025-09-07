import { useMatches } from "react-router";

// 模拟项目数据
const mockProjects = {
  "1": { name: "RASP VUL" },
  "2": { name: "Tomcat Server" },
  "3": { name: "TongWeb Server" },
  "4": { name: "Mobile System" },
};

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// 路径到面包屑标签的映射
const pathToBreadcrumb: Record<string, string> = {
  "/": "Home",
  "/shells": "All Shell Connections",
  "/generator": "Generator",
  "/profiles": "Profiles",
  "/plugins": "Plugins",
  "/settings": "Settings",
  "/audit": "Audit",
  "/admin/users": "Users",
  "/admin/roles": "Roles",
  "/admin/permissions": "Permissions",
  "/projects": "Projects",
  "/projects/create": "Create Project",
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const matches = useMatches();

  // 获取当前路径
  const currentPath = matches[matches.length - 1]?.pathname || "/";

  const breadcrumbs: BreadcrumbItem[] = [];

  // 处理根路径
  if (currentPath === "/") {
    return [{ label: "Home", href: "/" }];
  }

  // 处理 admin 路由
  if (currentPath.startsWith("/admin")) {
    breadcrumbs.push({ label: "Admin", href: "/admin" });

    const adminBreadcrumb = pathToBreadcrumb[currentPath];
    if (adminBreadcrumb) {
      breadcrumbs.push({ label: adminBreadcrumb, href: currentPath });
    }
  }
  // 处理 projects 路由
  else if (currentPath.startsWith("/projects")) {
    breadcrumbs.push({ label: "Projects", href: "/projects" });

    // 处理项目详情页
    const projectMatch = currentPath.match(/^\/projects\/([^/]+)(?:\/(.+))?$/);
    if (projectMatch) {
      const projectId = projectMatch[1];
      const subPath = projectMatch[2];

      // 如果是项目详情页
      if (projectId && !subPath) {
        const projectName =
          mockProjects[projectId as keyof typeof mockProjects]?.name;
        if (projectName) {
          breadcrumbs.push({
            label: projectName,
            href: `/projects/${projectId}`,
          });
        }
      }
      // 如果是项目的子页面
      else if (projectId && subPath) {
        const projectName =
          mockProjects[projectId as keyof typeof mockProjects]?.name;
        if (projectName) {
          breadcrumbs.push({
            label: projectName,
            href: `/projects/${projectId}`,
          });
        }

        // 添加子页面面包屑
        if (subPath === "shells") {
          breadcrumbs.push({ label: "Shell Connections", href: currentPath });
        }
      }
      // 如果是创建项目页面
      else if (currentPath === "/projects/create") {
        breadcrumbs.push({ label: "Create Project", href: currentPath });
      }
    }
  }
  // 处理其他路由
  else {
    const breadcrumb = pathToBreadcrumb[currentPath];
    if (breadcrumb) {
      breadcrumbs.push({ label: breadcrumb, href: currentPath });
    }
  }

  return breadcrumbs;
}
