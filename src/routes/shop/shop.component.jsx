import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../contexts/products.context";

import "./shop.style.scss";

const Shop = () => {
  const { availableProducts } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {availableProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;