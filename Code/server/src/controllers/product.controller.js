import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      userId: req.user.id, 
    });

    res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { keyword } = req.query;

    let query = { userId: req.user.id };

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, price, quantity, description },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};