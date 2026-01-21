import { useContext, useRef } from "react";

import CartModal from "../Cart/CartModal";
import type { ModalHandle } from "../../../shared/types/modal";
import { CartContext } from "../../../features/cart/model/cart.context";

export default function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef<ModalHandle | null>(null);
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current?.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
