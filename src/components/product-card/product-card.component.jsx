/* import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context"; */
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.style';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  /* const { addItemToCart } = useContext(CartContext); */
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name} Product`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}€</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </ProductCartContainer>
  );
};

export default ProductCard;