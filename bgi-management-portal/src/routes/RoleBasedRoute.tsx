import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/feedback/LoadingScreen";

interface RoleBasedRouteProps {
  allowedRoles: Array<'ADMIN' | 'MANAGER' | 'STAFF'>;
  redirectTo?: string;
}

export const RoleBasedRoute = ({ 
  allowedRoles, 
  redirectTo = "/dashboard" 
}: RoleBasedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};