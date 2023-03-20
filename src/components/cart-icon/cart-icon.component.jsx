import { ShoppingIcon, ItemCount, CartIconContainer} from "./cart-icon.style";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

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