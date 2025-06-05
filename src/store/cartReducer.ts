import type { CartState, CartAction } from '../types';

export const initialCartState: CartState = {
  items: [],
  isOpen: false,
  isCheckoutOpen: false
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    case 'OPEN_CHECKOUT':
      return { ...state, isCheckoutOpen: true, isOpen: false };
    
    case 'CLOSE_CHECKOUT':
      return { ...state, isCheckoutOpen: false };
    
    case 'CLEAR_CART':
      return { ...state, items: [], isOpen: false, isCheckoutOpen: false };
    
    default:
      return state;
  }
};