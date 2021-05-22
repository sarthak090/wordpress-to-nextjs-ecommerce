import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOO_COM,
  consumerKey: process.env.NEXT_PUBLIC_CUSTOMER_KEY,
  consumerSecret: process.env.NEXT_CUSTOMER__SECRET_KEY,
  version: "wc/v3",
  wpAPI: true,
});

export default WooCommerce;
