import { CartItemContainer, ItemDetails } from './cart-item.style';

const CartItem = ({cartItem}) => {
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`{name}`} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="price">{quantity}x {price}€</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;