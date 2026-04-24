import React from 'react';
import { X } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';

interface ReportFiltersProps {
  filters: {
    startDate: string;
    endDate: string;
    employeeId: string;
    productId: string;
    reportType: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  employees?: Array<{ id: number; name: string }>;
  products?: Array<{ id: number; name: string }>;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  employees = [],
  products = [],
}) => {
  const reportTypes = [
    { value: '', label: 'All Reports' },
    { value: 'attendance', label: 'Attendance Report' },
    { value: 'employee', label: 'Employee Report' },
    { value: 'inventory', label: 'Inventory Report' },
  ];

  const employeeOptions = [
    { value: '', label: 'All Employees' },
    ...employees.map(emp => ({ value: emp.id.toString(), label: emp.name })),
  ];

  const productOptions = [
    { value: '', label: 'All Products' },
    ...products.map(prod => ({ value: prod.id.toString(), label: prod.name })),
  ];

  const hasActiveFilters = filters.startDate || filters.endDate || filters.employeeId || filters.productId;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Report Type */}
        <Select
          label="Report Type"
          value={filters.reportType}
          onChange={(e) => onFilterChange('reportType', e.target.value)}
          options={reportTypes}
        />

        {/* Start Date */}
        <Input
          label="Start Date"
          type="date"
          value={filters.startDate}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />

        {/* End Date */}
        <Input
          label="End Date"
          type="date"
          value={filters.endDate}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />

        {/* Employee Filter */}
        <Select
          label="Employee"
          value={filters.employeeId}
          onChange={(e) => onFilterChange('employeeId', e.target.value)}
          options={employeeOptions}
        />
      </div>

      {/* Second Row - Product Filter (only shown for inventory report) */}
      {filters.reportType === 'inventory' && (
        <div className="mt-4">
          <Select
            label="Product"
            value={filters.productId}
            onChange={(e) => onFilterChange('productId', e.target.value)}
            options={productOptions}
          />
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};