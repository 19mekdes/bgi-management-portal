/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Clock } from 'lucide-react';
import { attendanceService } from '../../../services/attendance.service';

interface CheckInOutProps {
  userId?: number;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

interface TodayStatus {
  checkedIn: boolean;
  checkedOut: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
}

export const CheckInOut: React.FC<CheckInOutProps> = ({ 
  userId, 
  onCheckIn, 
  onCheckOut 
}) => {
  const [loading, setLoading] = useState(false);
  const [todayStatus, setTodayStatus] = useState<TodayStatus>({
    checkedIn: false,
    checkedOut: false,
    checkInTime: null,
    checkOutTime: null,
  });

  useEffect(() => {
    fetchTodayStatus();
  }, [userId]);

  const fetchTodayStatus = async () => {
    try {
      const response = await attendanceService.getTodayStatus();
      // Access data from response.data
      const data = response.data;
      setTodayStatus({
        checkedIn: data.checkedIn || false,
        checkedOut: data.checkedOut || false,
        checkInTime: data.checkInTime || null,
        checkOutTime: data.checkOutTime || null,
      });
    } catch (error) {
      console.error('Error fetching attendance status:', error);
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const result = await attendanceService.checkIn();
      // Access data from result.data
      const data = result.data;
      setTodayStatus({
        ...todayStatus,
        checkedIn: true,
        checkInTime: data.checkIn || data.checkInTime,
      });
      onCheckIn?.();
      alert(`Checked in at ${new Date(data.checkIn || data.checkInTime).toLocaleTimeString()}`);
  
    } catch (err: any) {
      alert(err.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const result = await attendanceService.checkOut();
      // Access data from result.data
      const data = result.data;
      setTodayStatus({
        ...todayStatus,
        checkedOut: true,
        checkOutTime: data.checkOut || data.checkOutTime,
      });
      onCheckOut?.();
      alert(`Checked out at ${new Date(data.checkOut || data.checkOutTime).toLocaleTimeString()}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return '—';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Today's Attendance</h3>
      
      <div className="flex items-center justify-around mb-6">
        {/* Check In Status */}
        <div className="flex flex-col items-center">
          <div className={`p-3 rounded-full ${todayStatus.checkedIn ? 'bg-green-100' : 'bg-gray-100'}`}>
            <LogIn 
              size={32} 
              className={todayStatus.checkedIn ? 'text-green-600' : 'text-gray-400'}
            />
          </div>
          <span className="text-sm font-medium mt-2">
            {todayStatus.checkedIn ? 'Checked In' : 'Not Checked In'}
          </span>
          {todayStatus.checkInTime && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <Clock size={12} />
              <span>{formatTime(todayStatus.checkInTime)}</span>
            </div>
          )}
        </div>

        {/* Check Out Status */}
        <div className="flex flex-col items-center">
          <div className={`p-3 rounded-full ${todayStatus.checkedOut ? 'bg-green-100' : 'bg-gray-100'}`}>
            <LogOut 
              size={32} 
              className={todayStatus.checkedOut ? 'text-green-600' : 'text-gray-400'}
            />
          </div>
          <span className="text-sm font-medium mt-2">
            {todayStatus.checkedOut ? 'Checked Out' : 'Not Checked Out'}
          </span>
          {todayStatus.checkOutTime && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <Clock size={12} />
              <span>{formatTime(todayStatus.checkOutTime)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCheckIn}
          disabled={todayStatus.checkedIn || loading}
          className={`
            flex-1 px-6 py-3 rounded-lg font-semibold transition-all
            ${todayStatus.checkedIn || loading
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {loading ? 'Processing...' : 'Check In'}
        </button>
        
        <button
          onClick={handleCheckOut}
          disabled={!todayStatus.checkedIn || todayStatus.checkedOut || loading}
          className={`
            flex-1 px-6 py-3 rounded-lg font-semibold transition-all
            ${!todayStatus.checkedIn || todayStatus.checkedOut || loading
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-700 text-white'
            }
          `}
        >
          {loading ? 'Processing...' : 'Check Out'}
        </button>
      </div>

      {/* Summary Card */}
      {todayStatus.checkedIn && !todayStatus.checkedOut && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            You are currently checked in. Don't forget to check out before leaving.
          </p>
        </div>
      )}
      
      {todayStatus.checkedOut && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            You have completed your attendance for today.
          </p>
        </div>
      )}
    </div>
  );
};