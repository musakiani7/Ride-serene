const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: process.env.JWT_EXPIRE || '7d' });

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ firstName, lastName, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    // Send Mongoose validation messages in development
    const dev = process.env.NODE_ENV === 'development';
    res.status(500).json({ success: false, message: 'Error creating account', error: dev ? err.message : undefined });
  }
};
