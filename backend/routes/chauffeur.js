const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const chauffeurController = require('../controllers/chauffeurController');

// Routes for 5-step registration form
router.post('/register', chauffeurController.register);
router.post('/login', chauffeurController.login);
router.get('/approved-vehicles', chauffeurController.getApprovedVehicles);

// Protected routes (require authentication)
router.get('/profile', chauffeurController.protect, chauffeurController.getProfile);
router.put('/profile', chauffeurController.protect, chauffeurController.updateProfile);
router.get('/status', chauffeurController.protect, chauffeurController.getStatus);

module.exports = router;
router.get('/status', chauffeurController.protect, chauffeurController.getStatus);

module.exports = router;
