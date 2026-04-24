import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
}

interface AttendanceCalendarProps {
  attendanceData: AttendanceRecord[];
  onDateClick?: (date: string) => void;
  currentMonth?: Date;
  onMonthChange?: (date: Date) => void;
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  attendanceData,
  onDateClick,
  currentMonth: propCurrentMonth,
  onMonthChange,
}) => {
  const [internalCurrentMonth, setInternalCurrentMonth] = useState(new Date());
  const currentMonth = propCurrentMonth || internalCurrentMonth;

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (onMonthChange) {
      onMonthChange(newDate);
    } else {
      setInternalCurrentMonth(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (onMonthChange) {
      onMonthChange(newDate);
    } else {
      setInternalCurrentMonth(newDate);
    }
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add padding days from previous month
    const startDayOfWeek = firstDayOfMonth.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add padding days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const getAttendanceStatus = (date: Date): AttendanceRecord | undefined => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData.find(record => record.date === dateStr);
  };

  const getStatusColor = (status?: string): string => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'half-day':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusText = (status?: string): string => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'late':
        return 'Late';
      case 'half-day':
        return 'Half Day';
      default:
        return '';
    }
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const attendance = getAttendanceStatus(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          const statusColor = getStatusColor(attendance?.status);
          const statusText = getStatusText(attendance?.status);

          return (
            <button
              key={index}
              onClick={() => onDateClick?.(date.toISOString().split('T')[0])}
              className={`
                min-h-20 p-2 rounded-lg border transition-all
                ${isCurrentMonthDay ? 'bg-white' : 'bg-gray-50'}
                ${isTodayDate ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
                hover:shadow-md hover:border-blue-300
              `}
            >
              <div className="flex flex-col items-center">
                <span className={`
                  text-sm font-medium mb-1
                  ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}
                  ${isTodayDate ? 'text-blue-600 font-bold' : ''}
                `}>
                  {date.getDate()}
                </span>
                {attendance && (
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full ${statusColor}
                  `}>
                    {statusText}
                  </span>
                )}
                {attendance?.checkIn && (
                  <span className="text-xs text-gray-500 mt-1">
                    {attendance.checkIn.slice(0, 5)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-gray-600">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-gray-600">Late</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-600">Half Day</span>
        </div>
      </div>
    </div>
  );
};