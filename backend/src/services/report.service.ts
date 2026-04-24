import prisma from '../config/database';

export const reportService = {
  async getAttendanceReport(startDate: Date, endDate: Date) {
    const records = await prisma.attendance.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        employee: {
          select: {
            name: true,
            email: true,
            department: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    const summary = {
      total: records.length,
      present: records.filter((r: { status: string; }) => r.status === 'PRESENT').length,
      absent: records.filter((r: { status: string; }) => r.status === 'ABSENT').length,
      late: records.filter((r: { status: string; }) => r.status === 'LATE').length,
      halfDay: records.filter((r: { status: string; }) => r.status === 'HALF_DAY').length,
      rate: 0,
    };

    summary.rate = summary.total > 0 
      ? (summary.present / summary.total) * 100 
      : 0;

    return { records, summary };
  },

  async getEmployeeReport(startDate: Date, endDate: Date) {
    const employees = await prisma.user.findMany({
      where: {
        attendances: {
          some: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      include: {
        attendances: {
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    });

    return employees.map((emp: { id: any; name: any; email: any; role: any; department: any; attendances: { length: number; filter: (arg0: { (a: any): boolean; (a: any): boolean; (a: any): boolean; }) => { (): any; new(): any; length: number; }; }; }) => ({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      totalDays: emp.attendances.length,
      daysPresent: emp.attendances.filter((a: { status: string; }) => a.status === 'PRESENT').length,
      daysAbsent: emp.attendances.filter((a: { status: string; }) => a.status === 'ABSENT').length,
      attendanceRate: emp.attendances.length > 0 
        ? (emp.attendances.filter((a: { status: string; }) => a.status === 'PRESENT').length / emp.attendances.length) * 100 
        : 0,
    }));
  },

  async getInventoryReport() {
    const products = await prisma.product.findMany({
      orderBy: { category: 'asc' },
    });

    const summary: any = {
      totalProducts: products.length,
      totalStock: products.reduce((sum: any, p: { quantity: any; }) => sum + p.quantity, 0),
      lowStock: products.filter((p: { quantity: number; }) => p.quantity > 0 && p.quantity < 10).length,
      outOfStock: products.filter((p: { quantity: number; }) => p.quantity === 0).length,
      categories: [...new Set(products.map((p: { category: any; }) => p.category))].length,
    };

    return { products, summary };
  },
};