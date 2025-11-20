import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Search, ChevronDown, Shield } from 'lucide-react';
import './CityToCityPage.css';
// Temporary placeholder styles - remove once you add real images
import './PLACEHOLDER_STYLES.css';

const CityToCityPage = () => {
  const [tripType, setTripType] = useState('one-way');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');

  const topCities = [
    { name: 'New York', image: '/images/newyork.jpg', price: 'From $150' },
    { name: 'Los Angeles', image: '/images/la.jpg', price: 'From $200' },
    { name: 'Paris', image: '/images/paris.jpg', price: 'From €180' },
    { name: 'Dubai', image: '/images/dubai.jpg', price: 'From AED 500' }
  ];

  const topRoutes = [
    { from: 'New York', to: 'Philadelphia' },
    { from: 'London', to: 'Oxford' },
    { from: 'Paris', to: 'Reims' },
    { from: 'Dubai', to: 'Abu Dhabi' },
    { from: 'New York', to: 'East Hampton' },
    { from: 'Manchester', to: 'Liverpool' },
    { from: 'Nice', to: 'Saint-Tropez' },
    { from: 'Brisbane', to: 'Gold Coast' }
  ];

  const faqs = [
    { question: 'How do I get a quote?', answer: 'You can get an instant quote by entering your trip details in the booking form above.' },
    { question: 'How much does it a city-to-city trip?', answer: 'Prices vary based on distance and vehicle type. Enter your route for an instant quote.' },
    { question: 'What is the cancellation policy?', answer: 'Free cancellation up to 24 hours before your scheduled pickup time.' },
    { question: 'What vehicles does Blacklane use?', answer: 'We offer Business Class sedans, Business Van/SUVs, and First Class luxury vehicles.' },
    { question: 'Where will I receive the chauffeur\'s contact information?', answer: 'Contact information is sent via email and SMS 24 hours before pickup.' },
    { question: 'What happens if my trip is delayed?', answer: 'Contact us immediately and we\'ll do our best to accommodate schedule changes.' },
    { question: 'What if I do not find my chauffeur at the agreed pickup point?', answer: 'Call our 24/7 support team for immediate assistance in locating your chauffeur.' },
    { question: 'Does the chauffeur speak English?', answer: 'All our chauffeurs speak English fluently along with local languages.' },
    { question: 'Can I add child seats to the booking?', answer: 'Yes, child seats can be added during booking at no extra charge.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log({ tripType, pickupLocation, dropoffLocation, date, time, passengers });
  };

  return (
    <div className="city-to-city-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">City-to-City Long Distance Car Service</h1>
            </div>
            
            {/* Booking Form */}
            <div className="booking-form-card">
              <div className="trip-type-selector">
                <button 
                  className={`trip-type-btn ${tripType === 'one-way' ? 'active' : ''}`}
                  onClick={() => setTripType('one-way')}
                >
                  One way
                </button>
                <button 
                  className={`trip-type-btn ${tripType === 'hourly' ? 'active' : ''}`}
                  onClick={() => setTripType('hourly')}
                >
                  By the hour
                </button>
              </div>

              <form onSubmit={handleSearch} className="booking-form">
                <div className="form-group-inline">
                  <MapPin size={20} />
                  <input 
                    type="text" 
                    placeholder="From: address, airport, hotel" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>

                <div className="form-group-inline">
                  <MapPin size={20} />
                  <input 
                    type="text" 
                    placeholder="To: address, airport, hotel" 
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                  />
                </div>

                <div className="form-group-inline">
                  <Calendar size={20} />
                  <input 
                    type="text" 
                    placeholder="Wed, Nov 17, 2025"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group-inline">
                  <Clock size={20} />
                  <input 
                    type="text" 
                    placeholder="05:15 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <p className="booking-note">
                  <Shield size={16} />
                  Chauffeur will wait 15 minutes free of charge
                </p>

                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="app-section section">
        <div className="container">
          <div className="app-content">
            <div className="app-text">
              <h2>Effortless travel at your fingertips</h2>
              <p>Book, track and manage your journey safely on our Blacklane app.</p>
              <div className="app-badges">
                <img src="/images/app-store.svg" alt="Download on App Store" />
                <img src="/images/google-play.svg" alt="Get it on Google Play" />
              </div>
              <div className="qr-code">
                <img src="/images/qr-code.png" alt="QR Code" />
              </div>
            </div>
            <div className="app-image">
              <img src="/images/app-preview.png" alt="Blacklane App" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section section">
        <div className="container">
          <h2 className="section-title">Long distance car service, the better way between cities</h2>
          <p className="section-subtitle">
            Whether you're commuting between cities, regional trains, or rail rentals, 
            long-distance journeys are logistically complicated and involve a lot of waiting. 
            Road trips make travel more convenient and also offer unmatched flexibility; 
            they save you time and money whilst keeping you safe.
          </p>

          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>Get the schedule.</h3>
              <p>Your chauffeur lifts parking fees, when you can cancel up until an hour before your ride starts.</p>
            </div>

            <div className="benefit-item">
              <h3>Easy travel from door to door.</h3>
              <p>Travel is stress-free as you can rely on premium chauffeur service; enjoy peace of mind knowing you'll arrive safely at your destination on time, without having to search for parking at the last minute.</p>
            </div>

            <div className="benefit-item">
              <h3>No surprise additional costs.</h3>
              <p>Intercity trips/book easily online and avoid any unpleasant surprises; you pay one amount at checkout covering your entire trip, including tolls and fees, with no extra charge or hidden costs.</p>
            </div>

            <div className="benefit-item">
              <h3>Competitive rates.</h3>
              <p>Prices are set fairly and transparently, you pay less and get more value for your money and overall cost is less compared to typical short distance or taxi rides.</p>
            </div>

            <div className="benefit-item">
              <h3>Multiple pickups.</h3>
              <p>With us long-distance city transfer can be combined with multiple stops at no added cost; when you book a multi-stop trip, we will even arrange a separate chauffeur to take you to your next destination in a vehicle that best suits your group size.</p>
            </div>

            <div className="benefit-item">
              <h3>Flexible travel.</h3>
              <p>Intercity trips allow you to change your plans at the last minute if needed; enjoy the freedom to travel at a moment's notice or to cancel up to an hour before your scheduled time if your plans are adjusted.</p>
            </div>
          </div>

          <div className="route-map">
            <img src="/images/route-map.png" alt="City Routes Map" />
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="global-section section">
        <div className="container">
          <h2 className="section-title">Global reach</h2>
          <p className="section-description">
            Blacklane is the leading reliable, professional, safe and punctual 
            door-to-door chauffeured car service. Available in over 50 countries, 
            in more than 300 cities and all global major cities, we offer the 
            highest quality chauffeur service that takes you from location A to B 
            in unmatched comfort.
          </p>
          
          <div className="global-map">
            <img src="/images/world-map.png" alt="Global Coverage Map" />
          </div>

          <div className="global-stats">
            <div className="stat-item">
              <p><strong>Check out over 50 cities</strong> Offering city-to-city drives</p>
            </div>
            <div className="stat-item">
              <p><strong>Check out city-to-city routes</strong> That you can take</p>
            </div>
          </div>

          <p className="global-note">
            Explore some of the most famous areas regions in the world with Blacklane's 
            intercity transfer service.
          </p>
        </div>
      </section>

      {/* Routes Section */}
      <section className="routes-section section">
        <div className="container">
          <div className="routes-header">
            <h2>City-to-City routes</h2>
          </div>

          <div className="routes-subsection">
            <div className="routes-subheader">
              <h3>Top cities</h3>
              <a href="#" className="see-all">See all →</a>
            </div>
            <div className="cities-grid">
              {topCities.map((city, index) => (
                <div key={index} className="city-card">
                  <div className="city-image">
                    <img src={city.image} alt={city.name} />
                  </div>
                  <div className="city-info">
                    <h4>{city.name}</h4>
                    <p>{city.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="routes-subsection">
            <div className="routes-subheader">
              <h3>Top routes</h3>
              <a href="#" className="see-all">See all →</a>
            </div>
            <div className="routes-grid">
              {topRoutes.map((route, index) => (
                <div key={index} className="route-card">
                  <span>{route.from}</span>
                  <span className="route-arrow">→</span>
                  <span>{route.to}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="route-search">
            <p>Have a route in mind?</p>
            <p className="route-search-subtitle">Enter your route and find a chauffeur to drive you there.</p>
            <button className="book-city-btn">Book a City-to-City ride</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-list">
              <h2>Frequently asked questions</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`faq-icon ${openFaq === index ? 'open' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faq-image">
              <img src="/images/chauffeur-service.jpg" alt="Professional Chauffeur Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <h3>"Best car service ever..."</h3>
              <p>To finally be back on service i have really missed and chauffeur. I was really looking forward to pick up out from JFK to Cambridge and it was everything i would highly recommend this service to all!</p>
            </div>
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <h3>"Order is Abu Dhabi"</h3>
              <p>Amazing service lovely Thomas made us feel welcomed and comfortable. Clean car and very professional. We were provided with bottles to Abu Dhabi and Port was. This was our first order and it will not be the last...</p>
            </div>
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <h3>"Truly on the club"</h3>
              <p>The day trip was great. We rode to our event. When inquire, pick-up was from JFK to take and to back home and got to see the sights on the ride up the coast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-section section">
        <div className="container">
          <div className="download-content">
            <div className="download-text">
              <h2>Download the app</h2>
              <p>Unlock a seamless experience as we notify you when your chauffeur is on the go or has arrived. Download our user-friendly mobile app to track your journey in real-time on the go - all in the palm of your hand.</p>
              <div className="download-badges">
                <img src="/images/app-store.svg" alt="Download on App Store" />
                <img src="/images/google-play.svg" alt="Get it on Google Play" />
              </div>
            </div>
            <div className="download-image">
              <img src="/images/mobile-app.png" alt="Blacklane Mobile App" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityToCityPage;
