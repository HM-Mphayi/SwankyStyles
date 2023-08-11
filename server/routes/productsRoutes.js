const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  getHomeProducts,
  getCategoryProducts,
  getSubCategoryProducts,
} = require("../controller/productController");

router.route("/").get(getAllProducts);
router.route("/home").get(getHomeProducts);
router.route("/:id").get(getProduct);
router.route("/category/:category").get(getCategoryProducts);
router.route("/subCategory/:subCategory").get(getSubCategoryProducts);

module.exports = router;
