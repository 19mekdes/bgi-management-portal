import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Card } from '../../components/common/Card';
import { productService } from '../../services/product.service';
import { useAuth } from '../../contexts/AuthContext';

interface ProductFormData {
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  expiryDate: string;
  description: string;
}

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

export const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    quantity: 0,
    productionDate: '',
    expiryDate: '',
    description: '',
  });

  // Check if user has permission
  const userRole = user?.role;
  const canEdit = userRole === 'ADMIN' || userRole === 'MANAGER';

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Lager', label: 'Lager' },
    { value: 'Stout', label: 'Stout' },
    { value: 'Wheat', label: 'Wheat Beer' },
    { value: 'IPA', label: 'IPA' },
    { value: 'Pilsner', label: 'Pilsner' },
    { value: 'Ale', label: 'Ale' },
    { value: 'Other', label: 'Other' },
  ];

  const fetchProduct = useCallback(async () => {
    setFetching(true);
    try {
      const response = await productService.getById(Number(id));
      // Handle the response data correctly
      const product = response.data as unknown as ProductResponse;
      setFormData({
        name: product.name || '',
        category: product.category || '',
        quantity: product.quantity || 0,
        productionDate: product.productionDate ? product.productionDate.split('T')[0] : '',
        expiryDate: product.expiryDate ? product.expiryDate.split('T')[0] : '',
        description: product.description || '',
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product data');
    } finally {
      setFetching(false);
    }
  }, [id]);

  useEffect(() => {
    if (!canEdit) {
      navigate('/products');
      return;
    }
    
    if (isEditMode) {
      fetchProduct();
    }
  }, [canEdit, isEditMode, navigate, fetchProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? (parseInt(value) || 0) : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (formData.quantity < 0) {
      setError('Quantity cannot be negative');
      return false;
    }
    if (!formData.productionDate) {
      setError('Production date is required');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await productService.update(Number(id), formData);
      } else {
        await productService.create(formData);
      }
      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (!canEdit) {
    return null;
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />

            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
              required
            />

            <Input
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
              min="0"
            />

            <Input
              label="Production Date"
              type="date"
              name="productionDate"
              value={formData.productionDate}
              onChange={handleChange}
              required
            />

            <Input
              label="Expiry Date (Optional)"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/products')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                <Save size={16} className="mr-2" />
                {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};