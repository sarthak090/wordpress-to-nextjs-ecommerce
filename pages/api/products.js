import WooCommerce from "../../config/WooCommerce";
export default async (req, res) => {
  try {
    const response = await WooCommerce.get("products", {
      per_page: 2,
    });
    const products = await response.data;
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ msg: "Not Found" });
  }
};
