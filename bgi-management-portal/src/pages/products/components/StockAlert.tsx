import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Package } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
}

interface StockAlertProps {
  products: Product[];
  lowStockThreshold?: number;
  onViewProduct?: (product: Product) => void;
}

export const StockAlert: React.FC<StockAlertProps> = ({
  products,
  lowStockThreshold = 10,
  onViewProduct,
}) => {
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= lowStockThreshold);
  const outOfStockProducts = products.filter(p => p.quantity === 0);
  const totalAlerts = lowStockProducts.length + outOfStockProducts.length;

  if (totalAlerts === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="text-sm font-medium text-green-800">All Stock Levels Healthy</h3>
            <p className="text-sm text-green-700 mt-1">
              No products are running low on stock.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Stock Alerts</h3>
          <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            {totalAlerts} alert{totalAlerts !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Out of Stock Section */}
        {outOfStockProducts.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-red-800 mb-3">Out of Stock</h4>
            <div className="space-y-2">
              {outOfStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-red-600">0 units</span>
                    {onViewProduct && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewProduct(product)}
                      >
                        View
                      </Button>
                    )}
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Restock
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Stock Section */}
        {lowStockProducts.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-yellow-800 mb-3">Low Stock</h4>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 rounded-full h-2"
                          style={{ width: `${(product.quantity / lowStockThreshold) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-yellow-700">
                        {product.quantity} units
                      </span>
                    </div>
                    {onViewProduct && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewProduct(product)}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <Link to="/products">
            <Button variant="primary" fullWidth>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};