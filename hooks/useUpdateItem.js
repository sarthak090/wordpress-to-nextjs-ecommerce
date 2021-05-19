import { useState } from "react";
import { addToCart, removeItemFromCart } from "../utils/cart-helpers";
const useUpdateItem = (quantity) => {
  const [value, setValue] = useState(quantity);
  const updateQty = (qty, productId) => {
    if (qty <= 10) {
      setValue(qty);
      addToCart(productId, qty);
    }
  };
  const deleteProduct = (productId) => {
    removeItemFromCart(productId);
  };

  return [value, updateQty, deleteProduct];
};

export default useUpdateItem;
