"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceService = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.attendanceService = {
    async getTodayStatus(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendance = await database_1.default.attendance.findFirst({
            where: {
                employeeId: userId,
                date: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                }
            }
        });
        if (!attendance || !attendance.checkIn)
            return null;
        return {
            checkedIn: !!attendance.checkIn,
            checkedOut: !!attendance.checkOut,
            checkInTime: attendance.checkIn,
            checkOutTime: attendance.checkOut,
        };
    },
    async getMyStats(userId) {
        const records = await database_1.default.attendance.findMany({
            where: { employeeId: userId },
            orderBy: { date: 'desc' }
        });
        const totalDays = records.length;
        const daysPresent = records.filter((r) => r.status === 'PRESENT').length;
        const daysAbsent = records.filter((r) => r.status === 'ABSENT').length;
        const lastCheckIn = records.find((r) => r.checkIn)?.checkIn || null;
        const lastCheckOut = records.find((r) => r.checkOut)?.checkOut || null;
        return {
            totalDays,
            daysPresent,
            daysAbsent,
            lastCheckIn,
            lastCheckOut,
        };
    }
};
