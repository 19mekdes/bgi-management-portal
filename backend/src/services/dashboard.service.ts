import prisma from '../config/database';
import { subDays, format } from 'date-fns';

export class DashboardService {
  async getAdminStats() {
    const [totalEmployees, totalProducts, todayAttendance] = await Promise.all([
      prisma.employee.count(),
      prisma.product.count(),
      prisma.attendance.count({ where: { date: { gte: new Date().setHours(0, 0, 0, 0) } } }),
    ]);
    return { totalEmployees, totalProducts, todayAttendance, pendingTasks: 3 };
  }

  async getManagerStats() {
    return this.getAdminStats(); // similar
  }

  async getStaffStats(employeeId: number) {
    const attendance = await prisma.attendance.count({ where: { employeeId } });
    return { totalWorkDays: attendance, pendingTasks: 1 };
  }

  async getAttendanceTrend(days: number) {
    const trend = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));
      const present = await prisma.attendance.count({
        where: { date: { gte: start, lte: end }, checkIn: { not: null } },
      });
      trend.push({ date: format(start, 'yyyy-MM-dd'), present });
    }
    return trend;
  }

  async getProductStockDistribution() {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _sum: { quantity: true },
    });
    return categories.map(c => ({ name: c.category, value: c._sum.quantity || 0 }));
  }

  async getRecentActivities(limit: number) {
  
    return [];
  }
}