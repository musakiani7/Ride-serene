const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Chauffeur = require('../models/Chauffeur');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id, role: 'chauffeur' }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register a new chauffeur (5-step form)
// @route   POST /api/chauffeur/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      country,
      city,
      password,
      confirmPassword,
      requirementsAccepted,
      profilePicture,
      driverLicense,
      identityCard,
      vehicle,
      company,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !country || !city || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required personal information',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (!requirementsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the requirements to proceed',
      });
    }

    // Validate vehicle information
    if (!vehicle || !vehicle.model || !vehicle.year || !vehicle.color || !vehicle.registrationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all vehicle information',
      });
    }

    // Validate vehicle year
    const currentYear = new Date().getFullYear();
    if (vehicle.year < currentYear - 4 || vehicle.year > currentYear) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle must be no more than 4 years old',
      });
    }

    // Validate company documents
    if (!company || !company.commercialRegistration || !company.fleetInsuranceAgreement || 
        !company.vatRegistrationCertificate || !company.operatingPermit) {
      return res.status(400).json({
        success: false,
        message: 'Please upload all required company documents',
      });
    }

    // Check if chauffeur already exists
    const existingChauffeur = await Chauffeur.findOne({ email });
    if (existingChauffeur) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Check if registration number already exists
    const existingVehicle = await Chauffeur.findOne({ 'vehicle.registrationNumber': vehicle.registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle registration number already registered',
      });
    }

    // Create chauffeur
    const chauffeur = await Chauffeur.create({
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      country,
      city,
      password,
      requirementsAccepted,
      profilePicture,
      driverLicense,
      identityCard,
      vehicle: {
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        registrationNumber: vehicle.registrationNumber,
        registrationCertificate: vehicle.registrationCertificate,
        insuranceCertificate: vehicle.insuranceCertificate,
        vehiclePhoto: vehicle.vehiclePhoto,
      },
      company: {
        commercialRegistration: company.commercialRegistration,
        fleetInsuranceAgreement: company.fleetInsuranceAgreement,
        vatRegistrationCertificate: company.vatRegistrationCertificate,
        operatingPermit: company.operatingPermit,
      },
      status: 'pending',
    });

    // Generate token
    const token = generateToken(chauffeur._id);

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully. Your application is pending approval.',
      token,
      chauffeur: {
        id: chauffeur._id,
        firstName: chauffeur.firstName,
        lastName: chauffeur.lastName,
        email: chauffeur.email,
        phone: chauffeur.phone,
        country: chauffeur.country,
        city: chauffeur.city,
        status: chauffeur.status,
        isActive: chauffeur.isActive,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Login chauffeur
// @route   POST /api/chauffeur/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if chauffeur exists
    const chauffeur = await Chauffeur.findOne({ email }).select('+password');
    if (!chauffeur) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordMatch = await chauffeur.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if account is approved
    if (chauffeur.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Your application is pending approval. Please wait for admin confirmation.',
      });
    }

    if (chauffeur.status === 'rejected') {
      return res.status(403).json({
        success: false,
        message: `Your application has been rejected. Reason: ${chauffeur.rejectionReason || 'Not specified'}`,
      });
    }

    if (chauffeur.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    // Check if account is active
    if (!chauffeur.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    // Update last login
    chauffeur.lastLogin = Date.now();
    await chauffeur.save();

    // Generate token
    const token = generateToken(chauffeur._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      chauffeur: {
        id: chauffeur._id,
        firstName: chauffeur.firstName,
        lastName: chauffeur.lastName,
        email: chauffeur.email,
        phone: chauffeur.phone,
        country: chauffeur.country,
        city: chauffeur.city,
        status: chauffeur.status,
        isActive: chauffeur.isActive,
        vehicle: chauffeur.vehicle,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get chauffeur profile
// @route   GET /api/chauffeur/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const chauffeur = await Chauffeur.findById(req.chauffeur.id);

    if (!chauffeur) {
      return res.status(404).json({
        success: false,
        message: 'Chauffeur not found',
      });
    }

    res.status(200).json({
      success: true,
      chauffeur: {
        id: chauffeur._id,
        firstName: chauffeur.firstName,
        lastName: chauffeur.lastName,
        email: chauffeur.email,
        phone: chauffeur.phone,
        country: chauffeur.country,
        city: chauffeur.city,
        profilePicture: chauffeur.profilePicture,
        driverLicense: chauffeur.driverLicense,
        identityCard: chauffeur.identityCard,
        vehicle: chauffeur.vehicle,
        company: chauffeur.company,
        status: chauffeur.status,
        isActive: chauffeur.isActive,
        isVerified: chauffeur.isVerified,
        createdAt: chauffeur.createdAt,
        approvedAt: chauffeur.approvedAt,
        rejectionReason: chauffeur.rejectionReason,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
    });
  }
};

// @desc    Update chauffeur profile
// @route   PUT /api/chauffeur/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const chauffeur = await Chauffeur.findById(req.chauffeur.id);

    if (!chauffeur) {
      return res.status(404).json({
        success: false,
        message: 'Chauffeur not found',
      });
    }

    // Update fields
    if (firstName) chauffeur.firstName = firstName;
    if (lastName) chauffeur.lastName = lastName;
    if (phone) chauffeur.phone = phone;

    await chauffeur.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      chauffeur: {
        id: chauffeur._id,
        firstName: chauffeur.firstName,
        lastName: chauffeur.lastName,
        email: chauffeur.email,
        phone: chauffeur.phone,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }
};

// @desc    Get approved vehicles list
// @route   GET /api/chauffeur/approved-vehicles
// @access  Public
exports.getApprovedVehicles = async (req, res) => {
  try {
    const approvedVehicles = [
      'Ford Expedition', 'Mercedes-Benz Vito', 'Mercedes-Benz EQE', 'Land Rover Range Rover',
      'Mercedes-Benz GLE', 'Genesis G90', 'Mercedes-Benz E-Class', 'BMW 5 series', 'Audi A8',
      'Mercedes-Benz GLS', 'Cadillac Escalade', 'Chevrolet Tahoe', 'Chevrolet Suburban',
      'BMW 7 series', 'Mercedes-Benz EQV', 'BMW i7', 'Lucid Air', 'GMC Yukon XL', 'Audi A6',
      'Mercedes-Benz EQS', 'Mercedes-Benz S-Class', 'BMW i5', 'GMC Yukon Denali',
      'Mercedes-Benz V-Class'
    ];

    res.status(200).json({
      success: true,
      vehicles: approvedVehicles,
      colors: ['Black', 'Silver'],
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching approved vehicles',
    });
  }
};

// @desc    Get chauffeur status
// @route   GET /api/chauffeur/status
// @access  Private
exports.getStatus = async (req, res) => {
  try {
    const chauffeur = await Chauffeur.findById(req.chauffeur.id);

    if (!chauffeur) {
      return res.status(404).json({
        success: false,
        message: 'Chauffeur not found',
      });
    }

    res.status(200).json({
      success: true,
      status: {
        applicationStatus: chauffeur.status,
        isActive: chauffeur.isActive,
        isVerified: chauffeur.isVerified,
        approvedAt: chauffeur.approvedAt,
        rejectionReason: chauffeur.rejectionReason,
      },
    });
  } catch (error) {
    console.error('Get status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching status',
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
      message: 'Not authorized, no token',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

    if (decoded.role !== 'chauffeur') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Chauffeur role required.',
      });
    }

    req.chauffeur = await Chauffeur.findById(decoded.id);

    if (!req.chauffeur) {
      return res.status(401).json({
        success: false,
        message: 'Chauffeur not found',
      });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid token',
    });
  }
};
