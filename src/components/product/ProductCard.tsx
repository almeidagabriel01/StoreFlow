import React from 'react';
import { Star, Plus, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatPrice, truncateText, capitalizeWords } from '../../utils';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addItem, state } = useCart();
  const isInCart = state.items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <article
      onClick={onViewDetails}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700 cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating.rate.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
            {capitalizeWords(product.category)}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 h-12" title={product.title}>
          {truncateText(product.title, 60)}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 h-10" title={product.description}>
          {truncateText(product.description, 80)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <Button
            onClick={handleAddToCart}
            size="md"
            leftIcon={isInCart ? <Check size={16} /> : <Plus size={16} />}
            variant={isInCart ? 'secondary' : 'primary'}
            className={isInCart ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50' : ''}
          >
            {isInCart ? 'Added' : 'Add'}
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{product.rating.count} reviews</span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-current" />
            {product.rating.rate}/5
          </span>
        </div>
      </div>
    </article>
  );
};