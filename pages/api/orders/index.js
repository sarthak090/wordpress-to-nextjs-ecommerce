import WooCommerce from "../../../config/WooCommerce";
export default async (req, res) => {
  if (req.method == "POST") {
    try {
      const response = await WooCommerce.post("orders", req.body);
      const orders = await response.data;
      res.status(200).json(orders);
    } catch (err) {
      console.log(err.response.data);
      res.status(404).json({ msg: "Not Found" });
    }
    return;
  }
  if (req.query.customer) {
    console.log(req.cookies);
    try {
      const response = await WooCommerce.get(
        `orders?customer=${req.query.customer}`
      );
      const orders = await response.data;

      res.status(200).json(orders);
    } catch (err) {
      res.status(404).json({ msg: "Not orders Found of this customer" });
    }

    return;
  }
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
