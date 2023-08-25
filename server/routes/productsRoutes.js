const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  getHomeProducts,
  getCategoryProducts,
  getSubCategoryProducts,
  getSearchedProducts,
} = require("../controller/productController");

router.route("/").get(getAllProducts);
router.route("/home").get(getHomeProducts);
router.route("/search").get(getSearchedProducts);
router.route("/:id").get(getProduct);
router.route("/category/:category").get(getCategoryProducts);
router.route("/subCategory/:subCategory").get(getSubCategoryProducts);

module.exports = router;
