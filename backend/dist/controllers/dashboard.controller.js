"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const dashboardService = new dashboard_service_1.DashboardService();
class DashboardController {
    async getAdminStats(req, res) {
        const stats = await dashboardService.getAdminStats();
        res.json(stats);
    }
    async getManagerStats(req, res) {
        const stats = await dashboardService.getManagerStats();
        res.json(stats);
    }
    async getStaffStats(req, res) {
        const employeeId = req.user.id;
        const stats = await dashboardService.getStaffStats(employeeId);
        res.json(stats);
    }
    async getAttendanceTrend(req, res) {
        const { days = 7 } = req.query;
        const trend = await dashboardService.getAttendanceTrend(Number(days));
        res.json(trend);
    }
    async getProductStockDistribution(req, res) {
        const distribution = await dashboardService.getProductStockDistribution();
        res.json(distribution);
    }
    async getRecentActivities(req, res) {
        const { limit = 10 } = req.query;
        const activities = await dashboardService.getRecentActivities(Number(limit));
        res.json(activities);
    }
}
exports.DashboardController = DashboardController;
