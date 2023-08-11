require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/connectDB");

const app = express();

//Connection to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5001, () => console.log("Server is listening on port 5001"));
  } catch (error) {
    console.log(error);
  }
};

start();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/product", require("./routes/productsRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));
