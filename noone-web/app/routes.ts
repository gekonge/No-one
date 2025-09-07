import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/shells/:shellId", "routes/shell/shell-manager.tsx"),

  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("/shells", "routes/shells.tsx"),
    route("/generator", "routes/generator.tsx"),
    route("/profiles", "routes/profiles.tsx"),
    route("/plugins", "routes/plugins.tsx"),
    route("/settings", "routes/settings.tsx"),
    route("/audit", "routes/audit.tsx"),
    ...prefix("admin", [
      route("/users", "routes/admin/users.tsx"),
      route("/roles", "routes/admin/roles.tsx"),
      route("/permissions", "routes/admin/permissions.tsx"),
    ]),
    ...prefix("projects", [
      index("routes/project/project-list.tsx"),
      route("/create", "routes/project/create-project.tsx")
    ]),
  ]),
] satisfies RouteConfig;
