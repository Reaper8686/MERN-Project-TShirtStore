const stripe = require("stripe")(
  "sk_test_51K2XASSHt8HhsXdh4OXM5Qf3qqgmb1ykEI8dRm1NC3B3BvDevluQ2ljZjPHzTRrYhXSaTZmxS2l96KqsXGp5BlxF00P972psjG"
);
const uuid = require("uuid");

exports.stripepayment = (req, res) => {
  const {products, token} = req.body;

  let amount = 0;
  products.map((p) => (amount += p.price));

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "this is test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {idempotencyKey}
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
