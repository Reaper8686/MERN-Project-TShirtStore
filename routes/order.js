const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllProducts,
  getOrderStatus,
  updateOrderStatus,
} = require("../controllers/order");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");

//params
router.param("orderId", getOrderById);
router.param("userId", getUserById);

// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticate,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//ReadAll
router.get(
  "/order/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  getAllProducts
);

// Read
router.get(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  getOrderStatus
);

// Update
router.put(
  "/order/:orderId/status/userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
