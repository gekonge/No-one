import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("/shells", "routes/shells.tsx"),
    route("/generator", "routes/generator.tsx"),
    route("/profiles", "routes/profiles.tsx"),
    route("/plugins", "routes/plugins.tsx"),
    route("/settings", "routes/settings.tsx"),
    route("/audit", "routes/audit.tsx"),
    ...prefix("projects", [
      index("routes/project/project-list.tsx"),
      route("/create", "routes/project/create-project.tsx"),
      route(":projectId/shells", "routes/project/shells.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
