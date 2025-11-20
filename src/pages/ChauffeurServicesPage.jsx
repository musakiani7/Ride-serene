import { useState } from 'react';
import { DollarSign, Plane, Calendar, MapPin, Clock, Shield, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import './ChauffeurServicesPage.css';

const ChauffeurServicesPage = () => {
  const [bookingData, setBookingData] = useState({
    tripType: 'one-way',
    pickup: '',
    destination: '',
    date: '',
    pickupTime: ''
  });

  const [currentSlide, setCurrentSlide] = useState({
    business: 0,
    first: 0,
    businessVan: 0
  });

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
      description: "No hidden fees. Our prices are always fixed. We offer flat-rate for all services prices that are fair to you and our chauffeurs."
    },
    {
      icon: <Plane />,
      title: "Seamless airport travel",
      description: "Professional meet and greet, complimentary wait time and flight tracking."
    },
    {
      icon: <Calendar />,
      title: "Travel on your terms",
      description: "Select the vehicle that suits your schedule. It's quick and easy for you to cancel or make changes to any ride."
    }
  ];

  const vehicleClasses = [
    {
      name: "Business Class",
      image: "/images/business-class.jpg",
      description: "Mercedes E-Class, Audi A6, or similar. 91% or similar",
      features: [
        "Fits up to 3 people",
        "For 2 carry-ons large, or 2 standard check-in, or 3 extra for one checked bags",
        "Available in most of our business districts"
      ]
    },
    {
      name: "First Class",
      image: "/images/first-class.jpg",
      description: "Mercedes S-Class, BMW 7 Series, Audi A8 or similar",
      features: [
        "Fits up to 3 people",
        "For 2 carry-ons large, or 2 standard check-in, or 3 extra for one checked bags",
        "Available in most of our business districts"
      ]
    },
    {
      name: "Business Van/SUV",
      image: "/images/business-van.jpg",
      description: "Mercedes V-Class or similar",
      features: [
        "Fits up to 5 people",
        "For 4 carry-ons large",
        "Available in select cities"
      ]
    }
  ];

  const nextSlide = (vehicle) => {
    setCurrentSlide({
      ...currentSlide,
      [vehicle]: (currentSlide[vehicle] + 1) % 5
    });
  };

  const prevSlide = (vehicle) => {
    setCurrentSlide({
      ...currentSlide,
      [vehicle]: currentSlide[vehicle] === 0 ? 4 : currentSlide[vehicle] - 1
    });
  };

  return (
    <div className="chauffeur-services-page">
      {/* Hero Section with Booking */}
      <section className="cs-hero">
        <div className="cs-hero-content">
          <div className="cs-hero-text">
            <h1>Your Professional Chauffeur Service</h1>
          </div>
          <div className="cs-booking-card">
            <div className="cs-booking-tabs">
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
            <form onSubmit={handleBookingSubmit} className="cs-booking-form">
              <div className="cs-form-group">
                <MapPin size={20} />
                <input
                  type="text"
                  name="pickup"
                  placeholder="From: address, airport, hotel"
                  value={bookingData.pickup}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="cs-form-group">
                <MapPin size={20} />
                <input
                  type="text"
                  name="destination"
                  placeholder="To: address, airport, hotel"
                  value={bookingData.destination}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="cs-form-group">
                <Calendar size={20} />
                <input
                  type="text"
                  name="date"
                  placeholder="Wed, Nov 17, 2025"
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="cs-form-group">
                <Clock size={20} />
                <input
                  type="text"
                  name="pickupTime"
                  placeholder="05:15 PM"
                  value={bookingData.pickupTime}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <p className="cs-booking-note">
                <Shield size={16} />
                Chauffeur will wait 15 minutes free of charge
              </p>
              <button type="submit" className="cs-search-button">Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="cs-features-section">
        <div className="cs-container">
          <div className="cs-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="cs-feature-card">
                <div className="cs-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Classes Section */}
      <section className="cs-classes-section">
        <div className="cs-container">
          <h2>Discover our service classes</h2>
          <div className="cs-classes-grid">
            {vehicleClasses.map((vehicle, index) => (
              <div key={index} className="cs-class-card">
                <div className="cs-class-carousel">
                  <button 
                    className="cs-carousel-btn prev"
                    onClick={() => prevSlide(vehicle.name.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="cs-class-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                  </div>
                  <button 
                    className="cs-carousel-btn next"
                    onClick={() => nextSlide(vehicle.name.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="cs-carousel-dots">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span 
                        key={dot} 
                        className={currentSlide[vehicle.name.toLowerCase().replace(/\s+/g, '-')] === dot ? 'active' : ''}
                      ></span>
                    ))}
                  </div>
                </div>
                <h3>{vehicle.name}</h3>
                <p className="cs-class-description">{vehicle.description}</p>
                <ul className="cs-class-features">
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

      {/* World Class Section */}
      <section className="cs-world-section">
        <div className="cs-container">
          <div className="cs-world-content">
            <div className="cs-world-image">
              <img src="/images/chauffeur-world.jpg" alt="World Class Service" />
            </div>
            <div className="cs-world-text">
              <h2>World class chauffeurs going the extra mile</h2>
              <p>
                Every day, our chauffeurs go above and beyond — it's simply in their DNA. It's for those unforgettable experiences that customers such as you continue to use our service time and time again. What makes them so much more than your blue pill rides is the care they put into making every aspect of your travel experience enjoyable. Of course, the comfort of the ride and their polite and respectful manner goes without saying, but their willingness to book a chauffeur ride for yourself your client, or a colleague.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chauffeur Hire Worldwide */}
      <section className="cs-hire-section">
        <div className="cs-container">
          <div className="cs-hire-content">
            <div className="cs-hire-text">
              <h2>Chauffeur hire worldwide</h2>
              <p>
                There's no more comfortable, reliable and stylish way to travel than by Blacklane chauffeur services. Wherever you are, no matter the service. Lifted by a local limousine provider that is dedicated to upholding our high standards and a membership of top-quality drivers in your service. It doesn't matter whether it's an important business meeting that you feel free to ask your totally knowledgeable chauffeur for tips and suggestions on what to see or local special just the right advice. The Blacklane network of chauffeurs in local areas covers different zones across five continents and Asia, so you can select our professional chauffeur service across multiple continents, wherever life happens to take you. Blacklane chauffeurs are meticulous in their dedication to providing first-rate, five-star service — whether for a smooth, stress-free ride.
              </p>
            </div>
            <div className="cs-hire-image">
              <img src="/images/chauffeur-hire.jpg" alt="Chauffeur Hire" />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="cs-travel-section">
        <div className="cs-container">
          <div className="cs-travel-content">
            <div className="cs-travel-image">
              <img src="/images/chauffeur-travel.jpg" alt="Travel" />
            </div>
            <div className="cs-travel-text">
              <h2>Travel from A to B in your city by private chauffeur</h2>
              <p>
                A stylish Blacklane limousine service is the perfect way to get yourself around a city with the greatest of class, a comfortable and stylish solution for your business travel or a special excursion out. For longer distances, we've got airport transfer service or professional private chauffeur service. For cross-traveling in larger groups, we offer a Business Van service — the perfect vehicle for traveling with colleagues and enjoying our down-to-down, door-to-door service. Once you book, your chauffeur will be there to meet every mode of transport is required, for which we offer our First Class service. Blacklane's fleet of stylish black cars are also available for hourly hire. You decide what you prefer to have approach the best chauffeur service instantly-contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Section */}
      <section className="cs-airport-section">
        <div className="cs-container">
          <div className="cs-airport-content">
            <div className="cs-airport-text">
              <h2>Professional chauffeur service to and from the airport</h2>
              <p>
                If you've just touched down after a long-haul flight, <strong>Blacklane's first airport transfer service</strong> is in some markets for nothing better, no paid large luggage fees, no stress. All you have to do is relax and feel pampered at this difficult start in hand, to allow you to your waiting vehicle. Use our accessible website or sleek smartphone app to simply create an effortless service, and the price you see is the price you pay. You can even book a chauffeur for a luxury service without the luxury prices and we don't believe in hidden fees – honesty and transparency is our policy with every guest. This means that your ride to the airport can be calm and confident, knowing where you're going to be, something of particular consideration to corporate travelers. Book your <strong>professional and private car service</strong> today!
              </p>
            </div>
            <div className="cs-airport-image">
              <img src="/images/chauffeur-airport.jpg" alt="Airport Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cs-final-cta">
        <div className="cs-container">
          <h2>Experience professional chauffeur service worldwide</h2>
          <p>Book your premium ride in over 50 countries and 100+ cities with professional chauffeurs</p>
          <button className="cs-cta-button">Book Your Ride Now</button>
        </div>
      </section>
    </div>
  );
};

export default ChauffeurServicesPage;
