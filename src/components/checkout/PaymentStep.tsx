import React from 'react';
import { FormProvider } from 'react-hook-form';
import { FormInput, FormRadioGroup } from '../forms/FormInput';
import { Button } from '../ui/Button';
import { CreditCard } from 'lucide-react';
import type { PaymentFormData } from '../../schemas/validation';

interface PaymentStepProps {
  paymentForm: any;
  onNext: (data: PaymentFormData) => void;
  onBack: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ paymentForm, onNext, onBack }) => {
  return (
    <FormProvider {...paymentForm}>
      <form autoComplete="off" className="space-y-6" onSubmit={paymentForm.handleSubmit(onNext)}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Information</h3>
        <FormRadioGroup
          name="paymentMethod"
          label="Payment Method"
          options={[
            { value: 'credit', label: 'Credit Card', icon: <CreditCard size={20} /> },
            { value: 'debit', label: 'Debit Card', icon: <CreditCard size={20} /> },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput name="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" className="md:col-span-2" leftIcon={<CreditCard size={20} />} />
          <FormInput name="cardName" label="Name on Card" placeholder="Cardholder name" className="md:col-span-2" />
          <FormInput name="expiryDate" label="Expiry Date" placeholder="MM/YY" />
          <FormInput name="cvv" label="CVV" placeholder="123" />
        </div>
        <div className="flex gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onBack}>Back</Button>
          <Button type="submit" disabled={!paymentForm.formState.isValid} className="flex-1">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
};