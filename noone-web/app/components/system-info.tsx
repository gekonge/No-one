import {
  Activity,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Database,
  Eye,
  Folder,
  Globe,
  Network,
  Search,
  Server,
  Settings,
  Terminal,
  User,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// 模拟数据接口
interface JavaProcessInfo {
  pid: number;
  command: string;
  workingDirectory: string;
  tempDirectory: string;
  middlewareType: string;
  shellMount: string;
  startUser: string;
  startTime: string;
  javaVersion: string;
  jvmArgs: string[];
  mainClass: string;
  requestUrl?: string;
  remoteAddr?: string;
}

interface SystemInfo {
  osName: string;
  osVersion: string;
  architecture: string;
  currentUser: string;
  networkInterfaces: Array<{
    name: string;
    ip: string;
    type: string;
    netmask?: string;
    gateway?: string;
  }>;
  dnsServers: string[];
}

interface JavaProperties {
  [key: string]: string;
}

interface EnvironmentVariables {
  [key: string]: string;
}

interface CurrentThreadStack {
  threadName: string;
  state: string;
  stackElements: string[];
}

const CompactPropertyList = ({
  data,
  title,
  searchValue,
  onSearchChange,
  maxHeight = "300px",
}: {
  data: Record<string, string>;
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  maxHeight?: string;
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredData = useMemo(
    () =>
      Object.entries(data).filter(([key]) =>
        key.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [data, searchValue],
  );

  const toggleExpanded = useCallback((key: string) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(key)) {
        newExpanded.delete(key);
      } else {
        newExpanded.add(key);
      }
      return newExpanded;
    });
  }, []);

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, []);

  const isLongValue = useCallback((value: string) => value.length > 50, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <span className="text-xs text-muted-foreground">
          ({filteredData.length})
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-8 text-xs"
        />
      </div>

      <ScrollArea className="border rounded-lg" style={{ height: maxHeight }}>
        <div className="p-2 space-y-1">
          {filteredData.map(([key, value]) => {
            const isExpanded = expandedItems.has(key);
            const isLong = isLongValue(value);

            return (
              <div
                key={key}
                className="py-1.5 px-2 hover:bg-muted/50 rounded text-xs border-b border-muted/30 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-muted-foreground break-all">
                        {key}
                      </span>
                      {isLong && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                          onClick={() => toggleExpanded(key)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>

                    <div className="space-y-1">
                      {isExpanded ? (
                        <div className="space-y-2">
                          <div className="bg-muted/30 p-2 rounded border">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-muted-foreground">
                                Full Value:
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => copyToClipboard(value, key)}
                              >
                                {copiedKey === key ? (
                                  <span className="text-green-600">
                                    Copied!
                                  </span>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                            <pre className="font-mono text-xs text-foreground whitespace-pre-wrap break-all">
                              {value}
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span
                            className="font-mono text-foreground break-all"
                            title={value}
                            style={{
                              wordBreak: "break-all",
                              lineHeight: "1.3",
                            }}
                          >
                            {isLong ? `${value.substring(0, 50)}...` : value}
                          </span>
                          {isLong && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 px-2 text-xs"
                              onClick={() => toggleExpanded(key)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredData.length === 0 && (
            <div className="text-xs text-muted-foreground text-center py-4">
              No matching properties found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export function JavaSystemMonitor() {
  const [processInfo, setProcessInfo] = useState<JavaProcessInfo | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [javaProperties, setJavaProperties] = useState<JavaProperties>({});
  const [envVariables, setEnvVariables] = useState<EnvironmentVariables>({});
  const [currentThreadStack, setCurrentThreadStack] =
    useState<CurrentThreadStack | null>(null);

  const [propertySearch, setPropertySearch] = useState("");
  const [envSearch, setEnvSearch] = useState("");

  // 模拟数据加载
  useEffect(() => {
    // 模拟 Java 进程信息
    setProcessInfo({
      pid: 12345,
      command: "java -Xmx2g -Xms1g -jar application.jar --server.port=8080",
      workingDirectory: "/opt/myapp",
      tempDirectory: "/tmp/java_pid12345",
      middlewareType: "Spring Boot Application",
      shellMount: "/bin/bash",
      startUser: "appuser",
      startTime: "2024-01-15 09:30:25",
      javaVersion: "17.0.8",
      jvmArgs: ["-Xmx2g", "-Xms1g", "-Dspring.profiles.active=prod"],
      mainClass: "com.example.Application",
      requestUrl: "http://localhost:8080/api/users",
      remoteAddr: "192.168.1.50:45678",
    });

    setSystemInfo({
      osName: "Linux",
      osVersion: "Ubuntu 22.04.3 LTS",
      architecture: "x86_64",
      currentUser: "appuser",
      networkInterfaces: [
        {
          name: "eth0",
          ip: "192.168.1.100",
          type: "Ethernet",
          netmask: "255.255.255.0",
          gateway: "192.168.1.1",
        },
        {
          name: "lo",
          ip: "127.0.0.1",
          type: "Loopback",
          netmask: "255.0.0.0",
        },
        {
          name: "docker0",
          ip: "172.17.0.1",
          type: "Bridge",
          netmask: "255.255.0.0",
        },
        {
          name: "wlan0",
          ip: "192.168.0.50",
          type: "Wireless",
          netmask: "255.255.255.0",
          gateway: "192.168.0.1",
        },
      ],
      dnsServers: ["8.8.8.8", "8.8.4.4", "192.168.1.1"],
    });

    setJavaProperties({
      "java.version": "17.0.8",
      "java.vendor": "Eclipse Adoptium",
      "java.home": "/usr/lib/jvm/java-17-openjdk-amd64",
      "java.class.path":
        "/opt/myapp/application.jar:/opt/myapp/lib/spring-boot-starter-web-2.7.0.jar:/opt/myapp/lib/spring-boot-starter-data-jpa-2.7.0.jar:/opt/myapp/lib/postgresql-42.3.6.jar",
      "user.dir": "/opt/myapp",
      "user.name": "appuser",
      "user.home": "/home/appuser",
      "os.name": "Linux",
      "os.arch": "amd64",
      "os.version": "5.15.0-91-generic",
      "file.separator": "/",
      "path.separator": ":",
      "line.separator": "\n",
      "java.library.path":
        "/usr/java/packages/lib:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib",
      "java.io.tmpdir": "/tmp",
      "java.ext.dirs":
        "/usr/lib/jvm/java-17-openjdk-amd64/lib/ext:/usr/java/packages/lib/ext",
      "sun.boot.class.path":
        "/usr/lib/jvm/java-17-openjdk-amd64/lib/resources.jar:/usr/lib/jvm/java-17-openjdk-amd64/lib/rt.jar",
    });

    setEnvVariables({
      JAVA_HOME: "/usr/lib/jvm/java-17-openjdk-amd64",
      PATH: "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin",
      SPRING_PROFILES_ACTIVE: "production",
      DATABASE_URL:
        "jdbc:postgresql://db.example.com:5432/myapp_production?useSSL=true&serverTimezone=UTC&characterEncoding=utf8",
      REDIS_URL: "redis://redis.example.com:6379/0",
      LOG_LEVEL: "INFO",
      SERVER_PORT: "8080",
      CLASSPATH:
        "/opt/myapp/application.jar:/opt/myapp/lib/*:/opt/myapp/config",
      MAVEN_OPTS: "-Xmx1024m -XX:MaxPermSize=256m",
      SPRING_DATASOURCE_URL: "jdbc:postgresql://localhost:5432/myapp",
      SPRING_DATASOURCE_USERNAME: "myapp_user",
      SPRING_DATASOURCE_PASSWORD: "***HIDDEN***",
    });

    setCurrentThreadStack({
      threadName: "http-nio-8080-exec-1",
      state: "RUNNABLE",
      stackElements: [
        "java.net.SocketInputStream.socketRead0(Native Method)",
        "java.net.SocketInputStream.socketRead(SocketInputStream.java:116)",
        "java.net.SocketInputStream.read(SocketInputStream.java:171)",
        "org.apache.coyote.http11.Http11InputBuffer.fill(Http11InputBuffer.java:789)",
        "org.apache.coyote.http11.Http11InputBuffer.parseRequestLine(Http11InputBuffer.java:348)",
        "org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)",
        "org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1063)",
        "com.example.controller.UserController.getUsers(UserController.java:45)",
        "com.example.service.UserService.findAllUsers(UserService.java:28)",
      ],
    });
  }, []);

  const CompactInfoCard = ({
    title,
    value,
    icon: Icon,
    description,
    className = "",
  }: {
    title: string;
    value: string;
    icon: any;
    description?: string;
    className?: string;
  }) => (
    <div className={`p-3 bg-card border rounded-lg ${className}`}>
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p
            className="text-sm font-semibold text-foreground truncate"
            title={value}
          >
            {value}
          </p>
          {description && (
            <p
              className="text-xs text-muted-foreground mt-0.5 truncate"
              title={description}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (!processInfo || !systemInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
          <p className="text-muted-foreground">Loading system information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Process Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CompactInfoCard
              title="PID"
              value={processInfo.pid.toString()}
              icon={Activity}
            />
            <CompactInfoCard
              title="Java Version"
              value={processInfo.javaVersion}
              icon={Code}
            />
            <CompactInfoCard
              title="Server"
              value={processInfo.middlewareType.split(" ")[0]}
              icon={Database}
            />
            <CompactInfoCard
              title="Start Time"
              value={processInfo.startTime.split(" ")[1]}
              icon={Clock}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CompactInfoCard
              title="Working Directory"
              value={processInfo.workingDirectory}
              icon={Folder}
            />
            <CompactInfoCard
              title="Temp Directory"
              value={processInfo.tempDirectory}
              icon={Folder}
            />
          </div>

          {(processInfo.requestUrl || processInfo.remoteAddr) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {processInfo.requestUrl && (
                <CompactInfoCard
                  title="Current Request"
                  value={processInfo.requestUrl}
                  icon={Globe}
                />
              )}
              {processInfo.remoteAddr && (
                <CompactInfoCard
                  title="Remote Address"
                  value={processInfo.remoteAddr}
                  icon={Network}
                />
              )}
            </div>
          )}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-1">
              <Terminal className="h-4 w-4" />
              <span>Start Command</span>
            </h4>
            <div className="bg-muted/30 p-3 rounded text-xs font-mono text-foreground break-all leading-relaxed">
              {processInfo.command}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>System Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <CompactInfoCard
              title="Operating System"
              value={systemInfo.osName}
              icon={Server}
              description={systemInfo.osVersion}
            />
            <CompactInfoCard
              title="Architecture"
              value={systemInfo.architecture}
              icon={Server}
            />
            <CompactInfoCard
              title="Current User"
              value={systemInfo.currentUser}
              icon={User}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-1">
              <Network className="h-4 w-4" />
              <span>Network Interfaces</span>
              <span className="text-xs text-muted-foreground">
                ({systemInfo.networkInterfaces.length})
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {systemInfo.networkInterfaces.map((iface, index) => (
                <div
                  key={`${iface.name}-${iface.ip}-${index}`}
                  className="border rounded-lg p-2 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground">
                      {iface.name}
                    </span>
                    <Badge
                      variant={
                        iface.type === "Loopback" ? "secondary" : "default"
                      }
                      className="text-xs"
                    >
                      {iface.type}
                    </Badge>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {iface.ip}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>DNS Configuration</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {systemInfo.dnsServers.map((dns) => (
                <Badge
                  key={`dns-${dns}`}
                  variant="outline"
                  className="text-xs font-mono"
                >
                  {dns}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-0">
          <CardContent className="p-4">
            <CompactPropertyList
              data={javaProperties}
              title="Java System Properties"
              searchValue={propertySearch}
              onSearchChange={setPropertySearch}
              maxHeight="350px"
            />
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardContent className="p-4">
            <CompactPropertyList
              data={envVariables}
              title="Environment Variables"
              searchValue={envSearch}
              onSearchChange={setEnvSearch}
              maxHeight="350px"
            />
          </CardContent>
        </Card>
      </div>

      {currentThreadStack && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Current Thread Stack</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base">
                  {currentThreadStack.threadName}
                </h4>
                <Badge
                  variant={
                    currentThreadStack.state === "RUNNABLE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {currentThreadStack.state}
                </Badge>
              </div>
              <ScrollArea className="h-48">
                <div className="space-y-1">
                  {currentThreadStack.stackElements.map((element, index) => (
                    <div
                      key={`stack-${index}-${element.substring(0, 20)}`}
                      className="text-xs font-mono text-muted-foreground p-1 hover:bg-muted/30 rounded break-all"
                    >
                      <span className="text-primary mr-2">#{index + 1}</span>
                      {element}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
