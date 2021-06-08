import WooCommerce from "../../../config/WooCommerce";
export default async (req, res) => {
  if (req.method == "POST") {
    try {
      const response = await WooCommerce.post("customers", req.body);
      const customers = await response.data;

      res.status(200).json(customers);
    } catch (err) {
      if (err.response.data.message) {
        return res.status(404).json({ msg: err.response.data.message });
      }
      res.status(404).json({ msg: "Not Found" });
    }
    return;
  }
  try {
    const response = await WooCommerce.get("customers");
    const customers = await response.data;

    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ msg: "Not Found" });
  }
};
