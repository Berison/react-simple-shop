import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { CartItem } from "../../../shared/types/cart-item";
import Cart from "./Cart";
import type { ModalHandle } from "../../../shared/types/modal";

type ModalProps = {
  cartItems: CartItem[];
  title: string;
  actions: ReactNode;
  onUpdateCartItemQuantity: (itemId: string, quantity: number) => void;
};

const CartModal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")!,
  );
});

export default CartModal;
