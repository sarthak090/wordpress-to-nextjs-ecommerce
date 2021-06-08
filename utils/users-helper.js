export const addUserDataToLoc = (userData) => {
  const wcUserData = {
    billingAddress: userData.billing,
    email: userData.email,
    customer_id: userData.id,
    wishList: [{}],
  };
  setLoacalStorage("wcUserData", wcUserData);
};
export const generateOrderData = (options) => {
  const { cartData, selectedPayement, couponCode, userData, paymentGateways } =
    options;
  const { cart } = cartData;

  const line_items = cart.map((item) => {
    return {
      product_id: item.id,
      quantity: item.quantity,
      variation_id: item.variation_id ? item.variation_id : 0,
      meta_data: item.meta_data,
    };
  });
  let coupon_lines = [];
  if (couponCode && couponCode.length > 0) {
    coupon_lines = [
      {
        code: couponCode,
      },
    ];
  }
  let data = {
    payment_method: selectedPayement,
    line_items,
    payment_method_title: paymentGateways.filter(
      (method) => method.id == selectedPayement
    )[0].title,
    coupon_lines,
    billing: userData.billingAddress,
    shipping: userData.billingAddress,
    customer_id: userData.customer_id,
  };
  if (userData.customer_id) {
    return data;
  } else {
    console.log(`No User Id Please register  user with site`);
  }
};

export const generateCustomerData = (data) => {
  return {
    ...data,
    billing: data,
    shipping: data,
  };
};

const setLoacalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
