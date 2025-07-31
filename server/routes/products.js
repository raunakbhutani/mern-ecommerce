const express = require('express');
const Product = require('../models/Product');
const { verifyAdmin } = require('../utils/authMiddleware');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Admin: Add product
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, image, countInStock } = req.body;
    const product = await Product.create({ name, description, price, image, countInStock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Admin: Delete product
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
