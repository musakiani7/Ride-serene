const mongoose = require('mongoose');

const strategicPartnershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  partnershipType: {
    type: String,
    required: [true, 'Partnership type is required'],
    enum: ['aviation', 'cruise', 'financial', 'hotel', 'other'],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in_discussion', 'partnership_established', 'closed'],
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

module.exports = mongoose.model('StrategicPartnership', strategicPartnershipSchema);
