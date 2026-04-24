"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const attendanceController = new attendance_controller_1.AttendanceController();
router.use(auth_middleware_1.authMiddleware);
// Staff routes
router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);
router.get('/today-status', attendanceController.getTodayStatus);
router.get('/my-stats', attendanceController.getMyStats);
// Manager/Admin routes
router.get('/', (0, role_middleware_1.roleMiddleware)(['admin', 'manager']), attendanceController.getAll);
exports.default = router;
