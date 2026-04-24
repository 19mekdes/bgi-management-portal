import api from './api';

export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface EmployeeReportFilters {
  startDate: string;
  endDate: string;
  employeeId?: string;
}

export interface AttendanceReportFilters {
  startDate: string;
  endDate: string;
  employeeId?: string;
}

export interface InventoryReportFilters {
  category?: string;
  minStock?: number;
  maxStock?: number;
}

export const reportService = {
  // Employee Report Methods
  getEmployeeReport: async (filters: EmployeeReportFilters) => {
    const response = await api.get('/reports/employees', { params: filters });
    return response.data;
  },

  exportEmployeeReport: async (filters: EmployeeReportFilters, format: ExportFormat) => {
    const response = await api.get(`/reports/employees/export/${format}`, { 
      params: filters,
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `employee_report.${format === 'excel' ? 'xlsx' : format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return response;
  },

  // Attendance Report Methods
  getAttendanceReport: async (filters: AttendanceReportFilters) => {
    const response = await api.get('/reports/attendance', { params: filters });
    return response.data;
  },

  exportAttendanceReport: async (filters: AttendanceReportFilters, format: ExportFormat) => {
    const response = await api.get(`/reports/attendance/export/${format}`, { 
      params: filters,
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendance_report.${format === 'excel' ? 'xlsx' : format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return response;
  },

  // Inventory Report Methods
  getInventoryReport: async (filters: InventoryReportFilters) => {
    const response = await api.get('/reports/inventory', { params: filters });
    return response.data;
  },

  exportInventoryReport: async (filters: InventoryReportFilters, format: ExportFormat) => {
    const response = await api.get(`/reports/inventory/export/${format}`, { 
      params: filters,
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory_report.${format === 'excel' ? 'xlsx' : format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return response;
  },
};