import { Calendar, Plus, Search, Server } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Project {
  id: string;
  name: string;
  creator: string;
  hostCount: number;
  createdAt: string;
}

// 模拟数据
const mockProjects: Project[] = [
  {
    id: "1",
    name: "RASP VUL",
    creator: "张三",
    hostCount: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tomcat Server",
    creator: "李四",
    hostCount: 8,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "TongWeb Server",
    creator: "王五",
    hostCount: 15,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Mobile System",
    creator: "赵六",
    hostCount: 6,
    createdAt: "2024-02-10",
  },
];

export default function ProjectList() {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredAndPaginatedProjects = useMemo(() => {
    // 根据项目名称过滤
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // 计算分页
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProjects = filtered.slice(startIndex, endIndex);

    return {
      projects: paginatedProjects,
      totalPages,
      totalCount: filtered.length,
    };
  }, [projects, searchTerm, currentPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Project Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage your all projects</p>
        </div>
        <Link to="/projects/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search project name..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredAndPaginatedProjects.totalCount} projects
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndPaginatedProjects.projects.map((project) => (
          <Link to={`/projects/${project.id}/shells`} key={project.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl text-balance">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span>
                    shells:
                    <Badge variant="secondary" className="text-sm">
                      {project.hostCount}
                    </Badge>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created at: {project.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredAndPaginatedProjects.projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
            {searchTerm ? (
              <>
                <p className="text-lg">No matching projects found</p>
                <p className="text-sm">Try using other keywords to search</p>
              </>
            ) : (
              <>
                <p className="text-lg">No projects found</p>
                <p className="text-sm">
                  Click the button above to create your first project
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {filteredAndPaginatedProjects.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
