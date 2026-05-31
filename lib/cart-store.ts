export let cart: any[] = [];

export function getCart() {
  return cart;
}

export function addToCart(item: any) {
  const existing = cart.find((x) => x.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  return cart;
}

export function clearCart() {
  cart = [];
}