export const caluclateDiscount = (cartData) => {
  const { items, discountData } = cartData;
  const subtotal = getSubTotal(cartData);

  if (discountData == undefined) {
    return getDiscountData(subtotal, 0);
  }
  if (discountData.type == "fixed_product") {
    const discountAmount = totalQuantity(items) * discountData.amount;
    return getDiscountData(subtotal, discountAmount);
  }
  if (discountData.type == "fixed_cart") {
    const discountAmount = discountData.amount;
    return getDiscountData(subtotal, discountAmount);
  }
  if (discountData.type == "percent") {
    const discountAmount = percentage(subtotal, discountData.amount);
    return getDiscountData(subtotal, discountAmount);
  }
};
const percentage = (num, per) => (num / 100) * per;

const getDiscountData = (subtotal, discount) => {
  return {
    Discount: discount,
    SubTotal: subtotal,
    Total: subtotal - discount,
  };
};

const totalQuantity = (items) =>
  getSumOfArr(items.map((item) => item.quantity));

export const getSubTotal = (cartData) =>
  getSumOfArr(cartData.items.map((product) => product.total));
export const getStripeTotal = (cartData) =>
  caluclateDiscount(cartData).Total * 100;
const getSumOfArr = (arr) => arr.reduce((acc, sum) => acc + sum);
