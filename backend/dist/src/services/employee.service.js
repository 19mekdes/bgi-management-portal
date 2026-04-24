"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = exports.employeeService = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.employeeService = {
    async getAll() {
        return await database_1.default.user.findMany({
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
    async getById(id) {
        return await database_1.default.user.findUnique({
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
    async create(data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        return await database_1.default.user.create({
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
    async update(id, data) {
        return await database_1.default.user.update({
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
    async delete(id) {
        return await database_1.default.user.delete({
            where: { id },
        });
    },
    async updateStatus(id, status) {
        return await database_1.default.user.update({
            where: { id },
            data: { status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' },
        });
    },
};
// Also export as a class if needed
class EmployeeService {
    async getAll() {
        return exports.employeeService.getAll();
    }
    async getById(id) {
        return exports.employeeService.getById(id);
    }
    async create(data) {
        return exports.employeeService.create(data);
    }
    async update(id, data) {
        return exports.employeeService.update(id, data);
    }
    async delete(id) {
        return exports.employeeService.delete(id);
    }
}
exports.EmployeeService = EmployeeService;
