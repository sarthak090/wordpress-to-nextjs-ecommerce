export const addToCart = (productId) => {
  //CHECK CART AVAIlable

  if (getCart() !== null) {
    // check product is in cart if have in increase qty
    //add new product to cart
    const { inCart, productIndex } = hasProductInCart(
      productId,
      getCart().cart
    );

    if (inCart) {
      //increase qty
      increseQty(productIndex);
    } else {
      //add new product to cart
      addNewProductToCart(productId);
    }
  } else {
    //create new cart and add the product
    createCart(productId);
  }

  return;
};

const getCart = () => {
  return JSON.parse(window.localStorage.getItem("userCart"));
};
const increseQty = (productIndex) => {
  let userCart = getCart();
  const product = userCart.cart[productIndex];
  const newProductData = {
    ...product,
    quantity: parseInt(product.quantity) + 1,
  };
  userCart.cart[productIndex] = newProductData;
  console.log(userCart);
  return setUserCart(userCart);
};
export const hasProductInCart = (id, cart) => {
  const productIndex = cart.findIndex((item) => item.id == id);
  if (productIndex > -1) {
    return {
      inCart: true,
      productIndex,
    };
  } else {
    return {
      inCart: false,
      productIndex,
    };
  }
};
const addNewProductToCart = (productId) => {
  let userCart = getCart();
  let newProductData = {
    id: productId,
    quantity: 1,
  };
  userCart.cart.push(newProductData);
  setUserCart(userCart);
};
const setUserCart = (userCart) => {
  window.localStorage.setItem("userCart", JSON.stringify(userCart));
  return true;
};
export const createCart = (productId) => {
  if (getCart() == null) {
    const userCart = JSON.stringify({ cart: [{ id: productId, quantity: 1 }] });
    window.localStorage.setItem("userCart", userCart);

    return {
      success: true,
      msg: `Cart Created`,
    };
  } else {
    return {
      success: false,
      msg: `Cart Already Available`,
    };
  }
};
