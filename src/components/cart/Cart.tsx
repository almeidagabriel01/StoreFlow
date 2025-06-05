import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  onNavigateToLogin: () => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigateToLogin }) => {
  const { state, toggleCart, removeItem, updateQuantity, totalPrice, totalItems, openCheckout } = useCart();
  const { isAuthenticated } = useAuth();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={toggleCart} />

      <div className="relative ml-auto w-full max-w-md h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
        <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Cart ({totalItems})</h2>
          <button
            onClick={toggleCart}
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-thin">
          {state.items.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400">Cart is empty</div>
          ) : (
            state.items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1 mr-4 break-words">
                  <p className="text-gray-900 dark:text-white font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <Minus size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <Plus size={16} className="text-gray-600 dark:text-gray-300" />
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-700 rounded-lg hover:bg-red-200 dark:hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} className="text-red-500 dark:text-red-200" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              ${totalPrice.toFixed(2)}
            </span>
          </div>


          <Button
            onClick={() => {
              if (!isAuthenticated) {
                onNavigateToLogin();
              } else {
                openCheckout();
                toggleCart();
              }
            }}
            variant="primary"
            className="w-full mb-2"
          >
            Checkout
          </Button>

          <Button
            onClick={() => {
              if (!isAuthenticated) {
                onNavigateToLogin();
              } else {
                toggleCart();
              }
            }}
            variant="secondary"
            className="w-full mb-2"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};