import type { Employee } from './employee.types';

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employee?: Pick<Employee, 'id' | 'name' | 'email'>;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
}

export interface AttendanceStats {
  totalDays: number;
  lastCheckIn: string | null;
  lastCheckOut: string | null;
}

export interface TodayStatus {
  checkedIn: boolean;
  checkedOut: boolean;
}

export interface AttendanceListParams {
  employeeId?: number;
  startDate?: string;
  endDate?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'half-day';

export interface AttendanceCalendarDay {
  date: string;
  status: AttendanceStatus;
}