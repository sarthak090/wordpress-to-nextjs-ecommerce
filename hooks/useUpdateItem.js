import { useState } from "react";
import { addToCart, removeItemFromCart } from "../utils/cart-helpers";
const useUpdateItem = (inital) => {
  const [fields, setFields] = useState(inital);

  return [
    fields,
    (qty, productId) => {
      addToCart(productId, qty);
      setFields(qty);
    },
    (productId) => removeItemFromCart(productId),
  ];
};
export default useUpdateItem;
