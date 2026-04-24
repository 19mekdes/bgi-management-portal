import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingScreen } from "../components/feedback/LoadingScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

// Lazy load pages with named exports
const LoginPage = lazy(() => import("../pages/auth/LoginPage").then(module => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage").then(module => ({ default: module.DashboardPage })));
const EmployeeListPage = lazy(() => import("../pages/employees/EmployeeListPage").then(module => ({ default: module.EmployeeListPage })));
const EmployeeFormPage = lazy(() => import("../pages/employees/EmployeeFormPage").then(module => ({ default: module.EmployeeFormPage })));
const EmployeeDetailsPage = lazy(() => import("../pages/employees/EmployeeDetailsPage").then(module => ({ default: module.EmployeeDetailsPage })));
const ProductListPage = lazy(() => import("../pages/products/ProductListPage").then(module => ({ default: module.ProductListPage })));
const ProductFormPage = lazy(() => import("../pages/products/ProductFormPage").then(module => ({ default: module.ProductFormPage })));
const ProductDetailsPage = lazy(() => import("../pages/products/ProductDetailsPage").then(module => ({ default: module.ProductDetailsPage })));
const AttendancePage = lazy(() => import("../pages/attendance/AttendancePage").then(module => ({ default: module.AttendancePage })));
const ReportsPage = lazy(() => import("../pages/reports/ReportsPage").then(module => ({ default: module.ReportsPage })));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage").then(module => ({ default: module.SettingsPage })));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage").then(module => ({ default: module.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage").then(module => ({ default: module.ResetPasswordPage })));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<EmployeeFormPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
          
          {/* Product Routes */}
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage />} />
          
          {/* Attendance Routes */}
          <Route path="/attendance" element={<AttendancePage />} />
          
          {/* Reports Routes */}
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* Settings Routes */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};