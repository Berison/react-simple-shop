import { createContext, useReducer, type ReactNode } from "react";
import type { CartContextValue } from "../../../shared/types/cart-context-value";
import type { CartState } from "../../../shared/types/cart-state";
import { DUMMY_PRODUCTS } from "../../../assets/dummy-products";
import type { CartAction } from "../../../shared/types/cart-action";

export const CartContext = createContext<CartContextValue>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const id = action.productId;

      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id,
      );

      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);

        if (product) {
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return {
        items: updatedItems,
      };
    }
    case "UPDATE_QUANTITY": {
      const id = action.productId,
        amount = action.amount;
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === id);

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    }
    default:
      return state;
  }
}

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    },
  );

  function handleAddItemToCart(id: string) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      productId: id,
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    shoppingCartDispatch({
      type: "UPDATE_QUANTITY",
      productId,
      amount,
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
