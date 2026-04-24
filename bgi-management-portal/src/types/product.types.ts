export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreateData {
  name: string;
  category: string;
  quantity: number;
  productionDate: string;
}

export interface ProductUpdateData {
  name?: string;
  category?: string;
  quantity?: number;
  productionDate?: string;
}

export interface ProductListParams {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
  minStock?: number;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
}