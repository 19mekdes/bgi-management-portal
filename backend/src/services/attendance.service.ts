import prisma from '../config/database';
export const attendanceService = {
  async getTodayStatus(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });
    
    if (!attendance || !attendance.checkIn) return null;
    
    return {
      checkedIn: !!attendance.checkIn,
      checkedOut: !!attendance.checkOut,
      checkInTime: attendance.checkIn,
      checkOutTime: attendance.checkOut,
    };
  },
  
  async getMyStats(userId: number) {
    const records = await prisma.attendance.findMany({
      where: { employeeId: userId },
      orderBy: { date: 'desc' }
    });
    
    const totalDays = records.length;
    const daysPresent = records.filter((r: { status: string; }) => r.status === 'PRESENT').length;
    const daysAbsent = records.filter((r: { status: string; }) => r.status === 'ABSENT').length;
    const lastCheckIn = records.find((r: { checkIn: any; }) => r.checkIn)?.checkIn || null;
    const lastCheckOut = records.find((r: { checkOut: any; }) => r.checkOut)?.checkOut || null;
    
    return {
      totalDays,
      daysPresent,
      daysAbsent,
      lastCheckIn,
      lastCheckOut,
    };
  }
};