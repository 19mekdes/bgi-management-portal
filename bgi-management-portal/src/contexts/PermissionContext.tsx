import React, { createContext, useContext } from 'react';

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface PermissionContextType {
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  getUserRole: () => UserRole | null;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: React.ReactNode;
  userRole?: UserRole | null;
}

// Role-based permission mappings
const rolePermissions: Record<UserRole, string[]> = {
  ADMIN: [
    'view_dashboard',
    'manage_employees',
    'manage_products',
    'view_attendance',
    'manage_attendance',
    'view_reports',
    'export_reports',
    'manage_roles',
    'manage_settings',
    'delete_records',
  ],
  MANAGER: [
    'view_dashboard',
    'view_employees',
    'manage_products',
    'view_attendance',
    'manage_attendance',
    'view_reports',
    'export_reports',
  ],
  STAFF: [
    'view_dashboard',
    'view_attendance',
    'check_in_out',
  ],
};

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ 
  children, 
  userRole = null 
}) => {
  const getUserRole = (): UserRole | null => {
    return userRole;
  };

  const hasPermission = (permission: string): boolean => {
    if (!userRole) return false;
    const permissions = rolePermissions[userRole];
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!userRole) return false;
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!userRole) return false;
    return permissions.every(permission => hasPermission(permission));
  };

  const value: PermissionContextType = {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserRole,
    isAdmin: userRole === 'ADMIN',
    isManager: userRole === 'MANAGER',
    isStaff: userRole === 'STAFF',
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};