/* import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"; */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"
import { /*fetchCategoriesAsync, setCategories,*/ fetchCategoriesStart} from "../../store/categories/category.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import CategoryPage from "../category-page/category-page.component";

const Shop = () => {
  const dispatch = useDispatch();

  // Without Redux
  /* useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }); */

  // With Redux-Thunk
  /* useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }); */

  // With Redux-Saga
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  });

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<CategoryPage />} />
    </Routes>
  );
};

export default Shop;