const router = require('express').Router();

const Product = require('../models/Product');
const Category = require('../models/Category');

router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    await Category.findByIdAndUpdate(req.body.category, {
      $push: { products: newProduct },
    });
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.patch('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
