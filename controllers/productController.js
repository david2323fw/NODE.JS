// controllers/productController.js
const Product = require('../models/Product');

// Agregar producto
exports.addProduct = async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;
  try {
    const newProduct = new Product({ nombre, categoria, precio, stock });
    await newProduct.save();
    res.status(201).json({ message: 'Producto agregado', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Modificar producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, stock } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { nombre, categoria, precio, stock }, { new: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};

// Obtener productos
exports.getProducts = async (req, res) => {
  const { categoria } = req.query;
  try {
    const products = categoria
      ? await Product.find({ categoria })
      : await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
};
