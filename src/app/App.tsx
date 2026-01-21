import { DUMMY_PRODUCTS } from "../assets/dummy-products";
import Header from "./layouts/Header/Header";
import Shop from "./layouts/Shop/Shop";
import Product from "./layouts/Product/Product";
import CartContextProvider from "../features/cart/model/cart.context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
