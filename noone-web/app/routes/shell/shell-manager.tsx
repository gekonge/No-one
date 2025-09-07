import { useState } from "react";
import ShellManager from "@/components/shell-manager";

interface ShellConnection {
  id: string;
  url: string;
  shellType: "webshell" | "reverse" | "bind";
  createTime: string;
  connectTime: string;
  status: "connected" | "disconnected" | "error";
  updateTime: string;
  group: string;
  projectId?: string;
}

export default function ShellManagerPage() {
  const [activeShell, _] = useState<ShellConnection>({
    id: "",
    url: "",
    shellType: "webshell",
    createTime: "",
    connectTime: "",
    status: "connected",
    updateTime: "",
    group: "",
    projectId: "",
  });
  return <ShellManager shell={activeShell} onClose={() => {}} />;
}
