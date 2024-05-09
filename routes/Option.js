
const express = require('express');
const router = express.Router();
const {Food} = require('../models/food');

// Create an option for a specific food
router.post('/foods/:foodId/options', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    food.options.push(req.body);
    await food.save();

    return res.status(201).json(food.options);
  } catch (error) {
    console.error('Error creating option:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Read all options for a specific food
router.get('/foods/:foodId/options', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    return res.json(food.options);
  } catch (error) {
    console.error('Error fetching options:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Read an option by ID for a specific food
router.get('/foods/:foodId/options/:optionId', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const option = food.options.find(opt => opt._id == req.params.optionId);
    if (!option) return res.status(404).json({ message: 'Option not found' });

    return res.json(option);
  } catch (error) {
    console.error('Error fetching option:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an option by ID for a specific food
router.put('/foods/:foodId/options/:optionId', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const optionIndex = food.options.findIndex(opt => opt._id == req.params.optionId);
    if (optionIndex === -1) return res.status(404).json({ message: 'Option not found' });

    food.options[optionIndex] = req.body;
    await food.save();

    return res.json(food.options);
  } catch (error) {
    console.error('Error updating option:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an option by ID for a specific food
router.delete('/foods/:foodId/options/:optionId', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const optionIndex = food.options.findIndex(opt => opt._id == req.params.optionId);
    if (optionIndex === -1) return res.status(404).json({ message: 'Option not found' });

    food.options.splice(optionIndex, 1);
    await food.save();

    return res.json({ message: 'Option deleted successfully' });
  } catch (error) {
    console.error('Error deleting option:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
