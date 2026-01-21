import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import type { ModalHandle } from "../../../shared/types/modal";

type ModalProps = {
  title: string;
  actions: ReactNode;
};

const CartModal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { title, actions },
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
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")!,
  );
});

export default CartModal;
