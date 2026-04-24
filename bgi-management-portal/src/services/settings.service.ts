/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

export interface SystemSettings {
  companyName: string;
  timezone: string;
  dateFormat: string;
  language: string;
  notificationsEnabled: boolean;
  attendanceRequired: boolean;
  lowStockThreshold: number;
}

export interface UpdateSettingsData {
  companyName?: string;
  timezone?: string;
  dateFormat?: string;
  language?: string;
  notificationsEnabled?: boolean;
  attendanceRequired?: boolean;
  lowStockThreshold?: number;
}

export const settingsService = {
  // Get system settings
  getSettings: async (): Promise<{ data: SystemSettings }> => {
    const response = await api.get('/settings');
    return response;
  },

  // Update system settings
  updateSettings: async (data: UpdateSettingsData): Promise<{ data: SystemSettings }> => {
    const response = await api.put('/settings', data);
    return response;
  },

  // Update user role (admin only)
  updateUserRole: async (userId: number, role: string): Promise<{ data: { id: number; role: string } }> => {
    const response = await api.put(`/settings/users/${userId}/role`, { role });
    return response;
  },

  // Get system logs (admin only)
  getSystemLogs: async (params?: { level?: string; startDate?: string; endDate?: string; limit?: number }): Promise<{ data: any[] }> => {
    const response = await api.get('/settings/logs', { params });
    return response;
  },

  // Clear cache (admin only)
  clearCache: async (): Promise<{ data: { message: string } }> => {
    const response = await api.post('/settings/clear-cache');
    return response;
  },

  // Get system health status
  getHealthStatus: async (): Promise<{ data: { status: string; uptime: number; version: string } }> => {
    const response = await api.get('/settings/health');
    return response;
  },
};