const { validationResult } = require('express-validator');
const StrategicPartnership = require('../models/StrategicPartnership');

// @desc    Submit strategic partnership inquiry
// @route   POST /api/partnership/inquiry
// @access  Public
exports.submitInquiry = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, company, phone, partnershipType, message } = req.body;

    // Create partnership inquiry
    const inquiry = await StrategicPartnership.create({
      name,
      email,
      company,
      phone,
      partnershipType,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in partnering with us! Our team will contact you soon.',
      inquiry: {
        id: inquiry._id,
        name: inquiry.name,
        company: inquiry.company,
        email: inquiry.email,
        partnershipType: inquiry.partnershipType,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('Partnership inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting inquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all partnership inquiries (Admin only)
// @route   GET /api/partnership/inquiries
// @access  Private/Admin
exports.getAllInquiries = async (req, res) => {
  try {
    const { status, partnershipType, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (partnershipType) query.partnershipType = partnershipType;
    
    const inquiries = await StrategicPartnership.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await StrategicPartnership.countDocuments(query);

    res.status(200).json({
      success: true,
      inquiries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Get partnership inquiries error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching inquiries' 
    });
  }
};

// @desc    Get single partnership inquiry (Admin only)
// @route   GET /api/partnership/inquiry/:id
// @access  Private/Admin
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await StrategicPartnership.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }

    res.status(200).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error('Get partnership inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching inquiry' 
    });
  }
};

// @desc    Update partnership inquiry (Admin only)
// @route   PUT /api/partnership/inquiry/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const inquiry = await StrategicPartnership.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }

    if (status) {
      inquiry.status = status;
      if (status === 'contacted' && !inquiry.contactedAt) {
        inquiry.contactedAt = Date.now();
      }
    }
    
    if (notes !== undefined) inquiry.notes = notes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry,
    });
  } catch (error) {
    console.error('Update partnership inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating inquiry' 
    });
  }
};

// @desc    Delete partnership inquiry (Admin only)
// @route   DELETE /api/partnership/inquiry/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await StrategicPartnership.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Delete partnership inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting inquiry' 
    });
  }
};
