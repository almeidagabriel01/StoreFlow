import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Header } from '../components/layout/Header';
import { ProductGrid } from '../components/product/ProductGrid';
import { Cart } from '../components/cart/Cart';
import { Checkout } from '../components/checkout/Checkout';
import { LoadingSpinner, ErrorMessage } from '../components/ui';
import type { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { products, loading, error, refetch } = useProducts();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onNavigate={onNavigate} />
        <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <ErrorMessage 
            message={error} 
            onRetry={refetch}
          />
        </main>
      </div>
    );
  }

  return (
    <>
      {/* Header with navigation and cart */}
      <Header onNavigate={onNavigate} />
      
      {/* Main content area */}
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page title and description */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Scoder</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our amazing collection of products. Add items to your cart and enjoy a seamless shopping experience.
            </p>
          </div>

          {/* Products grid */}
          <ProductGrid products={products} />
          
          {/* Empty state if no products */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">📦</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No products available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                We're currently updating our inventory. Please check back soon!
              </p>
              <button
                onClick={refetch}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                🔄 Refresh Products
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Cart sidebar */}
      <Cart onNavigateToLogin={() => onNavigate('login')} />
      
      {/* Checkout modal */}
      <Checkout />
    </>
  );
};