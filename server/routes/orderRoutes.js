const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
} = require("../controller/orderController");

router.route("/").post(createOrder).get(getAllOrders);
router.route("/user/:userID").get(getUserOrders);
router.route("/:id").get(getOrderById);

module.exports = router;
