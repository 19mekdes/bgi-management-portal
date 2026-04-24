"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportService = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.reportService = {
    async getAttendanceReport(startDate, endDate) {
        const records = await database_1.default.attendance.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                employee: {
                    select: {
                        name: true,
                        email: true,
                        department: true,
                    },
                },
            },
            orderBy: { date: 'desc' },
        });
        const summary = {
            total: records.length,
            present: records.filter((r) => r.status === 'PRESENT').length,
            absent: records.filter((r) => r.status === 'ABSENT').length,
            late: records.filter((r) => r.status === 'LATE').length,
            halfDay: records.filter((r) => r.status === 'HALF_DAY').length,
            rate: 0,
        };
        summary.rate = summary.total > 0
            ? (summary.present / summary.total) * 100
            : 0;
        return { records, summary };
    },
    async getEmployeeReport(startDate, endDate) {
        const employees = await database_1.default.user.findMany({
            where: {
                attendances: {
                    some: {
                        date: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                },
            },
            include: {
                attendances: {
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                },
            },
        });
        return employees.map((emp) => ({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            role: emp.role,
            department: emp.department,
            totalDays: emp.attendances.length,
            daysPresent: emp.attendances.filter((a) => a.status === 'PRESENT').length,
            daysAbsent: emp.attendances.filter((a) => a.status === 'ABSENT').length,
            attendanceRate: emp.attendances.length > 0
                ? (emp.attendances.filter((a) => a.status === 'PRESENT').length / emp.attendances.length) * 100
                : 0,
        }));
    },
    async getInventoryReport() {
        const products = await database_1.default.product.findMany({
            orderBy: { category: 'asc' },
        });
        const summary = {
            totalProducts: products.length,
            totalStock: products.reduce((sum, p) => sum + p.quantity, 0),
            lowStock: products.filter((p) => p.quantity > 0 && p.quantity < 10).length,
            outOfStock: products.filter((p) => p.quantity === 0).length,
            categories: [...new Set(products.map((p) => p.category))].length,
        };
        return { products, summary };
    },
};
