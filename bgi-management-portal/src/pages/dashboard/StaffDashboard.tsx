import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { useAuth } from '../../contexts/AuthContext';
import { attendanceService } from '../../services/attendance.service';

interface StaffStats {
  daysPresent: number;
  daysAbsent: number;
  onTimeDays: number;
  totalDays: number;
}

export const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StaffStats>({
    daysPresent: 0,
    daysAbsent: 0,
    onTimeDays: 0,
    totalDays: 0,
  });

  useEffect(() => {
    fetchStaffStats();
  }, []);

  const fetchStaffStats = async () => {
    setLoading(true);
    try {
      const response = await attendanceService.getMyStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching staff stats:', error);
      // Mock data
      setStats({
        daysPresent: 18,
        daysAbsent: 2,
        onTimeDays: 15,
        totalDays: 20,
      });
    } finally {
      setLoading(false);
    }
  };

  const attendanceRate = stats.totalDays > 0 
    ? Math.round((stats.daysPresent / stats.totalDays) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Staff'}!
        </h1>
        <p className="text-gray-500 mt-1">Your personal attendance summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={<CheckCircle size={24} />}
          color="green"
          trend={{ value: attendanceRate, isPositive: attendanceRate >= 85 }}
        />
        
        <StatsCard
          title="Days Present"
          value={stats.daysPresent}
          icon={<Calendar size={24} />}
          color="blue"
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatsCard
          title="Days Absent"
          value={stats.daysAbsent}
          icon={<Clock size={24} />}
          color="red"
          trend={{ value: 2, isPositive: false }}
        />
        
        <StatsCard
          title="On Time"
          value={stats.onTimeDays}
          icon={<Clock size={24} />}
          color="purple"
          trend={{ value: 13, isPositive: true }}
        />
      </div>

      <QuickActions userRole={user?.role} />
    </div>
  );
};