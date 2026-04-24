import React, { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { reportService } from '../../../services/report.service';

interface EmployeeReportFilters {
  startDate: string;
  endDate: string;
  employeeId?: string;
}

interface EmployeeReportProps {
  filters: EmployeeReportFilters;
}

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  attendanceRate: number;
  daysPresent: number;
  daysAbsent: number;
  totalDays: number;
}

type ExportFormat = 'csv' | 'excel' | 'pdf';

export const EmployeeReport: React.FC<EmployeeReportProps> = ({ filters }) => {
  const [data, setData] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportService.getEmployeeReport(filters);
      
      // Handle different response formats
      let reportData: EmployeeData[] = [];
      
      // Check if response is an array directly
      if (Array.isArray(response)) {
        reportData = response;
      } 
      // Check if response has data property that is an array
      else if (response && typeof response === 'object') {
        if (Array.isArray(response.data)) {
          reportData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          reportData = response.data.data;
        } else if (response.data && Array.isArray(response.data.records)) {
          reportData = response.data.records;
        } else if (response.data && Array.isArray(response.data.items)) {
          reportData = response.data.items;
        } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
          // If data is an object with employee data
          const possibleArrays = Object.values(response.data).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            reportData = possibleArrays[0] as EmployeeData[];
          }
        }
      }
      
      setData(reportData);
    } catch (err) {
      console.error('Error fetching employee report:', err);
      setError('Failed to load employee report');
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
      await reportService.exportEmployeeReport(filters, format);
    } catch (err) {
      console.error(`Error exporting as ${format}:`, err);
      setError(`Failed to export as ${format}`);
    }
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
        <p className="text-gray-500">No data available for the selected filters</p>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Average Attendance</p>
          <p className="text-2xl font-bold">
            {Math.round(data.reduce((acc, emp) => acc + emp.attendanceRate, 0) / data.length)}%
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Present Days</p>
          <p className="text-2xl font-bold">
            {data.reduce((acc, emp) => acc + emp.daysPresent, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Absent Days</p>
          <p className="text-2xl font-bold">
            {data.reduce((acc, emp) => acc + emp.daysAbsent, 0)}
          </p>
        </Card>
      </div>

      {/* Employee Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Present
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Absent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      employee.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      employee.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.daysPresent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.daysAbsent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 rounded-full h-2"
                          style={{ width: `${employee.attendanceRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {employee.attendanceRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};