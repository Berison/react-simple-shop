import type { CartItem } from "./cart-item";

export type CartContextValue = {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
};
