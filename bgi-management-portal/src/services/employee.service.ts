import api from './api';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  department: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeCreateData {
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
}

export interface EmployeeUpdateData {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  department?: string;
  status?: string;
}

export const employeeService = {
  // Get all employees
  getAll: async (): Promise<{ data: Employee[] }> => {
    const response = await api.get('/employees');
    return response;
  },

  // Get employee by ID
  getById: async (id: number): Promise<{ data: Employee }> => {
    const response = await api.get(`/employees/${id}`);
    return response;
  },

  // Create new employee
  create: async (data: EmployeeCreateData): Promise<{ data: Employee }> => {
    const response = await api.post('/employees', data);
    return response;
  },

  // Update employee
  update: async (id: number, data: EmployeeUpdateData): Promise<{ data: Employee }> => {
    const response = await api.put(`/employees/${id}`, data);
    return response;
  },

  // Delete employee
  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  // Update employee status
  updateStatus: async (id: number, status: string): Promise<{ data: Employee }> => {
    const response = await api.patch(`/employees/${id}/status`, { status });
    return response;
  },

  // Get employees by department
  getByDepartment: async (department: string): Promise<{ data: Employee[] }> => {
    const response = await api.get(`/employees/department/${department}`);
    return response;
  },

  // Get employees by role
  getByRole: async (role: string): Promise<{ data: Employee[] }> => {
    const response = await api.get(`/employees/role/${role}`);
    return response;
  },
};