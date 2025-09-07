export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}


export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserTableColumn {
  id: string;
  title: string;
  accessorKey?: string;
  cell?: (props: any) => React.ReactNode;
  enableSorting?: boolean;
  enableHiding?: boolean;
  filterFn?: (row: any, id: string, value: any) => boolean;
}
