const express = require("express");
const router = express.Router();

const { createOrder, getOrders } = require("../controller/orderController");

router.route("/").post(createOrder);
router.route("/:userID").get(getOrders);

module.exports = router;
