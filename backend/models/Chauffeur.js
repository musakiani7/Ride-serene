const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const chauffeurSchema = new mongoose.Schema({
  // Personal Information (Step 3)
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
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  countryCode: {
    type: String,
    required: [true, 'Country code is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  
  // Personal Documents (Step 3)
  profilePicture: {
    type: String, // Base64 or file path
    required: [true, 'Profile picture is required'],
  },
  driverLicense: {
    type: String, // Base64 or file path
    required: [true, 'Driver license is required'],
  },
  identityCard: {
    type: String, // Base64 or file path
    required: [true, 'Identity card is required'],
  },
  
  // Vehicle Information (Step 4)
  vehicle: {
    model: {
      type: String,
      required: [true, 'Vehicle model is required'],
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required'],
      validate: {
        validator: function() {
          const currentYear = new Date().getFullYear();
          return this.vehicle.year >= currentYear - 4 && this.vehicle.year <= currentYear;
        },
        message: 'Vehicle must be no more than 4 years old'
      }
    },
    color: {
      type: String,
      required: [true, 'Vehicle color is required'],
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
    },
    registrationCertificate: {
      type: String, // Base64 or file path
      required: [true, 'Registration certificate is required'],
    },
    insuranceCertificate: {
      type: String, // Base64 or file path
      required: [true, 'Insurance certificate is required'],
    },
    vehiclePhoto: {
      type: String, // Base64 or file path
      required: [true, 'Vehicle photo is required'],
    },
  },
  
  // Company Documents (Step 5)
  company: {
    commercialRegistration: {
      type: String, // Base64 or file path
      required: [true, 'Commercial registration is required'],
    },
    fleetInsuranceAgreement: {
      type: String, // Base64 or file path
      required: [true, 'Fleet insurance agreement is required'],
    },
    vatRegistrationCertificate: {
      type: String, // Base64 or file path
      required: [true, 'VAT registration certificate is required'],
    },
    operatingPermit: {
      type: String, // Base64 or file path
      required: [true, 'Operating permit is required'],
    },
  },
  
  // Requirements Acceptance (Step 2)
  requirementsAccepted: {
    type: Boolean,
    required: [true, 'You must accept the requirements'],
    default: false,
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  approvedAt: {
    type: Date,
  },
  rejectionReason: {
    type: String,
  },
});

// Hash password before saving
chauffeurSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
chauffeurSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Chauffeur', chauffeurSchema);
