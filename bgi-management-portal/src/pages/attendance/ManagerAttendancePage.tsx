import React, { useState, useEffect, useCallback } from 'react';
import { AttendanceTable } from './components/AttendanceTable';
import { AttendanceCalendar } from './components/AttendanceCalendar';
import { attendanceService } from '../../services/attendance.service';

// Define the expected response type from the API
interface ApiAttendanceRecord {
  id: string;
  employeeId: number;
  employeeName?: string;
  employeeEmail?: string;
  name?: string;
  email?: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
  department?: string;
}

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeEmail: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
  department?: string;
}

// Calendar compatible type (uses optional instead of null)
interface CalendarAttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
}

const ManagerAttendancePage: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filter, setFilter] = useState({ startDate: '', endDate: '', employeeId: '' });

  const fetchAttendanceRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params: {
        startDate?: string;
        endDate?: string;
        employeeId?: number;
      } = {};
      
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;
      if (filter.employeeId) {
        const parsedId = parseInt(filter.employeeId);
        if (!isNaN(parsedId)) params.employeeId = parsedId;
      }
      
      const response = await attendanceService.getAll(params);
      
      // Access data from response.data (Axios puts response in .data)
      let rawRecords: ApiAttendanceRecord[] = [];
      const responseData = response.data;
      
      if (Array.isArray(responseData)) {
        rawRecords = responseData;
      } else if (responseData && Array.isArray(responseData.data)) {
        rawRecords = responseData.data;
      } else if (responseData && Array.isArray(responseData.records)) {
        rawRecords = responseData.records;
      } else if (responseData && Array.isArray(responseData.items)) {
        rawRecords = responseData.items;
      } else {
        rawRecords = [];
      }
      
      // Map to our component's expected format
      const records: AttendanceRecord[] = rawRecords.map(record => ({
        id: record.id,
        employeeName: record.employeeName || record.name || 'Unknown',
        employeeEmail: record.employeeEmail || record.email || 'unknown@email.com',
        date: record.date,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        status: record.status,
        department: record.department || 'N/A',
      }));
      
      setAttendanceRecords(records);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  }, [filter.startDate, filter.endDate, filter.employeeId]);

  useEffect(() => {
    fetchAttendanceRecords();
  }, [fetchAttendanceRecords]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setFilter(prev => ({ ...prev, startDate: date, endDate: date }));
  };

  const handleClearFilters = () => {
    setFilter({ startDate: '', endDate: '', employeeId: '' });
    setSelectedDate(null);
  };

  // Prepare data for calendar - convert null to undefined
  const calendarData: CalendarAttendanceRecord[] = attendanceRecords.map((record) => ({
    date: record.date,
    status: record.status,
    checkIn: record.checkIn || undefined,
    checkOut: record.checkOut || undefined,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            placeholder="Start Date"
            className="px-3 py-2 border rounded-md"
            value={filter.startDate}
            onChange={(e) => setFilter(prev => ({ ...prev, startDate: e.target.value }))}
          />
          <input
            type="date"
            placeholder="End Date"
            className="px-3 py-2 border rounded-md"
            value={filter.endDate}
            onChange={(e) => setFilter(prev => ({ ...prev, endDate: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Employee ID"
            className="px-3 py-2 border rounded-md"
            value={filter.employeeId}
            onChange={(e) => setFilter(prev => ({ ...prev, employeeId: e.target.value }))}
          />
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <AttendanceCalendar
        attendanceData={calendarData}
        onDateClick={handleDateClick}
      />

      {/* Table View */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedDate ? `Attendance for ${selectedDate}` : 'All Attendance Records'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total records: {attendanceRecords.length}
          </p>
        </div>
        <AttendanceTable 
          records={attendanceRecords} 
          showEmployeeDetails={true}
          onRowClick={(record) => console.log('Clicked:', record)}
        />
      </div>
    </div>
  );
};

export default ManagerAttendancePage;