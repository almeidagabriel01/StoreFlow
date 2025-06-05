import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../../contexts/CartContext';
import { deliverySchema, paymentSchema } from '../../schemas/validation';
import type { DeliveryFormData, PaymentFormData } from '../../schemas/validation';
import { DeliveryStep } from './DeliveryStep';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './ReviewStep';
import { SuccessStep } from './SuccessStep';

export const Checkout: React.FC = () => {
  const { state, closeCheckout, totalPrice: cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successTotal, setSuccessTotal] = useState<number>(0);

  const deliveryForm = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      zipCode: '',
      address: '',
      city: '',
      state: '',
    },
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
    defaultValues: {
      paymentMethod: 'credit',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // Wrap handleReset in useCallback so SuccessStep.onClose is stable
  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setDeliveryData(null);
    setPaymentData(null);

    // Reset both forms
    deliveryForm.reset();
    paymentForm.reset();

    // Finally close the checkout drawer/modal
    closeCheckout();
  }, [closeCheckout, deliveryForm, paymentForm]);

  // Always render SuccessStep once order is complete (currentStep === 4)
  if (currentStep === 4) {
    return <SuccessStep total={successTotal} onClose={handleReset} />;
  }

  // Hide entire checkout if it’s not open
  if (!state.isCheckoutOpen) return null;

  function handleDeliveryNext(data: DeliveryFormData) {
    setDeliveryData(data);
    setCurrentStep(2);
  }

  function handlePaymentNext(data: PaymentFormData) {
    setPaymentData(data);
    setCurrentStep(3);
  }

  function handleReviewBack() {
    setCurrentStep(2);
  }

  async function handlePlaceOrder() {
    setIsProcessing(true);
    // Capture the total before clearing the cart
    setSuccessTotal(cartTotal);
    await new Promise((r) => setTimeout(r, 2000));
    setCurrentStep(4);
    setIsProcessing(false);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
              <button
                onClick={handleReset}
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                disabled={isProcessing}
              >
                ✕
              </button>
            </div>
            <div className="flex items-center mt-6">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                        currentStep >= step
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        currentStep >= step
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step === 1 ? 'Delivery' : step === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        currentStep > step ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <DeliveryStep deliveryForm={deliveryForm} onNext={handleDeliveryNext} />
            )}
            {currentStep === 2 && (
              <PaymentStep
                paymentForm={paymentForm}
                onNext={handlePaymentNext}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && deliveryData && paymentData && (
              <ReviewStep
                deliveryData={deliveryData}
                paymentData={paymentData}
                onBack={handleReviewBack}
                onSubmitOrder={handlePlaceOrder}
                isProcessing={isProcessing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};