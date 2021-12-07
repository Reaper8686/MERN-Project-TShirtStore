const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Routers

//create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  createCategory
);

//Read
router.get("/category/:categoryId", getCategory);

//ReadAll
router.get("/categories", getAllCategory);

//Update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  updateCategory
);

//Delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticate,
  isAdmin,
  removeCategory
);

module.exports = router;
