import React, { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { reportService } from '../../../services/report.service';

interface AttendanceReportFilters {
  startDate: string;
  endDate: string;
  employeeId?: string;
}

interface AttendanceReportProps {
  filters: AttendanceReportFilters;
}

interface AttendanceData {
  id: string;
  employeeName: string;
  employeeEmail: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
  department?: string;
}

interface SummaryStats {
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  halfDayCount: number;
  attendanceRate: number;
}

type ExportFormat = 'csv' | 'excel' | 'pdf';

export const AttendanceReport: React.FC<AttendanceReportProps> = ({ filters }) => {
  const [data, setData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<SummaryStats>({
    totalRecords: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    halfDayCount: 0,
    attendanceRate: 0,
  });

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportService.getAttendanceReport(filters);
      // Handle different response formats
      let reportData: AttendanceData[] = [];
      
      if (Array.isArray(response)) {
        reportData = response;
      } else if (response.data && Array.isArray(response.data)) {
        reportData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        reportData = response.data.data;
      } else {
        reportData = [];
      }
      
      setData(reportData);
      
      // Calculate summary statistics
      const total = reportData.length;
      const present = reportData.filter((r) => r.status === 'present').length;
      const absent = reportData.filter((r) => r.status === 'absent').length;
      const late = reportData.filter((r) => r.status === 'late').length;
      const halfDay = reportData.filter((r) => r.status === 'half-day').length;
      
      setStats({
        totalRecords: total,
        presentCount: present,
        absentCount: absent,
        lateCount: late,
        halfDayCount: halfDay,
        attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
      });
    } catch (err) {
      console.error('Error fetching attendance report:', err);
      setError('Failed to load attendance report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      fetchReport();
    }
  }, [filters, fetchReport]);

  const handleExport = async (format: ExportFormat) => {
    try {
      await reportService.exportAttendanceReport(filters, format);
    } catch (err) {
      console.error(`Error exporting as ${format}:`, err);
      setError(`Failed to export as ${format}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Present</span>;
      case 'absent':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Absent</span>;
      case 'late':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Late</span>;
      case 'half-day':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">Half Day</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">—</span>;
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return '—';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchReport} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No attendance data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Export Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={() => handleExport('csv')}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleExport('excel')}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export Excel
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleExport('pdf')}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export PDF
        </Button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalRecords}</p>
          <p className="text-sm text-gray-500">Total Records</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.presentCount}</p>
          <p className="text-sm text-gray-500">Present</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.absentCount}</p>
          <p className="text-sm text-gray-500">Absent</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.lateCount}</p>
          <p className="text-sm text-gray-500">Late</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</p>
          <p className="text-sm text-gray-500">Attendance Rate</p>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-xs text-gray-500">{record.employeeEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(record.date)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatTime(record.checkIn)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatTime(record.checkOut)}</td>
                  <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};