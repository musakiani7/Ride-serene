const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const travelAgencyController = require('../controllers/travelAgencyController');

// Validation middleware
const inquiryValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').optional().trim(),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('interestedIn').trim().notEmpty().withMessage('Please select what you are interested in'),
];

// Public routes
router.post('/inquiry', inquiryValidation, travelAgencyController.submitInquiry);

// Admin routes
router.get('/inquiries', travelAgencyController.getAllInquiries);
router.get('/inquiry/:id', travelAgencyController.getInquiryById);
router.put('/inquiry/:id', travelAgencyController.updateInquiry);
router.delete('/inquiry/:id', travelAgencyController.deleteInquiry);

module.exports = router;