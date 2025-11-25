const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Customer = require('../models/Customer');

// Generate JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

// @desc    Register a new customer
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Create customer
    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // Generate token
    const token = generateToken(customer._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login customer
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Check if customer exists
    const customer = await Customer.findOne({ email }).select('+password');
    if (!customer) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordMatch = await customer.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Update last login
    customer.lastLogin = Date.now();
    await customer.save();

    // Generate token
    const token = generateToken(customer._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get customer profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id);
    
    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    res.status(200).json({
      success: true,
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        isVerified: customer.isVerified,
        createdAt: customer.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile' 
    });
  }
};

// @desc    Update customer profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const customer = await Customer.findById(req.customer.id);
    
    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    // Update fields
    if (firstName) customer.firstName = firstName;
    if (lastName) customer.lastName = lastName;
    if (phone) customer.phone = phone;

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      customer: {
        id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating profile' 
    });
  }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = await Customer.findById(decoded.id);
    
    if (!req.customer) {
      return res.status(401).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, invalid token' 
    });
  }
};
