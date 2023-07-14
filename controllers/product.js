const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  // Pagination: get query parameters
  const { limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  // Promise
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// Create
const createProduct = async (req = request, res = response) => {
  const { status, user, ...body } = req.body;
  const name = body.name.toUpperCase();

  const productDB = await Product.findOne({ name });

  if (productDB)
    return res.status(400).json({
      msg: `El producto ${productDB.name} ya existe!`,
    });

  // Generate data to save
  const data = {
    ...body,
    name,
    user: req.userAuth._id,
  };
  const product = new Product(data);
  try {
    await product.save();
    res.status(201).json({
      product,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...body } = req.body;

  if (body.name) body.name = body.name.toUpperCase();
  body.user = req.userAuth._id;

  try {
    const product = await Product.findByIdAndUpdate(id, body, { new: true })
      .populate("user", "name")
      .populate("category", "name");

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { status: false });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
