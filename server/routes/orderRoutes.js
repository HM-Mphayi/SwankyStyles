const express = require("express");
const router = express.Router();

const { createOrder, getUserOrders,getAllOrders } = require("../controller/orderController");

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:userID").get(getUserOrders);

module.exports = router;
