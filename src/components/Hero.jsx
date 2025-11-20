import { useState } from 'react';
import { MapPin, Calendar, Clock, Info, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [rideType, setRideType] = useState('one-way');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    duration: '2' // Duration in hours for "By the hour"
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', { rideType, ...formData });
  };

  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  const defaultDate = formData.date || today;

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-image-overlay">
          <h1 className="hero-title">Premium Chauffeur Service</h1>
          <p className="hero-subtitle">Experience luxury, reliability, and serenity</p>
        </div>
      </div>
      
      <div className="hero-container">
        <div className="booking-form-card">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="ride-type-cards">
                <button
                  type="button"
                  className={`ride-type-card ${rideType === 'one-way' ? 'active' : ''}`}
                  onClick={() => setRideType('one-way')}
                >
                  <div className="card-content">
                    <ArrowRight size={24} />
                    <span>One way</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`ride-type-card ${rideType === 'by-hour' ? 'active' : ''}`}
                  onClick={() => setRideType('by-hour')}
                >
                  <div className="card-content">
                    <Clock size={24} />
                    <span>By the hour</span>
                  </div>
                </button>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="from">
                    <MapPin size={18} />
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    placeholder="Address, airport, hotel, ..."
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {rideType === 'one-way' && (
                  <div className="form-group">
                    <label htmlFor="to">
                      <MapPin size={18} />
                      To
                    </label>
                    <input
                      type="text"
                      id="to"
                      name="to"
                      placeholder="Address, airport, hotel, ..."
                      value={formData.to}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {rideType === 'by-hour' && (
                  <div className="form-group">
                    <label htmlFor="duration">
                      <Clock size={18} />
                      Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours (Full day)</option>
                    </select>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">
                      <Calendar size={18} />
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date || today}
                      onChange={handleInputChange}
                      min={today}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">
                      <Clock size={18} />
                      Pickup time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-info">
                <Info size={16} />
                <span>Chauffeur will wait 15 minutes free of charge.</span>
              </div>

              <button type="submit" className="btn btn-primary search-btn">
                Search
              </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

