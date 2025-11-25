const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const corporateController = require('../controllers/corporateController');

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
router.post('/inquiry', inquiryValidation, corporateController.submitInquiry);

// Admin routes (you can add authentication middleware later)
router.get('/inquiries', corporateController.getAllInquiries);
router.get('/inquiry/:id', corporateController.getInquiryById);
router.put('/inquiry/:id', corporateController.updateInquiry);
router.delete('/inquiry/:id', corporateController.deleteInquiry);

module.exports = router;
