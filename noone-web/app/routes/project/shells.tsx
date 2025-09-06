import { useState } from "react";
import ShellList from "@/components/shell-list";
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

export default function ProjectShellsPage() {
  const [activeShell, setActiveShell] = useState<ShellConnection | null>(null);

  const handleConnectShell = (shell: ShellConnection) => {
    setActiveShell(shell);
  };

  const handleCloseShell = () => {
    setActiveShell(null);
  };

  return (
    <>
      <ShellList onConnectShell={handleConnectShell} />
      {activeShell && (
        <ShellManager shell={activeShell} onClose={handleCloseShell} />
      )}
    </>
  );
}
