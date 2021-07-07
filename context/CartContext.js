import { createContext, useState, useEffect } from "react";
import { createCart, addToCart, addCouponToCart } from "../utils/cart-helpers";
const CartContext = createContext();

export const CartProvider = (props) => {
  const [cart, setcart] = useState([]);
  const getCart = () => {
    const userCart = JSON.parse(window.localStorage.getItem("userCart"));

    if (userCart !== null && userCart.cart !== undefined) {
      setcart(userCart.cart);
      return cart;
    } else {
      const userCart = JSON.stringify({ cart: [] });
      window.localStorage.setItem("userCart", userCart);

      let cart = [];
      return cart;
    }
  };
  const createCartForUser = () => {
    createCart();
    getCart();
  };
  const addProductToCart = (id) => {
    addToCart(id);
    getCart();
  };
  const addCoupon = (couponCode) => {
    addCouponToCart(couponCode);

    getCart();
  };

  const currentCartItems = () => {
    return JSON.parse(window.localStorage.getItem("userCart"));
  };
  const currentCouponCode = () => {
    if (window.localStorage.getItem("couponData") !== null) {
      return JSON.parse(window.localStorage.getItem("couponData"));
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        getCart,
        createCartForUser,
        addProductToCart,
        cart,
        currentCartItems,
        addCoupon,
        currentCouponCode,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContext;
