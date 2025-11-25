const mongoose = require('mongoose');

const corporateInquirySchema = new mongoose.Schema({
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
  company: {
    type: String,
    required: [true, 'Company name is required'],
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
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  interestedIn: {
    type: String,
    required: [true, 'Please select what you are interested in'],
    enum: ['corporate', 'travel-agency', 'event', 'partnership'],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'closed'],
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

module.exports = mongoose.model('CorporateInquiry', corporateInquirySchema);
