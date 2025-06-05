// Price formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

// Text truncation
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Capitalize words
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// Phone number formatting
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Card number formatting
export const formatCardNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

// Expiry date formatting
export const formatExpiryDate = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length >= 2) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  }
  return numbers;
};

// Simple API error handler
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};