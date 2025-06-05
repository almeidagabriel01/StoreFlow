export interface Product {
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

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
}

export type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CHECKOUT' }
  | { type: 'CLOSE_CHECKOUT' }
  | { type: 'CLEAR_CART' };

export interface DeliveryFormData {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
}

export interface PaymentFormData {
  paymentMethod: 'credit' | 'debit';
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  street: string;
  number: string;
  zipcode: string;
}

export type PageType = 'home' | 'login';