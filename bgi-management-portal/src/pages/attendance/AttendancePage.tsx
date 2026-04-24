import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StaffAttendancePage from './StaffAttendancePage';
import ManagerAttendancePage from './ManagerAttendancePage';

export const AttendancePage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const userRole = user?.role;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  // Render Staff view
  if (userRole === 'STAFF') {
    return <StaffAttendancePage />;
  }

  // Render Manager/Admin view
  if (userRole === 'MANAGER' || userRole === 'ADMIN') {
    return <ManagerAttendancePage />;
  }

  // Fallback if no role is found
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center">
        <p className="text-gray-600">Unable to determine user role. Please contact support.</p>
      </div>
    </div>
  );
};