import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendance.service';
import { AuthRequest } from '../types/express';

const attendanceService = new AttendanceService();

export class AttendanceController {
  async checkIn(req: AuthRequest, res: Response) {
    const employeeId = req.user!.id;
    const record = await attendanceService.checkIn(employeeId);
    res.json(record);
  }

  async checkOut(req: AuthRequest, res: Response) {
    const employeeId = req.user!.id;
    const record = await attendanceService.checkOut(employeeId);
    if (!record) {
      return res.status(400).json({ message: 'No check-in found for today' });
    }
    res.json(record);
  }

  async getTodayStatus(req: AuthRequest, res: Response) {
    const employeeId = req.user!.id;
    const status = await attendanceService.getTodayStatus(employeeId);
    res.json(status);
  }

  async getMyStats(req: AuthRequest, res: Response) {
    const employeeId = req.user!.id;
    const stats = await attendanceService.getEmployeeStats(employeeId);
    res.json(stats);
  }

  async getAll(req: Request, res: Response) {
    const { employeeId, startDate, endDate } = req.query;
    const records = await attendanceService.findAll({
      employeeId: employeeId ? Number(employeeId) : undefined,
      startDate: startDate as string,
      endDate: endDate as string,
    });
    res.json(records);
  }
}