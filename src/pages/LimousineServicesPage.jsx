import { useState } from 'react';
import { DollarSign, Plane, Calendar, MapPin, Clock, Users, Shield, Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './LimousineServicesPage.css';

const LimousineServicesPage = () => {
  const [bookingData, setBookingData] = useState({
    tripType: 'one-way',
    pickup: '',
    date: '',
    time: '',
    pickupTime: ''
  });

  const [currentSlide, setCurrentSlide] = useState({
    business: 0,
    first: 0,
    businessVan: 0
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
  };

  const features = [
    {
      icon: <DollarSign />,
      title: "Competitive rates",
      description: "No hidden fees. Our prices are always fixed. We offer flat-rate for all services that are fair to you and our chauffeurs."
    },
    {
      icon: <Plane />,
      title: "Seamless airport travel",
      description: "Professional meet and greet, and complimentary wait time allows for delays and flight tracking."
    },
    {
      icon: <Calendar />,
      title: "Travel on your terms",
      description: "Select the vehicle that suits your schedule. It's quick and easy for you to cancel or alter changes to any ride."
    }
  ];

  const vehicleClasses = [
    {
      name: "Business Class",
      image: "/images/business-class.jpg",
      description: "Top-rated chauffeurs. Sedans that offer 91% or similar",
      price: "Fits up to 3 people",
      features: [
        "Fits up to 3 people",
        "Meet and greet free or standard check-in, or 3 extra pieces of checked luggage",
        "Available in most of our business districts"
      ]
    },
    {
      name: "First Class",
      image: "/images/first-class.jpg",
      description: "Top-of-the-line sedans. Audi A8, BMW 7 Series, Audi A8 or similar",
      price: "Fits up to 3 people",
      features: [
        "Fits up to 3 people",
        "For 5 carry-ons large, or 4 standard checked in, or 3 extra pieces",
        "Available in most of our business districts"
      ]
    },
    {
      name: "Business Van/SUV",
      image: "/images/business-van.jpg",
      description: "Vans and SUVs. Mercedes V-Class, or similar",
      price: "Fits up to 5 people",
      features: [
        "Fits up to 5 people",
        "For 7 carry-ons large, or 6 standard checked",
        "Available in most cities"
      ]
    }
  ];

  const nextSlide = (vehicle) => {
    setCurrentSlide({
      ...currentSlide,
      [vehicle]: (currentSlide[vehicle] + 1) % 3
    });
  };

  const prevSlide = (vehicle) => {
    setCurrentSlide({
      ...currentSlide,
      [vehicle]: currentSlide[vehicle] === 0 ? 2 : currentSlide[vehicle] - 1
    });
  };

  const faqs = [
    {
      question: "What is a limo?",
      answer: "A limousine (limo) is a luxury vehicle driven by a professional chauffeur. Our fleet includes premium sedans, SUVs, and vans that provide superior comfort, style, and service for any occasion."
    },
    {
      question: "What is expert limo service?",
      answer: "Expert limo service combines professional chauffeurs, luxury vehicles, and personalized attention to detail. Our service includes flight tracking, complimentary wait time, and 24/7 customer support."
    },
    {
      question: "What are the benefits of a limo service?",
      answer: "Benefits include stress-free travel, professional chauffeurs, luxury vehicles, fixed pricing, flight tracking for airport transfers, flexible cancellation, and the ability to work or relax during your journey."
    },
    {
      question: "Do you do a punctual limo driver?",
      answer: "Yes, punctuality is our priority. Our chauffeurs arrive on time, track your flight for airport pickups, and include complimentary wait time to ensure you're never rushed."
    }
  ];

  return (
    <div className="limo-services-page">
      {/* Hero Section with Booking */}
      <section className="limo-hero">
        <div className="limo-hero-content">
          <div className="limo-hero-text">
            <h1>Limo Service Around the Globe</h1>
          </div>
          <div className="limo-booking-card">
            <div className="booking-tabs">
              <button 
                className={bookingData.tripType === 'one-way' ? 'active' : ''}
                onClick={() => setBookingData({...bookingData, tripType: 'one-way'})}
              >
                One way
              </button>
              <button 
                className={bookingData.tripType === 'by-hour' ? 'active' : ''}
                onClick={() => setBookingData({...bookingData, tripType: 'by-hour'})}
              >
                By the hour
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group-inline">
                <MapPin size={20} />
                <input
                  type="text"
                  name="pickup"
                  placeholder="From: address, airport, hotel..."
                  value={bookingData.pickup}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-group-inline">
                <MapPin size={20} />
                <input
                  type="text"
                  name="destination"
                  placeholder="To: address, airport, hotel..."
                  value={bookingData.destination}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-row-split">
                <div className="form-group-inline">
                  <Calendar size={20} />
                  <input
                    type="text"
                    name="date"
                    placeholder="Pickup date"
                    value={bookingData.date}
                    onChange={handleBookingChange}
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group-inline">
                  <Clock size={20} />
                  <input
                    type="text"
                    name="pickupTime"
                    placeholder="Pickup time"
                    value={bookingData.pickupTime}
                    onChange={handleBookingChange}
                    onFocus={(e) => e.target.type = 'time'}
                    onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                    required
                  />
                </div>
              </div>
              <div className="booking-note">
                <Shield size={16} />
                <span>Chauffeur will wait 15 minutes free of charge</span>
              </div>
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="limo-features-section">
        <div className="limo-container">
          <div className="limo-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="limo-feature-card">
                <div className="limo-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Classes Section */}
      <section className="limo-classes-section">
        <div className="limo-container">
          <h2>Discover our service classes</h2>
          <div className="limo-classes-grid">
            {vehicleClasses.map((vehicle, index) => (
              <div key={index} className="limo-class-card">
                <div className="limo-class-carousel">
                  <button 
                    className="carousel-btn prev"
                    onClick={() => prevSlide(vehicle.name.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="limo-class-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                  </div>
                  <button 
                    className="carousel-btn next"
                    onClick={() => nextSlide(vehicle.name.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="carousel-dots">
                    {[0, 1, 2].map((dot) => (
                      <span 
                        key={dot} 
                        className={currentSlide[vehicle.name.toLowerCase().replace(/\s+/g, '-')] === dot ? 'active' : ''}
                      ></span>
                    ))}
                  </div>
                </div>
                <h3>{vehicle.name}</h3>
                <p className="limo-class-description">{vehicle.description}</p>
                <ul className="limo-class-features">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limo Service in the City */}
      <section className="limo-city-section">
        <div className="limo-container">
          <div className="limo-city-content">
            <div className="limo-city-text">
              <h2>Limo service in the city</h2>
              <p>
                Although limo services are your preferred way, getting to your destination can be quite different from traditional taxis or your own advantage. At Blacklane, limo service ensures that you'll have a guaranteed driver on hand for every one you don't have anything second-string about your ride. Having a limo service allows you to relax and enjoy the journey, while professional chauffeurs handle navigation and traffic. Whether you're heading to a business meeting or a special event, our service is exactly, Blacklane has a presence in hundreds of cities across the globe. Wherever you are, booking Blacklane is simple as clicking a few buttons.
              </p>
              <p><strong>Our limo services include:</strong></p>
              <ul className="limo-city-list">
                <li>Weddings</li>
                <li>Events</li>
                <li>Business meetings celebrations</li>
                <li>Sporting events</li>
              </ul>
            </div>
            <div className="limo-city-image">
              <img src="/images/limo-city.jpg" alt="Limo Service in City" />
            </div>
          </div>
        </div>
      </section>

      {/* Get Around Section */}
      <section className="limo-around-section">
        <div className="limo-container">
          <div className="limo-around-content">
            <div className="limo-around-image">
              <img src="/images/limo-around.jpg" alt="Get Around" />
            </div>
            <div className="limo-around-text">
              <h2>Get around with a Blacklane limo service</h2>
              <p>
                With a Blacklane limo service you take advantage any mode-day trip to key to limo from the airport, a night on the town, or in and that. Thousands, events, from start to finish. Have our drivers drive you to a variety of needs, use regular <strong>Business Class</strong> vehicles use for local or reduce your carbon footprint or should the busy limo experience will suit your style as well as your budget and timeframe. It all depends on you.
              </p>
              <p>
                All of our professional chauffeurs are licensed and vetted, ensuring that you're in safe, responsible hands. We guarantee an on-time arrival—crucial for a definitely scheduled service or special event engagement. Need a limo service for guests in a wedding for exactly? We have your covered. Blacklane <strong>Business Class</strong> offers luxury and quality in abundance. Limo services are an excellent way to make party of stops for your luggage and knowledge. Whatever you choose to do, riding around from Blacklane make you'll be arriving in style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Limousine Service */}
      <section className="limo-airport-section">
        <div className="limo-container">
          <div className="limo-airport-content">
            <div className="limo-airport-text">
              <h2>Airport limousine service</h2>
              <p>
                Pre-book your airport limousine with us around the clock with an airport transfer booking from Blacklane, from the moment you step off the plane until you arrive at your chosen. Blacklane's limo service prioritizes professionalism, comfort and your peace of mind. Unlike ride-hailing services, or our discounted vehicles or our rides the flexibility and reliability of a chauffeured limousine, we've made sure that you'll be pampered and in comfort throughout your journey from flight landing to your hotel. We can get between in-congested transparency and honestly, which is why when you book our airport limo service with us, the final price you see is the final price you pay. Couple this with top service, our business class, first class and business vans: limos available in multiple categories, major for corporate passengers!
              </p>
            </div>
            <div className="limo-airport-image">
              <img src="/images/limo-airport.jpg" alt="Airport Limousine" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="limo-faq-section">
        <div className="limo-container">
          <div className="limo-faq-wrapper">
            <h2>Frequently Asked Questions</h2>
            <div className="limo-faq-content">
              <div className="limo-faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="limo-faq-item">
                    <button
                      className={`limo-faq-question ${openFaq === index ? 'active' : ''}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {faq.question}
                      <span className="limo-faq-icon">{openFaq === index ? '−' : '+'}</span>
                    </button>
                    {openFaq === index && (
                      <div className="limo-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="limo-faq-image">
                <img src="/images/limo-faq.jpg" alt="FAQ" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="limo-final-cta">
        <div className="limo-container">
          <h2>Experience luxury limousine service worldwide</h2>
          <p>Book your premium chauffeur service in over 50 countries and 100+ cities</p>
          <button className="limo-cta-button">Book Now</button>
        </div>
      </section>
    </div>
  );
};

export default LimousineServicesPage;
