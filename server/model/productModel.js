const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide Name"],
  },
  price: {
    type: Number,
    required: [true, "Provide price"],
  },
  image: {
    type: String,
    required: [true, "Provide image"],
  },
  category: {
    type: String,
    required: [true, "Provide category"],
  },
  displayHome: {
    type: Boolean,
    required: [true, "Provide category"],
  },
});

module.exports = mongoose.model("product", productSchema);
