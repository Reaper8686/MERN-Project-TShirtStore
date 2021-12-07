const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "ds65tm8xpm4rqxs4",
  publicKey: "w3k974jwtqs9bjsh",
  privateKey: "6b3b86ddbb71f40f683dafa7f6cee039",
});

exports.getToken = (req, res) => {
  gateway.clientToken
    .generate()
    .then((response) => {
      return res.send(response);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

exports.braintreePayment = (req, res) => {
  let nonceFromTheClient = req.body.token;
  let amount = req.body.amount;
  gateway.transaction
    .sale({
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
