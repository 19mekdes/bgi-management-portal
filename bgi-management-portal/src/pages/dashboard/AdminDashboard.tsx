import React, { useState, useEffect } from 'react';
import { Users, Package, Clock, TrendingUp, LogOut } from 'lucide-react';
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

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
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
      setStats({
        totalEmployees: 156,
        totalProducts: 42,
        todayAttendance: 142,
        pendingTasks: 8,
      });
      
      setAttendanceChartData([
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 135 },
        { name: 'Wed', value: 142 },
        { name: 'Thu', value: 138 },
        { name: 'Fri', value: 145 },
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

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      window.location.href = '/login';
    }
  };

  const attendancePercentage = stats.totalEmployees > 0 
    ? Math.round((stats.todayAttendance / stats.totalEmployees) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Admin'}!
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your brewery today.</p>
        </div>
        
        {/* Google-style Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users size={24} />}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package size={24} />}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatsCard
          title="Today's Attendance"
          value={`${stats.todayAttendance}/${stats.totalEmployees}`}
          icon={<Clock size={24} />}
          color="purple"
          trend={{ value: attendancePercentage, isPositive: attendancePercentage >= 80 }}
        />
        
        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={<TrendingUp size={24} />}
          color="yellow"
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart
          data={attendanceChartData}
          title="Weekly Attendance Trend"
          color="#3b82f6"
          height={300}
        />
        
        <SimpleBarChart
          data={productChartData}
          title="Product Stock Levels"
          color="#10b981"
          height={300}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions userRole={user?.role} />
    </div>
  );
};

export default AdminDashboard;