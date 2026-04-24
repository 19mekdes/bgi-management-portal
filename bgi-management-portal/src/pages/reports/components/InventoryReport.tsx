import React, { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { reportService, type ExportFormat } from '../../../services/report.service';

interface InventoryReportFilters {
  category?: string;
  minStock?: number;
  maxStock?: number;
}

interface InventoryReportProps {
  filters: InventoryReportFilters;
}

interface ProductData {
  id: number;
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  expiryDate?: string;
}

interface SummaryStats {
  totalProducts: number;
  totalStock: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoriesCount: number;
}

export const InventoryReport: React.FC<InventoryReportProps> = ({ filters }) => {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<SummaryStats>({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categoriesCount: 0,
  });

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await reportService.getInventoryReport(filters);
      
      let reportData: ProductData[] = [];
      
      if (Array.isArray(response)) {
        reportData = response;
      } else if (response && typeof response === 'object') {
        if (Array.isArray(response.data)) {
          reportData = response.data;
        } else if (Array.isArray(response.products)) {
          reportData = response.products;
        } else if (Array.isArray(response.items)) {
          reportData = response.items;
        } else {
          const arrayProp = Object.values(response).find(Array.isArray);
          if (arrayProp) {
            reportData = arrayProp as ProductData[];
          }
        }
      }
      
      setData(reportData);
      
      // Calculate summary statistics
      const totalStock = reportData.reduce((sum, p) => sum + p.quantity, 0);
      const lowStock = reportData.filter(p => p.quantity > 0 && p.quantity < 10).length;
      const outOfStock = reportData.filter(p => p.quantity === 0).length;
      const uniqueCategories = new Set(reportData.map(p => p.category)).size;
      
      setStats({
        totalProducts: reportData.length,
        totalStock: totalStock,
        lowStockCount: lowStock,
        outOfStockCount: outOfStock,
        categoriesCount: uniqueCategories,
      });
    } catch (err) {
      console.error('Error fetching inventory report:', err);
      setError('Failed to load inventory report');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleExport = async (format: ExportFormat) => {
    try {
      await reportService.exportInventoryReport(filters, format);
    } catch (err) {
      console.error(`Error exporting as ${format}:`, err);
      setError(`Failed to export as ${format}`);
    }
  };

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Out of Stock</span>;
    }
    if (quantity < 10) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">In Stock</span>;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
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
        <p className="text-gray-500">No inventory data available</p>
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
          <p className="text-2xl font-bold text-blue-600">{stats.totalProducts}</p>
          <p className="text-sm text-gray-500">Total Products</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.totalStock}</p>
          <p className="text-sm text-gray-500">Total Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.lowStockCount}</p>
          <p className="text-sm text-gray-500">Low Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.outOfStockCount}</p>
          <p className="text-sm text-gray-500">Out of Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.categoriesCount}</p>
          <p className="text-sm text-gray-500">Categories</p>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Production Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(product.productionDate)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(product.expiryDate || '')}</td>
                  <td className="px-4 py-3">{getStockBadge(product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};