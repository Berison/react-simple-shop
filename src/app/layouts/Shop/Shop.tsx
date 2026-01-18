import { DUMMY_PRODUCTS } from "../../../assets/dummy-products";
import Product from "../Product/Product";

export default function Shop({
  onAddItemToCart,
}: {
  onAddItemToCart: (id: string) => void;
}) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
