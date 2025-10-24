import Product from "../models/Product.js";

// @desc Get all products
// @route GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc Get product by ID
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

// @desc Create a new product (Admin only)
export const createProduct = async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  const product = new Product({ name, description, price, image, category, countInStock });
  const created = await product.save();
  res.status(201).json(created);
};

// @desc Update a product (Admin only)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else res.status(404).json({ message: "Product not found" });
};

// @desc Delete a product (Admin only)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else res.status(404).json({ message: "Product not found" });
};
