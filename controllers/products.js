import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsSort = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.id });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id, "getid");

  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addProduct = async (req, res) => {
  const { userId, title, price, phone, address, desc } = req.body;
  const { filename } = req.file;

  try {
    const newProduct = new Product({
      userId,
      title,
      price,
      phone,
      address,
      desc,
      image: filename,
    });

    await newProduct.save();

    res.status(201).json("Product added sucsesfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);

    res.status(201).json("Product deleted sucsesfully!");
  } catch (err) {}
};
