import React from 'react';
import { MapPin, CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';
import type { DeliveryFormData, PaymentFormData } from '../../schemas/validation';
import { formatPrice, truncateText } from '../../utils';
import { useCart } from '../../contexts/CartContext';

interface ReviewStepProps {
  deliveryData: DeliveryFormData;
  paymentData: PaymentFormData;
  onBack: () => void;
  onSubmitOrder: () => void;
  isProcessing: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  deliveryData,
  paymentData,
  onBack,
  onSubmitOrder,
  isProcessing,
}) => {
  const { state, totalPrice } = useCart();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review Order</h3>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Items ({state.items.length})</h4>
        <div className="space-y-2">
          {state.items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm text-gray-900 dark:text-gray-200">
              <span>{truncateText(item.title, 30)} x{item.quantity}</span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
          <MapPin size={16} /> Delivery Address
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {deliveryData.fullName}<br />
          {deliveryData.address}<br />
          {deliveryData.city}, {deliveryData.state} {deliveryData.zipCode}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
          <CreditCard size={16} /> Payment Method
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {paymentData.paymentMethod === 'credit' ? 'Credit' : 'Debit'} – **** **** **** {paymentData.cardNumber.slice(-4)}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
          <span>Total:</span>
          <span className="text-purple-600 dark:text-purple-400">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button onClick={onBack} variant="outline" disabled={isProcessing}>Back</Button>
        <Button onClick={onSubmitOrder} isLoading={isProcessing} className="flex-1">
          {isProcessing ? 'Processing...' : `Place Order – ${formatPrice(totalPrice)}`}
        </Button>
      </div>
    </div>
  );
};