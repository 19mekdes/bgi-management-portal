export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  compactView: boolean;
}

export interface UpdateProfileData {
  name: string;
  department: string;
}