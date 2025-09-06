import { Separator } from "@radix-ui/react-separator";
import { Outlet, useLocation, useParams } from "react-router";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// 模拟项目数据
const mockProjects = {
  "1": { name: "RASP VUL" },
  "2": { name: "Tomcat Server" },
  "3": { name: "TongWeb Server" },
  "4": { name: "Mobile System" },
};

export default function Layout() {
  const params = useParams();
  const location = useLocation();
  const projectId = params.projectId;
  const projectName = projectId
    ? mockProjects[projectId as keyof typeof mockProjects]?.name
    : undefined;

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length === 0) {
      return [{ label: "Home", href: "/" }];
    }

    if (pathSegments[0] === "projects") {
      if (pathSegments.length === 1) {
        breadcrumbs.push({ label: "Projects", href: "/projects" });
      } else if (pathSegments.length >= 2) {
        breadcrumbs.push({ label: "Projects", href: "/projects" });
        if (projectName) {
          breadcrumbs.push({
            label: projectName,
            href: `/projects/${projectId}`,
          });
        }
        if (pathSegments[2] === "shells") {
          breadcrumbs.push({
            label: "Shell Connections",
            href: `/projects/${projectId}/shells`,
          });
        }
      }
    } else if (pathSegments[0] === "shells") {
      breadcrumbs.push({ label: "All Shell Connections", href: "/shells" });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      <AppSidebar projectName={projectName} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    No one WebShell Manager
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.label} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
