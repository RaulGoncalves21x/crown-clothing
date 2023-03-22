/* import { CategoriesContext } from "../../contexts/categories.context"; */
import { /*useContext,*/ useState, useEffect } from "react";

import { CategoryContainer, Title, ErrorDiv, SuggestionsDiv } from './category-page.style';
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const CategoryPage = () => {
  const { category } = useParams();
  /* const { categoriesMap } = useContext(CategoriesContext); */
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap]);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1,);
  };

  if (products) {
    return (
      <>
        <Title>{category.toUpperCase()}</Title>
        <CategoryContainer>
          {products &&
            products.map(product => <ProductCard key={product.id} product={product} />)
          }
        </CategoryContainer>
      </>
    )
  } else {
    return (
      <>
        <ErrorDiv>
          <h1>Oops!</h1>
          <p>It looks like the category you are searching for isn't available.</p>
          <p>Try again, with a different category.</p>
        </ErrorDiv>
        <SuggestionsDiv>
          <h2>You can try these categories:</h2>
          <div>
            {Object.keys(categoriesMap).map((categoryTitle) => (
                <a key={categoryTitle} href={`/shop/${categoryTitle}`}>{capitalize(categoryTitle)}</a>
            ))}
          </div>
        </SuggestionsDiv>
      </>
    )
  }
};

export default CategoryPage;