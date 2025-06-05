import React from 'react';
import { FormProvider } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';
import { Button } from '../ui/Button';
import type { DeliveryFormData } from '../../schemas/validation';

interface DeliveryStepProps {
  deliveryForm: any;
  onNext: (data: DeliveryFormData) => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({ deliveryForm, onNext }) => {
  return (
    <FormProvider {...deliveryForm}>
      <form autoComplete="off" className="space-y-4" onSubmit={deliveryForm.handleSubmit(onNext)}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Delivery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput name="fullName" label="Full Name" placeholder="Your full name" />
          <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
          <FormInput name="phone" label="Phone" placeholder="(11) 99999-9999" />
          <FormInput name="zipCode" label="ZIP Code" placeholder="12345-678" />
          <FormInput name="address" label="Address" placeholder="Street, number, apt..." className="md:col-span-2" />
          <FormInput name="city" label="City" placeholder="Your city" />
          <FormInput name="state" label="State" placeholder="Your state" />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={!deliveryForm.formState.isValid}>Next</Button>
        </div>
      </form>
    </FormProvider>
  );
};