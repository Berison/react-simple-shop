import { useContext } from "react";
import { CartContext } from "../../../features/cart/model/cart.context";
import type { Product } from "../../../shared/types/products";

type ProductProps = Product;

export default function Product({
  id,
  title,
  price,
  description,
}: ProductProps) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className="product">
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
