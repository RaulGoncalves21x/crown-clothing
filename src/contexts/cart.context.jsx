import { createContext, useReducer /*, useState, useEffect,*/  } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


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

const clearCartItem = (cartItems, carItemToDelete) => {
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

const CART_ACTION_TYPES = {
  "SET_CART_ITEMS": "SET_CART_ITEMS",
  "SET_IS_CART_OPEN": "SET_IS_CART_OPEN"
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload
        };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  };
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// ---- useReducer Version ----
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartTotal, cartCount } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0);

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems, 
        cartTotal: newCartTotal, 
        cartCount: newCartCount,
      })
    );

    /*
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems, 
        cartTotal: newCartTotal, 
        cartCount: newCartCount,
      }
    });
    */
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    /*dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});*/
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen,
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartTotal,
    cartCount,
  };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

// ---- useState Version ----
/*
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

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    totalPrice,
    cartCount
  };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
*/