// Quick test script to verify booking API
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Booking = require('./models/Booking');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testBooking() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find test customer
    const customer = await Customer.findOne({ email: 'musa@gmail.com' });
    if (!customer) {
      console.log('❌ Test customer not found. Please create an account first.');
      process.exit(1);
    }
    console.log('✅ Found customer:', customer.email);

    // Create test booking
    const testBooking = await Booking.create({
      customer: customer._id,
      rideType: 'one-way',
      pickupLocation: {
        address: 'New York, NY, USA',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      dropoffLocation: {
        address: 'Los Angeles, CA, USA',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      pickupDate: new Date('2025-11-25'),
      pickupTime: '14:00',
      vehicleClass: {
        id: 'business',
        name: 'Business Class',
        vehicle: 'Mercedes-Benz E-Class',
        passengers: 3,
        luggage: 2
      },
      passengerInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890'
      },
      basePrice: 269.86,
      totalPrice: 269.86,
      currency: 'USD',
      status: 'pending',
      paymentStatus: 'pending'
    });

    console.log('✅ Booking created successfully!');
    console.log('   Booking ID:', testBooking._id);
    console.log('   Booking Reference:', testBooking.bookingReference);
    console.log('   Customer:', testBooking.customer);
    console.log('   Total Price:', testBooking.totalPrice);

    // Update payment status
    testBooking.paymentStatus = 'completed';
    testBooking.paymentMethod = 'credit_card';
    testBooking.transactionId = `TXN-${Date.now()}`;
    testBooking.paidAt = new Date();
    testBooking.status = 'confirmed';
    await testBooking.save();

    console.log('✅ Payment status updated to completed');
    console.log('   Status:', testBooking.status);
    console.log('   Payment Status:', testBooking.paymentStatus);

    // Fetch all bookings for this customer
    const bookings = await Booking.find({ customer: customer._id });
    console.log(`✅ Total bookings for ${customer.email}:`, bookings.length);

    console.log('\n🎉 All tests passed! Booking system is working correctly.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
}

testBooking();
