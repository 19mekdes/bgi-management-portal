import api from './api';

export interface Product {
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

export interface ProductCreateData {
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  expiryDate?: string;
  description?: string;
}

export interface ProductUpdateData {
  name?: string;
  category?: string;
  quantity?: number;
  productionDate?: string;
  expiryDate?: string;
  description?: string;
}

export const productService = {
  // Get all products
  getAll: async (): Promise<{ data: Product[] }> => {
    const response = await api.get('/products');
    return response;
  },

  // Get product by ID
  getById: async (id: number): Promise<{ data: Product }> => {
    const response = await api.get(`/products/${id}`);
    return response;
  },

  // Create new product
  create: async (data: ProductCreateData): Promise<{ data: Product }> => {
    const response = await api.post('/products', data);
    return response;
  },

  // Update product
  update: async (id: number, data: ProductUpdateData): Promise<{ data: Product }> => {
    const response = await api.put(`/products/${id}`, data);
    return response;
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Update product stock
  updateStock: async (id: number, quantity: number): Promise<{ data: Product }> => {
    const response = await api.patch(`/products/${id}/stock`, { quantity });
    return response;
  },

  // Get products by category
  getByCategory: async (category: string): Promise<{ data: Product[] }> => {
    const response = await api.get(`/products/category/${category}`);
    return response;
  },

  // Get low stock products
  getLowStock: async (threshold: number = 10): Promise<{ data: Product[] }> => {
    const response = await api.get('/products/low-stock', { params: { threshold } });
    return response;
  },
};