const Product = require("../model/productModel");

const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();

    res.status(200).json(Products);
  } catch (error) {
    console.log(error);
  }
};

const getHomeProducts = async (req, res) => {
  try {
    const homeProduct = await Product.find({ displayHome: true }).limit(24);
    res.status(200).json(homeProduct);
  } catch (error) {
    console.log(error);
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getSubCategoryProducts = async (req, res) => {
  try {
    const subCategory = req.params.subCategory;
    const products = await Product.find({ subCategory });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const singleProduct = await Product.find({ _id: id });
    res.status(200).json(singleProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getHomeProducts,
  getCategoryProducts,
  getSubCategoryProducts,
};
