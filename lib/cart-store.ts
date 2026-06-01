import { create } from "zustand";

export type CartItem = {
  id: string;
  partnerId: string;
  name: string;
  description?: string | null;
  priceCents: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((x) => x.id === item.id);

      if (existing) {
        return {
          items: state.items.map((x) =>
            x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  clearCart: () => set({ items: [] }),
}));

let serverCart: CartItem[] = [];

export function getCart() {
  return serverCart;
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const existing = serverCart.find((x) => x.id === item.id);

  if (existing) {
    serverCart = serverCart.map((x) =>
      x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
    );
  } else {
    serverCart.push({ ...item, quantity: 1 });
  }

  return serverCart;
}

export function clearCart() {
  serverCart = [];
}