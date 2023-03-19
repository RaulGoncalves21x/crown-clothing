import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
      );
  };

  // return new array with modified cartItems/ new cart Items
  return [...cartItems, {...productToAdd , quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, it it is remove that item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  // return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) => 
  cartItem.id === cartItemToRemove.id 
    ? { ...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  );
};

const deleteCartItem = (cartItems, carItemToDelete) => {
  // find the cart item to delete
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === carItemToDelete.id
  );

  if (existingCartItem.id === carItemToDelete.id) {
    return cartItems.filter(cartItem => cartItem.id !== carItemToDelete.id)
  };
};

/*const getCartTotalPrice = (cartItems) => {
  let totalPriceTemp = 0;

  cartItems.forEach(cartItem => {
    totalPriceTemp += cartItem.quantity * cartItem.price;
  })

  return totalPriceTemp;
};*/

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  totalPrice: 0,
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    // V1
    //const newCartPrice = getCartTotalPrice(cartItems);

    // V2
    const newCartPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setTotalPrice(newCartPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const deleteItemFromCart = (cartItemToRemove) => {
    setCartItems(deleteCartItem(cartItems, cartItemToRemove));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    totalPrice,
    cartCount
  };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};