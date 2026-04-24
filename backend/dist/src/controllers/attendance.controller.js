"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const attendance_service_1 = require("../services/attendance.service");
const attendanceService = new attendance_service_1.AttendanceService();
class AttendanceController {
    async checkIn(req, res) {
        const employeeId = req.user.id;
        const record = await attendanceService.checkIn(employeeId);
        res.json(record);
    }
    async checkOut(req, res) {
        const employeeId = req.user.id;
        const record = await attendanceService.checkOut(employeeId);
        if (!record) {
            return res.status(400).json({ message: 'No check-in found for today' });
        }
        res.json(record);
    }
    async getTodayStatus(req, res) {
        const employeeId = req.user.id;
        const status = await attendanceService.getTodayStatus(employeeId);
        res.json(status);
    }
    async getMyStats(req, res) {
        const employeeId = req.user.id;
        const stats = await attendanceService.getEmployeeStats(employeeId);
        res.json(stats);
    }
    async getAll(req, res) {
        const { employeeId, startDate, endDate } = req.query;
        const records = await attendanceService.findAll({
            employeeId: employeeId ? Number(employeeId) : undefined,
            startDate: startDate,
            endDate: endDate,
        });
        res.json(records);
    }
}
exports.AttendanceController = AttendanceController;
