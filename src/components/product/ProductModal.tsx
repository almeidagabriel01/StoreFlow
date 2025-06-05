import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils';

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductModalProps {
  productId: number;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, state } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data: ProductDetail = await res.json();
        setProduct(data);
      } catch {
        setError('Error loading product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const isInCart = !!product && state.items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (product) addItem(product);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
          <p className="text-gray-900 dark:text-gray-100">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm text-center">
          <p className="text-red-600 dark:text-red-400">{error || 'Product not found.'}</p>
          <button onClick={onClose} className="mt-4 cursor-pointer text-purple-600 dark:text-purple-400 hover:underline">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full overflow-y-auto shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.title}</h2>
            <button onClick={onClose} className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex justify-center">
                <img src={product.image} alt={product.title} className="w-full max-w-xs object-contain" loading="lazy" />
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-lg font-semibold">Category: {product.category}</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {formatPrice(product.price)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                <p className="flex items-center gap-1 text-sm">
                  Rating: <span className="font-medium">{product.rating.rate.toFixed(1)}</span> ({product.rating.count} reviews)
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl text-white ${
                  isInCart
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-400 dark:hover:bg-purple-500'
                }`}
              >
                <Plus size={16} />
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};