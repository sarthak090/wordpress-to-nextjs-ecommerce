import WooCommerce from "../../../config/WooCommerce";

export default async (req, res) => {
  const { id } = req.query;
  try {
    const response = await WooCommerce.get(`customers/${id}`);
    const customer = await response.data;
    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({ Error: true });
  }
};
