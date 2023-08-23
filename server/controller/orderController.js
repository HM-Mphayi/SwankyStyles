const Order = require("../model/orderModel");

const createOrder = async (req, res) => {
  try {
    const createdOrder = await Order.create(req.body);
    res.status(200).json(createdOrder);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const getOrders = async (req, res) => {
  const { userID } = req.params;
  try {
    const orders = await Order.find({ userID }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createOrder,
  getOrders,
};
