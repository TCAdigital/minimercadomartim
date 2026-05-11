import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isCartOpen: true, // open cart when adding
        };
      }
      return { 
        items: [...state.items, { ...product, quantity: 1 }],
        isCartOpen: true 
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
