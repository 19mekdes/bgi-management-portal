import { Package, Box, Calendar, Tag } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    category: string;
    quantity: number;
    productionDate: string;
    createdAt?: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-green-100 rounded-full p-3">
          <Package size={40} className="text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.category}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Box size={18} className="mr-2" />
          <span>Stock: <strong>{product.quantity}</strong> units</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2" />
          <span>Production Date: {new Date(product.productionDate).toLocaleDateString()}</span>
        </div>
        {product.createdAt && (
          <div className="flex items-center text-gray-400 text-sm">
            <Tag size={14} className="mr-1" />
            <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};