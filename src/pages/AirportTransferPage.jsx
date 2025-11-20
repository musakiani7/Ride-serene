import { useState } from 'react';
import { DollarSign, Plane, Globe, Calendar, Clock, Users, ChevronDown, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import './AirportTransferPage.css';

const AirportTransferPage = () => {
  const [tripType, setTripType] = useState('one-way');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const serviceClasses = [
    {
      name: 'Business Van',
      description: 'Mercedes V-Class, Volkswagen Caravelle Excecutive, Toyota Alphard, or similar',
      passengers: 'Fits up to 5 people',
      features: [
        'Plus 15 min/10 miles free if standard check-up on 1 extra large size or more',
        'Book for larger parties, lots of luggage, or families'
      ]
    },
    {
      name: 'Electric Class',
      description: 'Audi e-tron, Tesla Model X, Tesla Model S, or similar',
      passengers: 'Fits up to 3 people',
      features: [
        'Plus 45 min/30 miles free if standard check-up on 1 extra large size or more',
        'Available in more of our business districts'
      ]
    }
  ];

  const features = [
    {
      icon: <DollarSign size={32} />,
      title: 'Competitive rates',
      description: 'Access premium service at distance-based prices that are fair to you and our chauffeurs.'
    },
    {
      icon: <Plane size={32} />,
      title: 'Seamless airport travel',
      description: 'Relax with 1 hour of complimentary wait time and flight tracking.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Travel on your terms',
      description: 'Stay flexible and in charge of your travel schedule. It\'s quick and easy for you to cancel our service changes to stay vital.'
    }
  ];

  const faqs = [
    {
      question: 'What does an airport transfer do?',
      answer: 'An airport transfer provides door-to-door transportation between the airport and your destination. Our professional chauffeurs track your flight and adjust pickup times accordingly.'
    },
    {
      question: 'Is a month booking an airport transfer?',
      answer: 'Yes, you can book airport transfers up to a month in advance through our platform. We recommend booking as early as possible to ensure availability.'
    },
    {
      question: 'What is a pool airport transfer?',
      answer: 'A pool airport transfer is a shared ride service where multiple passengers traveling to similar destinations share the same vehicle, reducing costs while maintaining quality service.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceClasses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceClasses.length) % serviceClasses.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ tripType, pickupLocation, dropoffLocation, date, time, passengers });
  };

  return (
    <div className="airport-transfer-page">
      {/* Hero Section with Booking Form */}
      <section className="hero-section-airport">
        <div className="hero-overlay"></div>
        <div className="hero-content-airport">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-text-airport">
                <h1 className="hero-title-airport">Airport Transfer Service Worldwide</h1>
              </div>
              
              {/* Booking Form */}
              <div className="booking-form-card-airport">
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
                    <Plane size={20} />
                    <input 
                      type="text" 
                      placeholder="From: address, airport, hotel..." 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>

                  <div className="form-group-inline">
                    <Plane size={20} />
                    <input 
                      type="text" 
                      placeholder="To: address, airport, hotel..." 
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                    />
                  </div>

                  <div className="form-row-split">
                    <div className="form-group-inline">
                      <Calendar size={20} />
                      <input 
                        type="text" 
                        placeholder="Pickup date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group-inline">
                      <Clock size={20} />
                      <input 
                        type="text" 
                        placeholder="Pickup time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        onFocus={(e) => e.target.type = 'time'}
                        onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                      />
                    </div>
                  </div>

                  <div className="booking-note">
                    <Shield size={16} />
                    <span>1 hour free wait time included with flight tracking</span>
                  </div>

                  <button type="submit" className="search-btn-airport">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-airport-section section">
        <div className="container">
          <div className="features-airport-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-airport-card">
                <div className="feature-airport-icon">{feature.icon}</div>
                <h3 className="feature-airport-title">{feature.title}</h3>
                <p className="feature-airport-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Classes Section */}
      <section className="service-classes-section section">
        <div className="container">
          <h2 className="section-title">Discover our service classes</h2>
          
          <div className="service-carousel">
            <button className="carousel-btn prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            
            <div className="service-slides">
              {serviceClasses.map((service, index) => (
                <div 
                  key={index} 
                  className={`service-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="service-image">
                    <img src={`/images/${service.name.toLowerCase().replace(' ', '-')}.jpg`} alt={service.name} />
                  </div>
                  <div className="service-details">
                    <h3>{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    <p className="service-passengers">✓ {service.passengers}</p>
                    <ul className="service-features">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="carousel-btn next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-dots">
            {serviceClasses.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfer in Global Cities */}
      <section className="global-cities-section section">
        <div className="container">
          <div className="global-cities-content">
            <div className="global-cities-text">
              <h2>Airport transfer in global cities</h2>
              <p>
                Experience your Blacklane in cities worldwide. Rely on a safe and professional 
                airport transfer in over 600 cities across the globe with Blacklane: punctual 
                arrivals, reliable and luxurious vehicles, and helpful customer support are 
                hallmarks of the experience. Our chauffeurs stay on top of the details of your 
                flight, so they can be ready to collect you after a delay or to find some extra 
                time if you land ahead of schedule. Whether you use public transport maps in 
                Shanghai with local connections. Blacklane offers a service that will take you 
                to your destination directly, from the airport, no matter your destination, 
                and regardless of the time of day. We offer transfers available at any airport 
                in any delivery schedule as you control. They've hand-picked and locally 
                researched globally, so that no matter where you go you will always be driven 
                as safely as possible.
              </p>
            </div>
            <div className="global-cities-image">
              <img src="/images/business-travelers.jpg" alt="Business Travelers" />
            </div>
          </div>
        </div>
      </section>

      {/* Get to or from Airport Section */}
      <section className="get-to-airport-section section">
        <div className="container">
          <div className="get-to-airport-content">
            <div className="get-to-airport-image">
              <img src="/images/luggage-loading.jpg" alt="Airport Transfer" />
            </div>
            <div className="get-to-airport-text">
              <h2>Get to or from the airport</h2>
              <p>
                Discover why our acclaimed airport service offers the very highest possible 
                standards for all passengers. Whether you're stepping out of LAX or Guarulhos 
                airport into the heart of the city, the arrival of a Blacklane chauffeur is 
                the start of an exceptional customer experience. We offer convenient and 
                comfortable door-to-door travel, plus the flexibility to book with multiple 
                stops enroute to your hotel with family or colleagues if Blacklane Business. 
                You can be chauffeured by to-class people, together with guests at every lab 
                arrival and departure point worldwide. Punctuality, class, and comfort—to 
                experience of light and comfort - a great idea for special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Shuttle Booking Section */}
      <section className="shuttle-booking-section section">
        <div className="container">
          <div className="shuttle-booking-content">
            <div className="shuttle-booking-text">
              <h2>Airport shuttle booking</h2>
              <p>
                Booking a Blacklane is incredibly simple – just tap the app, or a few seconds 
                on our website. We believe that travel should be as painless as possible, and 
                so shouldn't Blacklane searches, or use the smartphone app to bypass anti 
                rental desks. The necessary documents will provide this on the website and 
                there's even a step-by-step guide. Our prices are fair and transparent; what 
                you see includes the calculated fare and payment details, you will receive an 
                email of confirmation along your electronically. Blacklane picks itself on 
                transparency; which means you know in advance of your journey precisely where 
                your chauffeur will be to the place you stay – it great way to kick off your 
                journey.
              </p>
            </div>
            <div className="shuttle-booking-image">
              <img src="/images/chauffeur-waiting.jpg" alt="Chauffeur Service" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-airport-section section">
        <div className="container">
          <div className="faq-airport-content">
            <div className="faq-airport-list">
              <h2>Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-airport-item">
                  <button 
                    className="faq-airport-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`faq-airport-icon ${openFaq === index ? 'open' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="faq-airport-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faq-airport-image">
              <img src="/images/airport-faq.jpg" alt="Airport Transfer FAQ" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirportTransferPage;
