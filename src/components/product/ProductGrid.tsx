import React, { useState } from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const openModal = (id: number) => setSelectedProductId(id);
  const closeModal = () => setSelectedProductId(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400">Check back later for new products.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onViewDetails={() => openModal(product.id)} />
        ))}
      </div>

      {selectedProductId !== null && (
        <ProductModal productId={selectedProductId} onClose={closeModal} />
      )}
    </>
  );
};