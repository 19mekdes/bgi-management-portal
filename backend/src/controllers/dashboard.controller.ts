import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { AuthRequest } from '../types/express';

const dashboardService = new DashboardService();

export class DashboardController {
  async getAdminStats(req: AuthRequest, res: Response) {
    const stats = await dashboardService.getAdminStats();
    res.json(stats);
  }

  async getManagerStats(req: AuthRequest, res: Response) {
    const stats = await dashboardService.getManagerStats();
    res.json(stats);
  }

  async getStaffStats(req: AuthRequest, res: Response) {
    const employeeId = req.user!.id;
    const stats = await dashboardService.getStaffStats(employeeId);
    res.json(stats);
  }

  async getAttendanceTrend(req: Request, res: Response) {
    const { days = 7 } = req.query;
    const trend = await dashboardService.getAttendanceTrend(Number(days));
    res.json(trend);
  }

  async getProductStockDistribution(req: Request, res: Response) {
    const distribution = await dashboardService.getProductStockDistribution();
    res.json(distribution);
  }

  async getRecentActivities(req: Request, res: Response) {
    const { limit = 10 } = req.query;
    const activities = await dashboardService.getRecentActivities(Number(limit));
    res.json(activities);
  }
}