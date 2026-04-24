import React from 'react';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { StaffDashboard } from './StaffDashboard';
import { Spinner } from '../../components/common/Spinner';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner size="lg" />
      </div>
    );
  }

  // Render different dashboards based on user role
  if (user?.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  if (user?.role === 'MANAGER') {
    return <ManagerDashboard />;
  }

  if (user?.role === 'STAFF') {
    return <StaffDashboard />;
  }

  // Fallback
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center">
        <p className="text-gray-600">Unable to determine user role. Please contact support.</p>
      </div>
    </div>
  );
};