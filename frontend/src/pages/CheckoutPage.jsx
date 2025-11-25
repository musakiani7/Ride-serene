import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, User, CreditCard, Download, Mail } from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = useMemo(() => location.state?.booking || {}, [location.state]);
  const [fullBookingDetails, setFullBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if booking data exists
    if (!booking.bookingReference && !booking.bookingId) {
      navigate('/');
      return;
    }

    // Fetch full booking details from database
    const fetchBookingDetails = async () => {
      if (!booking.bookingId) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      try {
        const response = await fetch(`${API_BASE}/api/bookings/${booking.bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Full booking details from database:', data.booking);
          setFullBookingDetails(data.booking);
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booking, navigate]);

  const handleDownloadReceipt = () => {
    // Implement PDF download functionality
    alert('Receipt download functionality will be implemented');
  };

  const handleEmailReceipt = () => {
    // Implement email receipt functionality
    alert('Receipt will be sent to your email');
  };

  // Use database details if available, otherwise use passed booking data
  const displayBooking = fullBookingDetails || booking;
  const bookingRef = displayBooking.bookingReference || booking.bookingReference;

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div className="spinner" style={{margin: '0 auto 20px', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
            <p>Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Progress Steps */}
        <div className="booking-progress">
          <div className="progress-step completed">
            <div className="step-circle">✓</div>
            <span>Service Class</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step completed">
            <div className="step-circle">✓</div>
            <span>Pickup Info</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step completed">
            <div className="step-circle">✓</div>
            <span>Log in</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step completed">
            <div className="step-circle">✓</div>
            <span>Payment</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step active">
            <div className="step-circle">5</div>
            <span>Checkout</span>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-section">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Booking Confirmed!</h1>
          <p className="success-subtitle">
            Your booking has been successfully confirmed and payment has been processed.
            {fullBookingDetails && <span style={{display: 'block', marginTop: '8px', fontSize: '14px', color: '#28a745'}}>✓ Saved to database</span>}
          </p>
          <div className="booking-reference">
            <span>Booking Reference:</span>
            <strong>{bookingRef || 'N/A'}</strong>
          </div>
        </div>

        {/* Booking Details */}
        <div className="confirmation-details">
          <div className="details-card">
            <h2>Booking Details</h2>
            
            <div className="detail-section">
              <h3><Calendar size={20} /> Trip Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Pickup Location</span>
                  <span className="detail-value">
                    {fullBookingDetails?.pickupLocation?.address || booking.from || 'N/A'}
                  </span>
                </div>
                {(fullBookingDetails?.dropoffLocation?.address || booking.to) && (
                  <div className="detail-item">
                    <span className="detail-label">Dropoff Location</span>
                    <span className="detail-value">
                      {fullBookingDetails?.dropoffLocation?.address || booking.to}
                    </span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {fullBookingDetails ? new Date(fullBookingDetails.pickupDate).toLocaleDateString() : booking.date}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">
                    {fullBookingDetails?.pickupTime || booking.time}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Booking Status</span>
                  <span className="detail-value" style={{color: '#28a745', fontWeight: 'bold'}}>
                    {fullBookingDetails?.status?.toUpperCase() || 'CONFIRMED'}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3><User size={20} /> Vehicle Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Class</span>
                  <span className="detail-value">
                    {fullBookingDetails?.vehicleClass?.name || booking.vehicle?.name || 'N/A'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vehicle</span>
                  <span className="detail-value">
                    {fullBookingDetails?.vehicleClass?.vehicle || booking.vehicle?.vehicle || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3><User size={20} /> Passenger Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">
                    {fullBookingDetails?.passengerInfo?.firstName || booking.passengerInfo?.firstName} {fullBookingDetails?.passengerInfo?.lastName || booking.passengerInfo?.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">
                    {fullBookingDetails?.passengerInfo?.email || booking.passengerInfo?.email}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">
                    {fullBookingDetails?.passengerInfo?.phone || booking.passengerInfo?.phone}
                  </span>
                </div>
                {(fullBookingDetails?.passengerInfo?.flightNumber || booking.passengerInfo?.flightNumber) && (
                  <div className="detail-item">
                    <span className="detail-label">Flight Number</span>
                    <span className="detail-value">
                      {fullBookingDetails?.passengerInfo?.flightNumber || booking.passengerInfo.flightNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3><CreditCard size={20} /> Payment Summary</h3>
              <div className="payment-summary">
                <div className="payment-item">
                  <span>Base Fare</span>
                  <span>US${(fullBookingDetails?.basePrice || booking.vehicle?.price || 0).toFixed(2)}</span>
                </div>
                <div className="payment-item">
                  <span>Taxes & Fees</span>
                  <span>Included</span>
                </div>
                <div className="payment-item total">
                  <span>Total Paid</span>
                  <span className="total-amount">US${(fullBookingDetails?.totalPrice || booking.vehicle?.price || 0).toFixed(2)}</span>
                </div>
                <div className="payment-status">
                  <CheckCircle size={16} />
                  <span>Payment {fullBookingDetails?.paymentStatus?.toUpperCase() || 'SUCCESSFUL'}</span>
                  {fullBookingDetails?.paymentMethod && (
                    <span style={{marginLeft: '10px', fontSize: '12px', color: '#6c757d'}}>
                      via {fullBookingDetails.paymentMethod.replace('_', ' ')}
                    </span>
                  )}
                </div>
                {fullBookingDetails?.transactionId && (
                  <div style={{marginTop: '10px', fontSize: '13px', color: '#6c757d'}}>
                    Transaction ID: {fullBookingDetails.transactionId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="confirmation-actions">
          <button className="btn-secondary" onClick={handleDownloadReceipt}>
            <Download size={20} />
            Download Receipt
          </button>
          <button className="btn-secondary" onClick={handleEmailReceipt}>
            <Mail size={20} />
            Email Receipt
          </button>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>You will receive a confirmation email shortly with all booking details.</li>
            <li>A chauffeur will be assigned to your booking closer to your pickup date.</li>
            <li>You can track your chauffeur's location on the day of your trip.</li>
            <li>Your chauffeur will wait 15 minutes free of charge at the pickup location.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
