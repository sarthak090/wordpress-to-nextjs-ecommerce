export const addToCart = (productId, qty) => {
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
      if (qty) {
        changeQty(productIndex, qty);
        return;
      }
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

const changeQty = (productIndex, qty) => {
  let userCart = getCart();
  const product = userCart.cart[productIndex];
  const newProductData = {
    ...product,
    quantity: parseInt(qty),
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

const setLoacalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
  return true;
};

export const removeItemFromCart = (productId) => {
  let userCart = getCart();
  const { inCart, productIndex } = hasProductInCart(productId, userCart.cart);
  if (inCart) {
    userCart.cart.splice(productIndex, 1);
    setUserCart(userCart);
  }
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

export const addCouponToCart = async (couponCode) => {
  if (getCouponData() !== null) {
    let couponData = getCouponData();
    // couponData.coupons[0] = couponData;
    if (couponData.coupons[0]) {
      couponData.coupons[0].couponCode = couponCode;
      setLoacalStorage("couponData", couponData);
    }
  } else {
    createCoupnData(couponCode);
  }
};

export const isValidCoupon = async (code) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/check-coupon?couponcode=${code}`
  );
  const isValid = await res.json();

  return {
    isValid,
  };
};

const createCoupnData = (couponCode) =>
  window.localStorage.setItem(
    "couponData",
    JSON.stringify({ coupons: [{ couponCode }] })
  );

const getCouponData = () =>
  JSON.parse(window.localStorage.getItem("couponData"));
