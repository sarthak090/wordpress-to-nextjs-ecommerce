const stripe = require("stripe")(process.env.NEXT_STRIPE_KEY);
export default async (req, res) => {
  if (req.method == "POST") {
    try {
      return stripe.customers
        .create({ email: req.body.email, source: req.body.id })
        .then((customer) => {
          stripe.charges
            .create({
              amount: req.body.productsCost,
              description: `Purchased of Amt:${req.body.productsCost} has been made`,
              currency: "USD",
              customer: customer.id,
            })
            .then((charge) => {
              console.log(charge);
              return res
                .status(200)
                .json({ error: false, msg: "Saved In Stripe" });
            })
            .catch((err) => {
              console.log(err);

              return res
                .status(503)
                .json({ error: true, msg: "Could not Saved In Stripe" });
            });
        });
    } catch (err) {
      res.status(404).json({ msg: "Not Found" });
    }
    return;
  }
  return res.status(404).json({ msg: "Not Found" });
};
