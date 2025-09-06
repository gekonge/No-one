import {
  Copy,
  Download,
  File,
  FolderOpen,
  Info,
  Play,
  RefreshCw,
  Terminal,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { JavaSystemMonitor } from "./system-info";

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

interface SystemInfo {
  os: string;
  arch: string;
  javaVersion: string;
  javaHome: string;
  workingDir: string;
  user: string;
  hostname: string;
  cpuCores: number;
  totalMemory: string;
  freeMemory: string;
  diskSpace: string;
}

interface FileItem {
  name: string;
  type: "file" | "directory";
  size: string;
  modified: string;
  permissions: string;
}

interface ShellManagerProps {
  shell: ShellConnection;
  onClose: () => void;
}

// 模拟数据
const mockSystemInfo: SystemInfo = {
  os: "Linux Ubuntu 20.04.3 LTS",
  arch: "x86_64",
  javaVersion: "OpenJDK 11.0.16",
  javaHome: "/usr/lib/jvm/java-11-openjdk-amd64",
  workingDir: "/opt/tomcat/webapps/ROOT",
  user: "tomcat",
  hostname: "web-server-01",
  cpuCores: 4,
  totalMemory: "8.0 GB",
  freeMemory: "3.2 GB",
  diskSpace: "45.6 GB / 100 GB",
};

const mockFiles: FileItem[] = [
  {
    name: "..",
    type: "directory",
    size: "-",
    modified: "2024-01-15 10:30",
    permissions: "drwxr-xr-x",
  },
  {
    name: "WEB-INF",
    type: "directory",
    size: "-",
    modified: "2024-01-15 09:15",
    permissions: "drwxr-xr-x",
  },
  {
    name: "assets",
    type: "directory",
    size: "-",
    modified: "2024-01-14 16:20",
    permissions: "drwxr-xr-x",
  },
  {
    name: "index.jsp",
    type: "file",
    size: "2.4 KB",
    modified: "2024-01-15 14:30",
    permissions: "-rw-r--r--",
  },
  {
    name: "shell.jsp",
    type: "file",
    size: "8.7 KB",
    modified: "2024-01-15 10:32",
    permissions: "-rw-r--r--",
  },
  {
    name: "config.xml",
    type: "file",
    size: "1.2 KB",
    modified: "2024-01-10 11:45",
    permissions: "-rw-r--r--",
  },
];

export default function ShellManager({ shell, onClose }: ShellManagerProps) {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<
    Array<{ command: string; output: string; timestamp: string }>
  >([
    {
      command: "whoami",
      output: "tomcat",
      timestamp: "2024-01-15 15:30:15",
    },
    {
      command: "pwd",
      output: "/opt/tomcat/webapps/ROOT",
      timestamp: "2024-01-15 15:30:20",
    },
  ]);
  const [currentPath, setCurrentPath] = useState("/opt/tomcat/webapps/ROOT");
  const [files] = useState<FileItem[]>(mockFiles);
  const [systemInfo] = useState<SystemInfo>(mockSystemInfo);

  const executeCommand = () => {
    if (!command.trim()) return;

    // 模拟命令执行
    const timestamp = new Date().toLocaleString();
    let output = "";

    switch (command.toLowerCase().trim()) {
      case "ls":
      case "dir":
        output = files
          .filter((f) => f.name !== "..")
          .map((f) => f.name)
          .join("\n");
        break;
      case "pwd":
        output = currentPath;
        break;
      case "whoami":
        output = systemInfo.user;
        break;
      case "hostname":
        output = systemInfo.hostname;
        break;
      default:
        output = `Command executed: ${command}`;
    }

    setCommandHistory((prev) => [...prev, { command, output, timestamp }]);
    setCommand("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      executeCommand();
    }
  };

  const navigateToDirectory = (dirName: string) => {
    if (dirName === "..") {
      const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
      setCurrentPath(parentPath);
    } else {
      setCurrentPath(`${currentPath}/${dirName}`);
    }
    // 这里应该发送请求获取新目录的文件列表
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-4 bg-background border rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5" />
            <div>
              <h2 className="text-lg font-semibold">Shell Manager</h2>
              <p className="text-sm text-muted-foreground">{shell.url}</p>
            </div>
            <Badge variant="secondary" className="bg-green-500 text-white">
              Connected
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="info" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                System Info
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                File Manager
              </TabsTrigger>
              <TabsTrigger value="terminal" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Command Terminal
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden p-4">
              {/* 系统信息 */}
              <TabsContent value="info" className="h-full overflow-auto">
                <ScrollArea className="h-full">
                  <JavaSystemMonitor />
                </ScrollArea>
              </TabsContent>

              {/* 文件管理 */}
              <TabsContent value="files" className="h-full overflow-auto">
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-1">
                      <FolderOpen className="h-4 w-4" />
                      <span className="text-sm font-medium">Current Path:</span>
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {currentPath}
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  <Card className="flex-1 min-h-0">
                    <CardContent className="p-0 h-full">
                      <ScrollArea className="h-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Modified</TableHead>
                              <TableHead>Permissions</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {files.map((file, index) => (
                              <TableRow
                                key={`${file.name}-${file.type}-${index}`}
                              >
                                <TableCell>
                                  <button
                                    type="button"
                                    className="flex items-center gap-2 cursor-pointer hover:text-primary text-left"
                                    onClick={() =>
                                      file.type === "directory" &&
                                      navigateToDirectory(file.name)
                                    }
                                    disabled={file.type !== "directory"}
                                  >
                                    {file.type === "directory" ? (
                                      <FolderOpen className="h-4 w-4 text-blue-500" />
                                    ) : (
                                      <File className="h-4 w-4 text-gray-500" />
                                    )}
                                    <span>{file.name}</span>
                                  </button>
                                </TableCell>
                                <TableCell>{file.size}</TableCell>
                                <TableCell>{file.modified}</TableCell>
                                <TableCell>
                                  <code className="text-xs">
                                    {file.permissions}
                                  </code>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    {file.type === "file" && (
                                      <>
                                        <Button variant="ghost" size="sm">
                                          <Download className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 命令终端 */}
              <TabsContent value="terminal" className="h-full overflow-auto">
                <div className="h-full flex flex-col">
                  <Card className="flex-1 mb-4 min-h-0">
                    <CardHeader className="flex-shrink-0">
                      <CardTitle className="flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        Command Output
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-full">
                      <ScrollArea className="h-full p-4">
                        <div className="space-y-4 font-mono text-sm">
                          {commandHistory.map((entry, index) => (
                            <div
                              key={`${entry.timestamp}-${entry.command}-${index}`}
                              className="space-y-1"
                            >
                              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <span>{entry.timestamp}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-500">$</span>
                                <span>{entry.command}</span>
                              </div>
                              <div className="pl-4 whitespace-pre-wrap text-muted-foreground">
                                {entry.output}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2 flex-shrink-0">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Enter command..."
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[60px] font-mono"
                      />
                    </div>
                    <Button onClick={executeCommand} className="self-end">
                      <Play className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
