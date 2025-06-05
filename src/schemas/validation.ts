import { z } from 'zod';

// Helper validators
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const zipCodeRegex = /^\d{5}-?\d{3}$/;
const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRegex = /^\d{3,4}$/;

// Custom validation for expiry date
const validateExpiryDate = (date: string) => {
  if (!expiryDateRegex.test(date)) return false;
  
  const [month, year] = date.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  return expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth);
};

// Login form schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username is too long'),
  
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
});

// Register form schema
export const registerSchema = z.object({
  firstname: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name is too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'First name should only contain letters'),
  
  lastname: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(30, 'Last name is too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Last name should only contain letters'),
  
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username is too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and one number'),
  
  confirmPassword: z
    .string(),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number (11) 99999-9999'),
  
  city: z
    .string()
    .min(2, 'City name is required'),
  
  street: z
    .string()
    .min(5, 'Street address is required'),
  
  number: z
    .string()
    .min(1, 'House/building number is required'),
  
  zipcode: z
    .string()
    .regex(zipCodeRegex, 'Please enter a valid ZIP code')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Delivery form schema
export const deliverySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Name should only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number (11) 99999-9999'),
  
  zipCode: z
    .string()
    .regex(zipCodeRegex, 'Please enter a valid ZIP code'),
  
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters'),
  
  city: z
    .string()
    .min(2, 'City name is required'),
  
  state: z
    .string()
    .min(2, 'State is required')
});

// Payment form schema (with limited card number)
export const paymentSchema = z.object({
  paymentMethod: z
    .enum(['credit', 'debit'], { 
      required_error: 'Please select a payment method' 
    }),
  
  cardNumber: z
    .string()
    .regex(cardNumberRegex, 'Please enter a valid card number')
    .length(19, 'Card number must be exactly 16 digits'), // 16 digits + 3 spaces = 19 chars
  
  cardName: z
    .string()
    .min(2, 'Cardholder name is required')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Name should only contain letters and spaces'),
  
  expiryDate: z
    .string()
    .regex(expiryDateRegex, 'Please enter date in MM/YY format')
    .refine(validateExpiryDate, 'Card has expired'),
  
  cvv: z
    .string()
    .regex(cvvRegex, 'CVV must be 3-4 digits')
});

// Export types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type DeliveryFormData = z.infer<typeof deliverySchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;