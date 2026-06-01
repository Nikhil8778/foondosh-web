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
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
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

  increaseItem: (id) =>
    set((state) => ({
      items: state.items.map((x) =>
        x.id === id ? { ...x, quantity: x.quantity + 1 } : x
      ),
    })),

  decreaseItem: (id) =>
    set((state) => ({
      items: state.items
        .map((x) =>
          x.id === id ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter((x) => x.quantity > 0),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((x) => x.id !== id),
    })),

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