const router = require('express').Router();

const Category = require('../models/Category');

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: 'products',
      populate: { path: 'category', select: 'name' },
    });
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
