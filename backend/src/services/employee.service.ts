import prisma from '../config/database';
import bcrypt from 'bcryptjs';

export interface CreateEmployeeData {
  name: string;
  email: string;
  password: string;
  role?: string;
  department?: string;
}

export interface UpdateEmployeeData {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  status?: string;
}

export const employeeService = {
  async getAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        attendances: {
          take: 10,
          orderBy: { date: 'desc' },
        },
      },
    });
  },

  async create(data: CreateEmployeeData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || 'STAFF',
        department: data.department,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        status: true,
      },
    });
  },

  async update(id: number, data: UpdateEmployeeData) {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
        status: data.status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        status: true,
      },
    });
  },

  async delete(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  },

  async updateStatus(id: number, status: string) {
    return await prisma.user.update({
      where: { id },
      data: { status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' },
    });
  },
};

// Also export as a class if needed
export class EmployeeService {
  async getAll() {
    return employeeService.getAll();
  }

  async getById(id: number) {
    return employeeService.getById(id);
  }

  async create(data: CreateEmployeeData) {
    return employeeService.create(data);
  }

  async update(id: number, data: UpdateEmployeeData) {
    return employeeService.update(id, data);
  }

  async delete(id: number) {
    return employeeService.delete(id);
  }
}