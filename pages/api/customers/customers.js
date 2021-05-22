import WooCommerce from "../../../config/WooCommerce";
export default async (req, res) => {
  try {
    // const response = await WooCommerce.get("customers");
    // const customers = await response.data;
    const {}
    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ msg: "Not Found" });
  }
};
