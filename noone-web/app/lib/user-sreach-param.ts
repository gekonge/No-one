import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const userSearchParams = {
  name: parseAsString.withDefault(""),
  status: parseAsString.withDefault(""),
  roles: parseAsArrayOf(parseAsString).withDefault([]),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10), // 修改为 perPage 以匹配 use-data-table.ts
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsString.withDefault("desc"),
};

export const loadUserSearchParams = createLoader(userSearchParams);
