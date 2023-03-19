import "./cart-icon.style.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
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
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;