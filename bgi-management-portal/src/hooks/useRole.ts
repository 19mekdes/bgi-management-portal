import { useAuth } from './useAuth';

type Role = 'admin' | 'manager' | 'staff';

export const useRole = () => {
  const { user } = useAuth();
  const userRole = user?.role as Role;

  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager';
  const isStaff = userRole === 'staff';

  const hasRole = (roles: Role | Role[]) => {
    if (!userRole) return false;
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }
    return userRole === roles;
  };

  return {
    role: userRole,
    isAdmin,
    isManager,
    isStaff,
    hasRole,
  };
};