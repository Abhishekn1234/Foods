// foodRoutes.js
const express = require('express');
const router = express.Router();
const {Food} = require('../models/food');

// Apply discount
// Apply discount
router.put('/food/:id/apply-discount', async (req, res) => {
    const { id } = req.params;
    const { discount } = req.body;

    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Apply discount to each option's price
        food.options.forEach(option => {
            // Reduce the price of each option by the specified discount percentage
            option.price -= (option.price * discount) / 100;
        });

        // Update the discount field in the food document
        food.discount = discount;
        await food.save();

        return res.json({ message: 'Discount applied successfully', food });
    } catch (error) {
        console.error('Error applying discount:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Apply coupon code
// Apply coupon code
router.put('/food/:id/apply-coupon', async (req, res) => {
    const { id } = req.params;
    const { couponCode } = req.body;

    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Check if the coupon code is valid and apply the logic accordingly
        if (couponCode === 'YOUR_VALID_COUPON_CODE') {
            // Apply the coupon code logic here
            // For example, reduce the price of each option by a fixed amount
            const discountedPrice = food.options.map(option => {
                // Apply a fixed discount to the price of each option
                const discountAmount = 5; // Example: $5 discount
                return {
                    ...option,
                    price: option.price - discountAmount
                };
            });

            // Save the updated food document
            food.options = discountedPrice;
            await food.save();

            return res.json({ message: 'Coupon code applied successfully', food });
        } else {
            return res.status(400).json({ message: 'Invalid coupon code' });
        }
    } catch (error) {
        console.error('Error applying coupon code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Apply discount to a food item by ID
router.post('/food/:id/discount', async (req, res) => {
    const { id } = req.params;
    const { discount } = req.body;

    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Apply discount to each option's price
        food.options.forEach(option => {
            // Reduce the price of each option by the specified discount percentage
            option.price -= (option.price * discount) / 100;
        });

        // Update the discount field in the food document
        food.discount = discount;
        await food.save();

        return res.json({ message: 'Discount applied successfully', food });
    } catch (error) {
        console.error('Error applying discount:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// Get all foods with applied discount
router.get('/foods/discounted', async (req, res) => {
    try {
        // Find all food items with a discount greater than 0
        const discountedFoods = await Food.find({ discount });
        return res.json(discountedFoods);
    } catch (error) {
        console.error('Error fetching discounted foods:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete discount from a food item by ID
router.delete('/food/:id/discount', async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Reset the discount to 0
        food.discount = 0;
        await food.save();

        return res.json({ message: 'Discount removed from food' });
    } catch (error) {
        console.error('Error deleting discount from food:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




router.get('/food/:id/coupon-code', async (req, res) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Get the coupon code of the food
        const couponCode = food.couponCode || 'No coupon code';
        return res.json({ couponCode });
    } catch (error) {
        console.error('Error fetching coupon code of food:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete coupon code from food
router.delete('/food/:id/coupon-code', async (req, res) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        // Delete the coupon code from the food
        food.couponCode = undefined;
        await food.save();

        return res.json({ message: 'Coupon code removed from food' });
    } catch (error) {
        console.error('Error deleting coupon code from food:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports=router;