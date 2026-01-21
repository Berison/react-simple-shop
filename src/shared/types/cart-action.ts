export type CartAction =
  | { type: "ADD_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; amount: number };
