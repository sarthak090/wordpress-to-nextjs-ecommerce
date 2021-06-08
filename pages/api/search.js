import WooCommerce from "../../config/WooCommerce";
export default async (req, res) => {
  const { title } = req.query;
  if (title) {
    try {
      const response = await WooCommerce.get(`products?search=${title}`);
      const products = await response.data;
      let sendProducts = [];
      if (products.length) {
        sendProducts = products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            featuredImage: product.images[0].src,
          };
        });
      }
      res.status(200).json(sendProducts);
    } catch (err) {
      res.status(404).json({ msg: "Not Found" });
    }
    return;
  }
  return res.status(404).json({ msg: "Provide a Valid Query Parameter " });
};
