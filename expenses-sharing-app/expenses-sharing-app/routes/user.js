const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create User
router.post('/create', async (req, res) => {
    const { name, email, mobile } = req.body;
    try {
        const user = new User({ name, email, mobile });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Retrieve User Details
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
});

module.exports = router;
