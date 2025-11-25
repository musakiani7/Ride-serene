const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const eventsController = require('../controllers/eventsController');

// Validation middleware
const bookingValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('supportType').trim().notEmpty().withMessage('Support type is required'),
  body('eventType').trim().notEmpty().withMessage('Event type is required'),
  body('guestCount').optional().trim(),
];

// Public routes
router.post('/booking', bookingValidation, eventsController.submitBooking);

// Admin routes (you can add authentication middleware later)
router.get('/bookings', eventsController.getAllBookings);
router.get('/booking/:id', eventsController.getBookingById);
router.put('/booking/:id', eventsController.updateBooking);
router.delete('/booking/:id', eventsController.deleteBooking);

module.exports = router;
