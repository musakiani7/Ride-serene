const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  countryCode: {
    type: String,
    default: '+1',
  },
  supportType: {
    type: String,
    required: [true, 'Support type is required'],
    enum: ['new-event', 'existing', 'consultation', 'quote'],
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['conference', 'wedding', 'gala', 'concert', 'sporting', 'other'],
  },
  eventDate: {
    type: String,
    trim: true,
  },
  estimatedDate: {
    type: String,
    trim: true,
  },
  guestCount: {
    type: String,
    trim: true,
  },
  numberOfRides: {
    type: String,
    trim: true,
  },
  serviceRequired: {
    type: String,
    trim: true,
  },
  comments: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contactedAt: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('EventBooking', eventBookingSchema);
