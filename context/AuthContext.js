import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
export const AuthProvider = (props) => {
  return (
    <AuthContext.Provider
    //   value={{
    //     isLogin,
    //     currencyData,
    //     hasCart,
    //     cart,
    //     userData,
    //     addToCart,
    //     deleteItem,
    //     getCartData,
    //     isGuestCart,
    //     errorData,
    //     updateGuestCart,
    //     deleteGuestCartItem,
    //     saveGuestData,
    //     addCouponToGuestCart,
    //     checkUserLoggedIn,
    //   }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
