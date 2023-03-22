/* import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context"; */
import { ShoppingIcon, ItemCount, CartIconContainer} from "./cart-icon.style";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  /* const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen); */
  
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  /*let count = 0;
  let getCount = (cartItems) => {
    let tempCount = 0;
    cartItems.forEach((cartItem) => {
      tempCount += cartItem.quantity;
    })
    return tempCount;
  };
  count = getCount(cartItems);*/

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;