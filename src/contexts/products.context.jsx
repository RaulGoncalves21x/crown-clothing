import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

/*import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data.js";*/

// as the actual value you want to access
export const ProductsContext = createContext({
  availableProducts: [],
  setAvailableProducts: () => []
});

export const ProductsProvider = ({ children }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const value = { availableProducts, setAvailableProducts };

  /*useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []);*/

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};