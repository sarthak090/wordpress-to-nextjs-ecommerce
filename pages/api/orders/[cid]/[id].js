import WooCommerce from "../../../../config/WooCommerce";

export default async (req, res) => {
  const { cid, id } = req.query;
  console.log(cid, id);
  if (cid == "downloads") {
    try {
      const response = await WooCommerce.get(`customers/${id}/downloads`);
      const orders = await response.data;

      res.status(200).json(orders);
    } catch (err) {
      res.status(404).json({ msg: "Not orders Found of this customer" });
    }
    return;
  }
  if (cid && id) {
    try {
      const response = await WooCommerce.get(`orders/${id}`);
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
