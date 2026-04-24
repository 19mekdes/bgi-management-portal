import React, { useState, useEffect } from 'react';
import { CheckInOut } from './components/CheckInOut';
import { AttendanceTable } from './components/AttendanceTable';
import { attendanceService } from '../../services/attendance.service';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeEmail: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

const StaffAttendancePage: React.FC = () => {
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await attendanceService.getAll();
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = () => {
    fetchAttendanceHistory();
  };

  const handleCheckOut = () => {
    fetchAttendanceHistory();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CheckInOut 
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">My Attendance History</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total records: {attendanceHistory.length}
          </p>
        </div>
        <AttendanceTable 
          records={attendanceHistory} 
          showEmployeeDetails={false} 
        />
      </div>
    </div>
  );
};

export default StaffAttendancePage;