import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";

// as the actual value you want to access
export const ProductsContext = createContext({
  availableProducts: [],
  setAvailableProducts: () => []
});

export const ProductsProvider = ({ children }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const value = { availableProducts, setAvailableProducts };

  useEffect(() => {
    setAvailableProducts(PRODUCTS);
  }, []);

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};