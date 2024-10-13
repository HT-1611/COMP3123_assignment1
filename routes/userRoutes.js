const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');  // Correct import path

const router = express.Router();

// Signup route
router.post('/signup', [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) { return res.status(400).json({ message: 'User already exists' });
    }
        user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (err) {
        res.status(500).send('Server error');
    }
});


// Login route
router.post('/login', [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').exists().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
