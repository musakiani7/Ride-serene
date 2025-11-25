const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed: ' + errors.array().map(e => e.msg).join(', '),
        errors: errors.array() 
      });
    }

    const {
      rideType,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      duration,
      estimatedDistance,
      estimatedArrivalTime,
      vehicleClass,
      passengerInfo,
      basePrice,
      taxes,
      fees,
      discount,
      totalPrice,
      currency
    } = req.body;

    // Log user info for debugging
    console.log('Creating booking for user:', req.user?.id);
    console.log('Request body:', req.body);

    // Create booking
    const booking = await Booking.create({
      customer: req.user.id, // from auth middleware
      rideType,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      duration,
      estimatedDistance,
      estimatedArrivalTime,
      vehicleClass,
      passengerInfo,
      basePrice,
      taxes: taxes || 0,
      fees: fees || 0,
      discount: discount || 0,
      totalPrice,
      currency: currency || 'USD',
      status: 'pending',
      paymentStatus: 'pending',
    });

    console.log('Booking created:', booking._id, booking.bookingReference);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        bookingReference: booking.bookingReference,
        totalPrice: booking.totalPrice,
        currency: booking.currency,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Create booking error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone')
      .populate('chauffeur', 'firstName lastName phone vehicleInfo');

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Check if user owns this booking
    if (booking.customer._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this booking' 
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all bookings for logged in customer
// @route   GET /api/bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .sort({ createdAt: -1 })
      .populate('chauffeur', 'firstName lastName phone vehicleInfo');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update booking payment status
// @route   PUT /api/bookings/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, transactionId, paymentIntentId } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Check if user owns this booking
    if (booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this booking' 
      });
    }

    booking.paymentStatus = paymentStatus;
    booking.paymentMethod = paymentMethod;
    booking.transactionId = transactionId;
    booking.paymentIntentId = paymentIntentId;

    if (paymentStatus === 'completed') {
      booking.paidAt = Date.now();
      booking.status = 'confirmed';
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated',
      booking: {
        id: booking._id,
        bookingReference: booking.bookingReference,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Check if user owns this booking
    if (booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to cancel this booking' 
      });
    }

    // Check if booking can be cancelled (e.g., not already completed)
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot cancel booking with status: ${booking.status}` 
      });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;
    booking.cancelledAt = Date.now();

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: {
        id: booking._id,
        bookingReference: booking.bookingReference,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error cancelling booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
