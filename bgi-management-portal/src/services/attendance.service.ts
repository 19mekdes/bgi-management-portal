import api from './api';

export interface AttendanceRecord {
  id: string;
  employeeId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface AttendanceListParams {
  startDate?: string;
  endDate?: string;
  employeeId?: number;
}

export const attendanceService = {
  checkIn: async () => {
    const response = await api.post('/attendance/check-in');
    return response;
  },

  checkOut: async () => {
    const response = await api.post('/attendance/check-out');
    return response;
  },

  getTodayStatus: async () => {
    const response = await api.get('/attendance/today-status');
    return response;
  },

  getMyStats: async () => {
    const response = await api.get('/attendance/my-stats');
    return response;
  },

  getAll: async (params?: AttendanceListParams) => {
    const response = await api.get('/attendance', { params });
    return response;
  },

  getUserAttendance: async (userId: number, params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get(`/attendance/user/${userId}`, { params });
    return response;
  },
};