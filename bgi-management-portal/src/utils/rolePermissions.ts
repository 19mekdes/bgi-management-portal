import type { UserRole } from '../contexts/AuthContext';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Define all available permissions
export const PERMISSIONS: Record<string, Permission> = {
  // Dashboard permissions
  VIEW_DASHBOARD: {
    id: 'view_dashboard',
    name: 'View Dashboard',
    description: 'Access to view the dashboard',
    category: 'Dashboard',
  },
  
  // Employee permissions
  VIEW_EMPLOYEES: {
    id: 'view_employees',
    name: 'View Employees',
    description: 'View employee list and details',
    category: 'Employees',
  },
  MANAGE_EMPLOYEES: {
    id: 'manage_employees',
    name: 'Manage Employees',
    description: 'Create, edit, and delete employees',
    category: 'Employees',
  },
  
  // Product permissions
  VIEW_PRODUCTS: {
    id: 'view_products',
    name: 'View Products',
    description: 'View product list and details',
    category: 'Products',
  },
  MANAGE_PRODUCTS: {
    id: 'manage_products',
    name: 'Manage Products',
    description: 'Create, edit, and delete products',
    category: 'Products',
  },
  
  // Attendance permissions
  VIEW_ATTENDANCE: {
    id: 'view_attendance',
    name: 'View Attendance',
    description: 'View attendance records',
    category: 'Attendance',
  },
  MANAGE_ATTENDANCE: {
    id: 'manage_attendance',
    name: 'Manage Attendance',
    description: 'Edit and delete attendance records',
    category: 'Attendance',
  },
  CHECK_IN_OUT: {
    id: 'check_in_out',
    name: 'Check In/Out',
    description: 'Record daily check-in and check-out',
    category: 'Attendance',
  },
  
  // Report permissions
  VIEW_REPORTS: {
    id: 'view_reports',
    name: 'View Reports',
    description: 'View report data',
    category: 'Reports',
  },
  EXPORT_REPORTS: {
    id: 'export_reports',
    name: 'Export Reports',
    description: 'Export reports to CSV, Excel, or PDF',
    category: 'Reports',
  },
  
  // Settings permissions
  MANAGE_ROLES: {
    id: 'manage_roles',
    name: 'Manage Roles',
    description: 'Change user roles and permissions',
    category: 'Settings',
  },
  MANAGE_SETTINGS: {
    id: 'manage_settings',
    name: 'Manage Settings',
    description: 'Configure system settings',
    category: 'Settings',
  },
  DELETE_RECORDS: {
    id: 'delete_records',
    name: 'Delete Records',
    description: 'Permanently delete records',
    category: 'Settings',
  },
};

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: [
    PERMISSIONS.VIEW_DASHBOARD.id,
    PERMISSIONS.VIEW_EMPLOYEES.id,
    PERMISSIONS.MANAGE_EMPLOYEES.id,
    PERMISSIONS.VIEW_PRODUCTS.id,
    PERMISSIONS.MANAGE_PRODUCTS.id,
    PERMISSIONS.VIEW_ATTENDANCE.id,
    PERMISSIONS.MANAGE_ATTENDANCE.id,
    PERMISSIONS.CHECK_IN_OUT.id,
    PERMISSIONS.VIEW_REPORTS.id,
    PERMISSIONS.EXPORT_REPORTS.id,
    PERMISSIONS.MANAGE_ROLES.id,
    PERMISSIONS.MANAGE_SETTINGS.id,
    PERMISSIONS.DELETE_RECORDS.id,
  ],
  MANAGER: [
    PERMISSIONS.VIEW_DASHBOARD.id,
    PERMISSIONS.VIEW_EMPLOYEES.id,
    PERMISSIONS.VIEW_PRODUCTS.id,
    PERMISSIONS.MANAGE_PRODUCTS.id,
    PERMISSIONS.VIEW_ATTENDANCE.id,
    PERMISSIONS.MANAGE_ATTENDANCE.id,
    PERMISSIONS.CHECK_IN_OUT.id,
    PERMISSIONS.VIEW_REPORTS.id,
    PERMISSIONS.EXPORT_REPORTS.id,
  ],
  STAFF: [
    PERMISSIONS.VIEW_DASHBOARD.id,
    PERMISSIONS.VIEW_ATTENDANCE.id,
    PERMISSIONS.CHECK_IN_OUT.id,
  ],
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (role: UserRole, permissionId: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.includes(permissionId) || false;
};

/**
 * Get all permissions for a role
 */
export const getRolePermissions = (role: UserRole): string[] => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Check if a role has any of the specified permissions
 */
export const hasAnyPermission = (role: UserRole, permissionIds: string[]): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissionIds.some(permissionId => permissions.includes(permissionId));
};

/**
 * Check if a role has all of the specified permissions
 */
export const hasAllPermissions = (role: UserRole, permissionIds: string[]): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissionIds.every(permissionId => permissions.includes(permissionId));
};

/**
 * Get permissions grouped by category
 */
export const getPermissionsByCategory = (role: UserRole): Record<string, Permission[]> => {
  const rolePermissionIds = ROLE_PERMISSIONS[role] || [];
  const grouped: Record<string, Permission[]> = {};
  
  for (const permissionId of rolePermissionIds) {
    const permission = Object.values(PERMISSIONS).find(p => p.id === permissionId);
    if (permission) {
      if (!grouped[permission.category]) {
        grouped[permission.category] = [];
      }
      grouped[permission.category].push(permission);
    }
  }
  
  return grouped;
};

/**
 * Get all available permissions (for admin configuration)
 */
export const getAllPermissions = (): Permission[] => {
  return Object.values(PERMISSIONS);
};

/**
 * Get permissions by category (all permissions)
 */
export const getAllPermissionsByCategory = (): Record<string, Permission[]> => {
  const grouped: Record<string, Permission[]> = {};
  
  for (const permission of Object.values(PERMISSIONS)) {
    if (!grouped[permission.category]) {
      grouped[permission.category] = [];
    }
    grouped[permission.category].push(permission);
  }
  
  return grouped;
};