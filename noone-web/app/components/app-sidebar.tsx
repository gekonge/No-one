import {
  ArrowLeft,
  Cable,
  Command,
  Folder,
  Home,
  Key,
  PlugZap2,
  Settings,
  Shield,
  Sparkles,
  Sprout,
  UserCheck,
  Users,
} from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const user = {
  name: "ReaJason",
  email: "reajason1225@gmail.com",
  avatar:
    "https://cdn.jsdelivr.net/gh/ReaJason/blog_imgs/default/blog_avatar.jpg",
};

const adminItems = [
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: UserCheck,
  },
  {
    title: "Permissions",
    url: "/admin/permissions",
    icon: Key,
  },
];

const globalItems = [
  {
    title: "Generator",
    url: `/generator`,
    icon: Sprout,
  },
  {
    title: "Profiles",
    url: "/profiles",
    icon: Sparkles,
  },
  {
    title: "Plugins",
    url: "/plugins",
    icon: PlugZap2,
  },
  {
    title: "Audit",
    url: "/audit",
    icon: Shield,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  projectName?: string;
}

export function AppSidebar({ projectName }: AppSidebarProps) {
  const params = useParams();
  const location = useLocation();
  const projectId = params.projectId;

  const projectItems = projectId
    ? [
        {
          title: "Shells",
          url: `/projects/${projectId}/shells`,
          icon: Cable,
        },
      ]
    : [];

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" rel="noopener noreferrer">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    No one Shell Manager
                  </span>
                  <span className="truncate text-xs">Professional</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <NavLink to="/">
                    <Home />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    {location.pathname === item.url ? (
                      <div className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {projectId && (
          <>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === "/projects"}
                    >
                      {location.pathname === "/projects" ? (
                        <div className="flex items-center gap-2">
                          <ArrowLeft />
                          <span>Back to Projects</span>
                        </div>
                      ) : (
                        <NavLink to="/projects">
                          <ArrowLeft />
                          <span>Back to Projects</span>
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>
                {projectName || `Project ${projectId}`}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projectItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        {location.pathname === item.url ? (
                          <div className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                        ) : (
                          <NavLink to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </NavLink>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* 全局导航 */}
        <SidebarGroup>
          <SidebarGroupLabel>Global</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!projectId && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/projects"}
                  >
                    {location.pathname === "/projects" ? (
                      <div className="flex items-center gap-2">
                        <Folder />
                        <span>Projects</span>
                      </div>
                    ) : (
                      <NavLink to="/projects">
                        <Folder />
                        <span>Projects</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {!projectId && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/shells"}
                  >
                    {location.pathname === "/shells" ? (
                      <div className="flex items-center gap-2">
                        <Cable />
                        <span>Shells</span>
                      </div>
                    ) : (
                      <NavLink to="/shells">
                        <Cable />
                        <span>Shells</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {globalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    {location.pathname === item.url ? (
                      <div className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
