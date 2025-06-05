import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { formatPrice, truncateText } from '../../utils';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => updateQuantity(item.id, item.quantity + 1);
  const handleDecrement = () => updateQuantity(item.id, item.quantity - 1);
  const handleRemove = () => removeItem(item.id);

  return (
    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
      <div className="flex-shrink-0">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-lg" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
          {truncateText(item.title, 50)}
        </h3>
        <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
          {formatPrice(item.price)}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Total: {formatPrice(item.price * item.quantity)}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50 cursor-pointer"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        
        <button
          onClick={handleIncrement}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer"
        >
          <Plus size={16} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          onClick={handleRemove}
          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors ml-2 cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};