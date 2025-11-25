const { validationResult } = require('express-validator');
const EventBooking = require('../models/EventBooking');

// @desc    Submit event booking inquiry
// @route   POST /api/events/booking
// @access  Public
exports.submitBooking = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      countryCode,
      supportType,
      eventType,
      eventDate,
      estimatedDate,
      guestCount,
      numberOfRides,
      serviceRequired,
      comments 
    } = req.body;

    // Create event booking
    const booking = await EventBooking.create({
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      supportType,
      eventType,
      eventDate,
      estimatedDate,
      guestCount,
      numberOfRides,
      serviceRequired,
      comments,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your event inquiry! Our team will contact you soon with a personalized quote.',
      booking: {
        id: booking._id,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        eventType: booking.eventType,
        guestCount: booking.guestCount,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error('Event booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting booking. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all event bookings (Admin only)
// @route   GET /api/events/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const { status, supportType, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (supportType) query.supportType = supportType;
    
    const bookings = await EventBooking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await EventBooking.countDocuments(query);

    res.status(200).json({
      success: true,
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Get event bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching bookings' 
    });
  }
};

// @desc    Get single event booking (Admin only)
// @route   GET /api/events/booking/:id
// @access  Private/Admin
exports.getBookingById = async (req, res) => {
  try {
    const booking = await EventBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Get event booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching booking' 
    });
  }
};

// @desc    Update event booking (Admin only)
// @route   PUT /api/events/booking/:id
// @access  Private/Admin
exports.updateBooking = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const booking = await EventBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    if (status) {
      booking.status = status;
      if (status === 'contacted' && !booking.contactedAt) {
        booking.contactedAt = Date.now();
      }
    }
    
    if (notes !== undefined) booking.notes = notes;

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    console.error('Update event booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating booking' 
    });
  }
};

// @desc    Delete event booking (Admin only)
// @route   DELETE /api/events/booking/:id
// @access  Private/Admin
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await EventBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Delete event booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting booking' 
    });
  }
};
