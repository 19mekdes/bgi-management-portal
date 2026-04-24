import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';

interface EmployeeFiltersProps {
  filters: {
    search: string;
    role: string;
    department: string;
    status: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'STAFF', label: 'Staff' },
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Production', label: 'Production' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Quality Control', label: 'Quality Control' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Logistics', label: 'Logistics' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'Inactive' },
  ];

  const hasActiveFilters = filters.search || filters.role || filters.department || filters.status;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Role Filter */}
        <Select
          label="Role"
          value={filters.role}
          onChange={(e) => onFilterChange('role', e.target.value)}
          options={roleOptions}
        />

        {/* Department Filter */}
        <Select
          label="Department"
          value={filters.department}
          onChange={(e) => onFilterChange('department', e.target.value)}
          options={departmentOptions}
        />

        {/* Status Filter */}
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={statusOptions}
        />
      </div>

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