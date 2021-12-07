const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getCategoryById} = require("../controllers/category");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes

//create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  updateProduct
);

//delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  removeProduct
);

//getAll routes
router.get("/products", getAllProducts);
router.get("/product/categories", getAllUniqueCategories);

module.exports = router;
