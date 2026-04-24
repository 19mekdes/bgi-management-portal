"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const dashboardController = new dashboard_controller_1.DashboardController();
router.use(auth_middleware_1.authMiddleware);
// Role-specific dashboard stats
router.get('/admin', (0, role_middleware_1.roleMiddleware)(['admin']), dashboardController.getAdminStats);
router.get('/manager', (0, role_middleware_1.roleMiddleware)(['manager']), dashboardController.getManagerStats);
router.get('/staff', (0, role_middleware_1.roleMiddleware)(['staff']), dashboardController.getStaffStats);
// Shared dashboard data (filtered by role in service)
router.get('/attendance-trend', dashboardController.getAttendanceTrend);
router.get('/product-stock', dashboardController.getProductStockDistribution);
router.get('/recent-activities', dashboardController.getRecentActivities);
exports.default = router;
