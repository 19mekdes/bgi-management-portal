import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/feedback/LoadingScreen";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show the public page (login, register, etc.)
  // If authenticated, redirect to dashboard
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};