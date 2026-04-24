/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Spinner } from '../../components/common/Spinner';
import { productService } from '../../services/product.service';
import { useAuth } from '../../contexts/AuthContext';
import { ConfirmModal } from '../../components/common/Modal';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  expiryDate?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the response type from the API
interface ProductResponse {
  id: number;
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  expiryDate?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const userRole = user?.role;
  const canEdit = userRole === 'ADMIN' || userRole === 'MANAGER';
  const canDelete = userRole === 'ADMIN';

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productService.getById(Number(id));
      // Properly type the response data
      const productData = response.data as unknown as ProductResponse;
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await productService.delete(Number(id));
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    }
    if (quantity < 10) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: Package };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
        <Button onClick={() => navigate('/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <div className="flex gap-2">
          {canEdit && (
            <Button
              variant="secondary"
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Product Details Card */}
      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {product.category}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                  {stockStatus.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{product.quantity}</p>
              <p className="text-sm text-gray-500">units available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Tag size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="font-medium">#{product.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Production Date</p>
                  <p className="font-medium">{formatDate(product.productionDate)}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {product.expiryDate && (
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-medium">{formatDate(product.expiryDate)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(product.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {product.description && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete ${product.name}? This action cannot be undone.`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};