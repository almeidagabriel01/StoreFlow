import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { formatPrice } from '../../utils';
import { useCart } from '../../contexts/CartContext';

interface SuccessStepProps {
  total: number;
  onClose: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ total, onClose }) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [clearCart, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Successful!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Thank you for your purchase.</p>
        <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-6">
          Total: {formatPrice(total)}
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-400 dark:hover:bg-purple-500 text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};