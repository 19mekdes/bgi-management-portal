import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { ProductTable } from './components/ProductTable';
import { ProductFilters } from './components/ProductFilters';
import { StockAlert } from './components/StockAlert';
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
}

// Define the filter type that matches ProductFilters expectations
interface ProductFiltersType {
  search: string;
  category: string;
  minStock?: number;
  maxStock?: number;
}

export const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFiltersType>({
    search: '',
    category: '',
    minStock: undefined,
    maxStock: undefined,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const userRole = user?.role;
  const canEdit = userRole === 'ADMIN' || userRole === 'MANAGER';
  const canDelete = userRole === 'ADMIN';

  // Get unique categories for filter
  const categories = [...new Set(products.map(p => p.category))];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: value === '' ? undefined : value 
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minStock: undefined,
      maxStock: undefined,
    });
    setSearchQuery('');
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  const handleView = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    
    setDeleting(true);
    try {
      await productService.delete(selectedProduct.id);
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleting(false);
    }
  };

  // Apply filters
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    // Min stock filter
    if (filters.minStock !== undefined && product.quantity < filters.minStock) {
      return false;
    }
    // Max stock filter
    if (filters.maxStock !== undefined && product.quantity > filters.maxStock) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        {canEdit && (
          <Button onClick={() => navigate('/products/new')}>
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        )}
      </div>

      {/* Stock Alert */}
      <StockAlert 
        products={filteredProducts}
        lowStockThreshold={10}
        onViewProduct={(product) => handleView(product.id)}
      />

      {/* Search and Filters */}
      <div className="space-y-4">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search products by name..."
        />
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          categories={categories}
        />
      </div>

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onEdit={(product) => handleEdit(product.id)}
        onDelete={(product) => handleDeleteClick(product)}
        onView={(product) => handleView(product.id)}
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}? This action cannot be undone.`}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};