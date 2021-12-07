const exprees = require("express");
const router = exprees.Router();
const {stripepayment} = require("../controllers/stripepayment");

router.post("/payment/stripe", stripepayment);

module.exports = router;
