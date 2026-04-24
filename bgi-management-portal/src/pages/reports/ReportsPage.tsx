import React, { useState } from 'react';
import { AttendanceReport } from './components/AttendanceReport';
import { EmployeeReport } from './components/EmployeeReport';
import { InventoryReport } from './components/InventoryReport';
import { ReportFilters } from './components/ReportFilters';
import { Card } from '../../components/common/Card';

type ReportType = 'attendance' | 'employee' | 'inventory';

interface Filters {
  startDate: string;
  endDate: string;
  employeeId: string;
  productId: string;
  reportType: ReportType;
  category?: string;
  minStock?: number;
  maxStock?: number;
}

export const ReportsPage: React.FC = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('attendance');
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    employeeId: '',
    productId: '',
    reportType: 'attendance',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      employeeId: '',
      productId: '',
      reportType: 'attendance',
    });
  };

  const handleReportTypeChange = (type: ReportType) => {
    setActiveReport(type);
    setFilters(prev => ({ ...prev, reportType: type }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">Generate and export detailed reports</p>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => handleReportTypeChange('attendance')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeReport === 'attendance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attendance Report
          </button>
          <button
            onClick={() => handleReportTypeChange('employee')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeReport === 'employee'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Employee Report
          </button>
          <button
            onClick={() => handleReportTypeChange('inventory')}
            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeReport === 'inventory'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inventory Report
          </button>
        </nav>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Report Content */}
      <Card>
        <div className="p-6">
          {activeReport === 'attendance' && (
            <AttendanceReport filters={filters} />
          )}
          {activeReport === 'employee' && (
            <EmployeeReport filters={filters} />
          )}
          {activeReport === 'inventory' && (
            <InventoryReport 
              filters={{
                category: filters.category,
                minStock: filters.minStock,
                maxStock: filters.maxStock,
              }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};