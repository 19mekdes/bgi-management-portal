import { TrendingUp, Clock, CalendarDays } from 'lucide-react';

interface AttendanceStatsProps {
  stats: {
    totalDays: number;
    lastCheckIn: string | null;
    lastCheckOut: string | null;
  };
}

export const AttendanceStats = ({ stats }: AttendanceStatsProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">My Attendance Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <CalendarDays size={32} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Work Days</p>
            <p className="text-2xl font-bold">{stats.totalDays}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Clock size={32} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Last Check In</p>
            <p className="font-semibold">{stats.lastCheckIn ? new Date(stats.lastCheckIn).toLocaleTimeString() : 'Never'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <TrendingUp size={32} className="text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Last Check Out</p>
            <p className="font-semibold">{stats.lastCheckOut ? new Date(stats.lastCheckOut).toLocaleTimeString() : 'Never'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};