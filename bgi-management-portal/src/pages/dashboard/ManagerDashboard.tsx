import React, { useState, useEffect } from 'react';
import { Users, Package, Clock, TrendingUp } from 'lucide-react';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { SimpleBarChart } from '../../components/charts/SimpleBarChart';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStats {
  totalEmployees: number;
  totalProducts: number;
  todayAttendance: number;
  pendingTasks: number;
}

interface ChartData {
  name: string;
  value: number;
}

export const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalProducts: 0,
    todayAttendance: 0,
    pendingTasks: 0,
  });

  const [attendanceChartData, setAttendanceChartData] = useState<ChartData[]>([]);
  const [productChartData, setProductChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Mock data for development
      // Replace with actual API call when backend is ready
      setStats({
        totalEmployees: 48,
        totalProducts: 42,
        todayAttendance: 42,
        pendingTasks: 3,
      });
      
      setAttendanceChartData([
        { name: 'Mon', value: 38 },
        { name: 'Tue', value: 42 },
        { name: 'Wed', value: 40 },
        { name: 'Thu', value: 45 },
        { name: 'Fri', value: 42 },
      ]);
      
      setProductChartData([
        { name: 'Lager', value: 150 },
        { name: 'Stout', value: 80 },
        { name: 'Wheat', value: 45 },
        { name: 'IPA', value: 25 },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const attendancePercentage = stats.totalEmployees > 0 
    ? Math.round((stats.todayAttendance / stats.totalEmployees) * 100) 
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
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Manager'}!
        </h1>
        <p className="text-gray-500 mt-1">Team overview and key metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Team Members"
          value={stats.totalEmployees}
          icon={<Users size={24} />}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatsCard
          title="Products"
          value={stats.totalProducts}
          icon={<Package size={24} />}
          color="green"
          trend={{ value: 3, isPositive: true }}
        />
        
        <StatsCard
          title="Today's Attendance"
          value={`${stats.todayAttendance}/${stats.totalEmployees}`}
          icon={<Clock size={24} />}
          color="purple"
          trend={{ value: attendancePercentage, isPositive: attendancePercentage >= 80 }}
        />
        
        <StatsCard
          title="Pending Approvals"
          value={stats.pendingTasks}
          icon={<TrendingUp size={24} />}
          color="yellow"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart
          data={attendanceChartData}
          title="Weekly Attendance Trend"
          color="#3b82f6"
        />
        
        <SimpleBarChart
          data={productChartData}
          title="Product Stock Levels"
          color="#10b981"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions userRole={user?.role} />
    </div>
  );
};