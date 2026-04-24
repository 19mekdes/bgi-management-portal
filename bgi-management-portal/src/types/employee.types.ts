import type { UserRole } from './user.types';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeCreateData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
}

export interface EmployeeUpdateData {
  name?: string;
  email?: string;
  role?: UserRole;
  department?: string;
}

export interface EmployeeListParams {
  search?: string;
  page?: number;
  limit?: number;
  role?: UserRole;
  department?: string;
}

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
  page: number;
  totalPages: number;
}