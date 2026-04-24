import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';

interface ProductFiltersProps {
  filters: {
    search: string;
    category: string;
    minStock?: number;
    maxStock?: number;
  };
  onFilterChange: (key: string, value: string | number) => void;
  onClearFilters: () => void;
  categories: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  categories,
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ];

  const stockOptions = [
    { value: '', label: 'All Stock' },
    { value: 'low', label: 'Low Stock (< 10)' },
    { value: 'out', label: 'Out of Stock (0)' },
    { value: 'healthy', label: 'Healthy Stock (> 50)' },
  ];

  const hasActiveFilters = filters.search || filters.category || filters.minStock || filters.maxStock;

  const handleStockFilter = (value: string) => {
    switch (value) {
      case 'low':
        onFilterChange('maxStock', 10);
        onFilterChange('minStock', 1);
        break;
      case 'out':
        onFilterChange('maxStock', 0);
        onFilterChange('minStock', 0);
        break;
      case 'healthy':
        onFilterChange('minStock', 51);
        onFilterChange('maxStock', '');
        break;
      default:
        onFilterChange('minStock', '');
        onFilterChange('maxStock', '');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Input
            placeholder="Search by product name..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Category Filter */}
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          options={categoryOptions}
        />

        {/* Stock Level Filter */}
        <Select
          label="Stock Level"
          value=""
          onChange={(e) => handleStockFilter(e.target.value)}
          options={stockOptions}
        />

        {/* Stock Range Filter */}
        <div className="flex gap-2">
          <Input
            label="Min Stock"
            type="number"
            placeholder="Min"
            value={filters.minStock || ''}
            onChange={(e) => onFilterChange('minStock', e.target.value ? parseInt(e.target.value) : '')}
          />
          <Input
            label="Max Stock"
            type="number"
            placeholder="Max"
            value={filters.maxStock || ''}
            onChange={(e) => onFilterChange('maxStock', e.target.value ? parseInt(e.target.value) : '')}
          />
        </div>
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