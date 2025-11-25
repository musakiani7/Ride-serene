const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const partnershipController = require('../controllers/partnershipController');

// Validation middleware
const inquiryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('phone').optional().trim(),
  body('partnershipType').trim().notEmpty().withMessage('Partnership type is required'),
];

// Public routes
router.post('/inquiry', inquiryValidation, partnershipController.submitInquiry);

// Admin routes (you can add authentication middleware later)
router.get('/inquiries', partnershipController.getAllInquiries);
router.get('/inquiry/:id', partnershipController.getInquiryById);
router.put('/inquiry/:id', partnershipController.updateInquiry);
router.delete('/inquiry/:id', partnershipController.deleteInquiry);

module.exports = router;
