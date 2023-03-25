/* import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context"; */
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.style';

const Checkout = () => {
  /* const { cartItems, totalPrice } = useContext(CartContext); */
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  return(
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />  
      ))}
      <Total>Total: {totalPrice}€</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;