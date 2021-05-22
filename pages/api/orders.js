import WooCommerce from "../../config/WooCommerce";
export default async (req, res) => {
  try {
    const response = await WooCommerce.get("orders", {
      per_page: 2,
    });
    const orders = await response.data;
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ msg: "Not Found" });
  }
};
