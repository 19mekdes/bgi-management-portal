"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const database_1 = __importDefault(require("../config/database"));
const date_fns_1 = require("date-fns");
class DashboardService {
    async getAdminStats() {
        const [totalEmployees, totalProducts, todayAttendance] = await Promise.all([
            database_1.default.employee.count(),
            database_1.default.product.count(),
            database_1.default.attendance.count({ where: { date: { gte: new Date().setHours(0, 0, 0, 0) } } }),
        ]);
        return { totalEmployees, totalProducts, todayAttendance, pendingTasks: 3 };
    }
    async getManagerStats() {
        return this.getAdminStats(); // similar
    }
    async getStaffStats(employeeId) {
        const attendance = await database_1.default.attendance.count({ where: { employeeId } });
        return { totalWorkDays: attendance, pendingTasks: 1 };
    }
    async getAttendanceTrend(days) {
        const trend = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = (0, date_fns_1.subDays)(new Date(), i);
            const start = new Date(date.setHours(0, 0, 0, 0));
            const end = new Date(date.setHours(23, 59, 59, 999));
            const present = await database_1.default.attendance.count({
                where: { date: { gte: start, lte: end }, checkIn: { not: null } },
            });
            trend.push({ date: (0, date_fns_1.format)(start, 'yyyy-MM-dd'), present });
        }
        return trend;
    }
    async getProductStockDistribution() {
        const categories = await database_1.default.product.groupBy({
            by: ['category'],
            _sum: { quantity: true },
        });
        return categories.map(c => ({ name: c.category, value: c._sum.quantity || 0 }));
    }
    async getRecentActivities(limit) {
        // Placeholder – can be implemented with a separate activity log table
        return [];
    }
}
exports.DashboardService = DashboardService;
