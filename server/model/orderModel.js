const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "Provide userID"],
    },
    recipientName: {
      type: String,
      required: [true, "Provide recipient name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
    },
    contactNumber: {
      type: String,
      required: [true, "Provide contact number"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Provide delivery address"],
    },
    items: {
      type: [],
      required: [true, "Provide item(s)"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    total: {
      type: Number,
      required: [true, "Provide the total amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
