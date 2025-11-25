const { validationResult } = require('express-validator');
const TravelAgencyInquiry = require('../models/TravelAgencyInquiry');

// @desc    Submit travel agency inquiry form
// @route   POST /api/travel-agency/inquiry
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

    const { firstName, lastName, company, email, phone, country, interestedIn, message } = req.body;

    // Create inquiry
    const inquiry = await TravelAgencyInquiry.create({
      firstName,
      lastName,
      company,
      email,
      phone,
      country,
      interestedIn,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! Our team will contact you soon.',
      inquiry: {
        id: inquiry._id,
        firstName: inquiry.firstName,
        lastName: inquiry.lastName,
        company: inquiry.company,
        email: inquiry.email,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('Travel agency inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting inquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all travel agency inquiries (Admin only)
// @route   GET /api/travel-agency/inquiries
// @access  Private/Admin
exports.getAllInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    
    const inquiries = await TravelAgencyInquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await TravelAgencyInquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      inquiries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching inquiries' 
    });
  }
};

// @desc    Get single travel agency inquiry (Admin only)
// @route   GET /api/travel-agency/inquiry/:id
// @access  Private/Admin
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await TravelAgencyInquiry.findById(req.params.id);
    
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
    console.error('Get inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching inquiry' 
    });
  }
};

// @desc    Update travel agency inquiry status (Admin only)
// @route   PUT /api/travel-agency/inquiry/:id
// @access  Private/Admin
exports.updateInquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const inquiry = await TravelAgencyInquiry.findById(req.params.id);
    
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
    console.error('Update inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating inquiry' 
    });
  }
};

// @desc    Delete travel agency inquiry (Admin only)
// @route   DELETE /api/travel-agency/inquiry/:id
// @access  Private/Admin
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await TravelAgencyInquiry.findById(req.params.id);
    
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
    console.error('Delete inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting inquiry' 
    });
  }
};
  