import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const { 
    register, 
    formState: { errors },
    watch,
    setValue
  } = useFormContext();

  const error = errors[name];
  const value = watch(name);

  // Auto-format specific fields
  useEffect(() => {
    if (!value) return;

    let formatted = value;

    // Phone → (11) 91234-5678
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 2) formatted = digits;
      else if (digits.length <= 6) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      else if (digits.length <= 10)
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      else formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }

    // Card number → 1234 5678 9012 3456
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }

    // Expiry date → MM/YY
    if (name === 'expiryDate') {
      const digits = value.replace(/\D/g, '');
      formatted = digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}` : digits;
    }

    // CVV → max 4 digits
    if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }

    // ZIP code / CEP → 12345-678
    if (name === 'zipCode') {
      const digits = value.replace(/\D/g, '').slice(0, 8);
      formatted = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    }

    if (formatted !== value) {
      setValue(name, formatted, { shouldValidate: true });
    }
  }, [value, name, setValue]);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400 dark:text-gray-500">{leftIcon}</div>
          </div>
        )}
        
        <input
          id={name}
          {...register(name)}
          {...props}
          className={`
            block w-full rounded-xl border transition-colors duration-200
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${rightIcon || error ? 'pr-10' : 'pr-3'}
            py-3
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-400' 
              : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:focus:border-purple-400'
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-opacity-50
          `}
        />
        
        {(rightIcon || error) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {error ? (
              <AlertCircle size={20} className="text-red-400" />
            ) : (
              <div className="text-gray-400 dark:text-gray-500">{rightIcon}</div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
          <AlertCircle size={14} />
          {error.message as string}
        </p>
      )}
    </div>
  );
};

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FormRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  className?: string;
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  label,
  options,
  className = ''
}) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {label}
          </legend>
          
          <div className="space-y-3">
            {options.map((option) => (
              <label 
                key={option.value}
                className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register(name)}
                  className="mr-3 text-purple-600 dark:text-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
                />
                {option.icon && <div className="mr-2 text-gray-600 dark:text-gray-400">{option.icon}</div>}
                <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
          <AlertCircle size={14} />
          {error.message as string}
        </p>
      )}
    </div>
  );
};