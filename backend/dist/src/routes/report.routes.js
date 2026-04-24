"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const reportController = new report_controller_1.ReportController();
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.roleMiddleware)(['admin', 'manager'])); // Only admin and manager can access reports
router.get('/attendance', reportController.getAttendanceReport);
router.get('/attendance/export', reportController.exportAttendanceReport);
router.get('/inventory', reportController.getInventoryReport);
router.get('/inventory/export', reportController.exportInventoryReport);
router.get('/employees', reportController.getEmployeeReport);
router.get('/employees/export', reportController.exportEmployeeReport);
exports.default = router;
