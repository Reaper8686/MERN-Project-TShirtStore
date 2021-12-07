const exprees = require("express");
const router = exprees.Router();

const {getToken, braintreePayment} = require("../controllers/braintreepayment");
const {isSignedIn, isAuthenticate} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

router.param("userId", getUserById);

router.get(
  "/payment/braintree/token/:userId",
  isSignedIn,
  isAuthenticate,
  getToken
);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticate,
  braintreePayment
);

module.exports = router;
