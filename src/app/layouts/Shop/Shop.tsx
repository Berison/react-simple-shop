import type { ReactNode } from "react";

export default function Shop({ children }: { children: ReactNode }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">{children}</ul>
    </section>
  );
}
