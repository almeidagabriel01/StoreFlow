import type { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const apiService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
};