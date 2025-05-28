import { create } from 'zustand';
import { CartItem, Product } from '../types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

type State = {
  items: CartItem[];
  total: number;
};

type Actions = {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  
  addItem: (product: Product) =>
    set((state: State) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: state.total + product.price,
        };
      }
      
      return {
        items: [...state.items, { ...product, quantity: 1 }],
        total: state.total + product.price,
      };
    }),
    
  removeItem: (productId: string) =>
    set((state: State) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item) return state;
      
      return {
        items: state.items.filter((item) => item.id !== productId),
        total: state.total - (item.price * item.quantity),
      };
    }),
    
  updateQuantity: (productId: string, quantity: number) =>
    set((state: State) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      
      return {
        items: updatedItems,
        total: newTotal,
      };
    }),
    
  clearCart: () =>
    set({
      items: [],
      total: 0,
    }),
})); 