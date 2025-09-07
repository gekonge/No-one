"use client";

import {
  Edit,
  Filter,
  Key,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockRoles: Role[] = [
  {
    id: "ADMIN",
    name: "系统管理员",
    description: "拥有系统所有权限，可以管理用户、角色和权限",
    permissions: [
      "user:read",
      "user:write",
      "user:delete",
      "role:read",
      "role:write",
      "role:delete",
      "permission:read",
      "permission:write",
      "system:manage",
    ],
    userCount: 2,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "USER_MANAGER",
    name: "用户管理员",
    description: "可以管理用户账户和基本角色分配",
    permissions: ["user:read", "user:write", "role:read"],
    userCount: 3,
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "ROLE_MANAGER",
    name: "角色管理员",
    description: "可以管理角色和权限配置",
    permissions: [
      "role:read",
      "role:write",
      "permission:read",
      "permission:write",
    ],
    userCount: 1,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "MANAGER",
    name: "部门经理",
    description: "部门管理权限，可以查看用户和角色信息",
    permissions: ["user:read", "role:read"],
    userCount: 5,
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "USER",
    name: "普通用户",
    description: "基础用户权限，只能查看自己的信息",
    permissions: ["user:read"],
    userCount: 25,
    createdAt: "2024-01-19T12:00:00Z",
    updatedAt: "2024-01-19T12:00:00Z",
  },
];

export default function RolesPage() {
  const [roles, _setRoles] = useState<Role[]>(mockRoles);
  const [loading, _setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [_selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDeleteRole = async (_roleId: string) => {
    if (!confirm("确定要删除这个角色吗？此操作不可撤销。")) return;
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRoleTypeColor = (roleId: string) => {
    switch (roleId) {
      case "ADMIN":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "USER_MANAGER":
      case "ROLE_MANAGER":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "MANAGER":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Role Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system roles and permission configurations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateRole}>
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      {/* 角色列表 */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by role name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* 角色表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Information</TableHead>
                  <TableHead>Permission Quantity</TableHead>
                  <TableHead>User Quantity</TableHead>
                  <TableHead>Created Time</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchTerm ? "No matching role" : "No role data"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className={getRoleTypeColor(role.id)}>
                              {role.name}
                            </Badge>
                            {role.id === "ADMIN" && (
                              <Shield className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {role.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {role.permissions.length}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Permissions
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{role.userCount}</span>
                          <span className="text-sm text-muted-foreground">
                            Users
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleEditRole(role)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Users
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-destructive"
                              disabled={role.id === "ADMIN"}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 角色表单对话框 */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit role information and permission configuration"
                : "Create new system role"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
