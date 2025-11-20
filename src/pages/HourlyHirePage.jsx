import { useState } from 'react';
import { Clock, MapPin, Calendar, Users, Car, Shield, Briefcase, ChevronDown } from 'lucide-react';
import './HourlyHirePage.css';

const HourlyHirePage = () => {
  const [tripType, setTripType] = useState('one-way');
  const [pickupLocation, setPickupLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [openFaq, setOpenFaq] = useState(null);

  const vehicleClasses = [
    {
      name: 'Business Class',
      vehicles: ['Mercedes E-Class', 'BMW 5 Series', 'Audi A6'],
      passengers: 3,
      luggage: 2,
      image: '/images/business-sedan.jpg'
    },
    {
      name: 'Business Van/SUV',
      vehicles: ['Mercedes V-Class', 'BMW X5', 'Mercedes GLS'],
      passengers: 5,
      luggage: 4,
      image: '/images/business-van.jpg'
    },
    {
      name: 'First Class',
      vehicles: ['Mercedes S-Class', 'BMW 7 Series', 'Audi A8'],
      passengers: 3,
      luggage: 2,
      image: '/images/first-class.jpg'
    }
  ];

  const features = [
    {
      title: 'Get the luxury',
      description: 'You decide where and when to go, knowing that your chauffeur is waiting patiently; you need to make unmentioned during your journey, or to have time relaxing. You can rent for 2 hours and all the way up to 3 hours.'
    },
    {
      title: 'Enjoy peace of mind',
      description: 'Travel with one of our premium vehicles, where you can have premium hours during your ride. Everything is inclusive—fuel, cleaning, insurance, tolls, and local taxes—so there are no surprise charges at the end of the day.'
    },
    {
      title: 'Versatility',
      description: 'Your chauffeurs are trained to the highest quality and privacy standards.'
    },
    {
      title: 'Expandability',
      description: 'Every ride is redeem cheap, no more road in up-to-respond.'
    },
    {
      title: 'Ride with confidence',
      description: 'With Blacklane\'s high standards, no matter what happens, you\'ll feel confident that you can count on us to be here with more: you to reach your destination on time and relax while you enjoy the ride.'
    },
    {
      title: 'Made to the ride',
      description: 'Hourly rides are designed by age and locals within the same city. If you wish side outside the city effortta 5 cities limits. The city of origin is approximately 50 km and we will charge a charge of luxury on rate of the chauffeur\'s entire time and expenses.'
    }
  ];

  const journeyFeatures = [
    {
      title: 'Business trips',
      description: 'Going to lots of meetings all in one day, or have a multi-date business trip in a new city where you need executive assistance travelling places, hopping on or with your chauffeur? Perfect for back-to-back appointments.'
    },
    {
      title: 'Full-party ride package',
      description: 'If you need a car for your entire trip, or want all day coverage with flexible stop lengths, Blacklane\'s hourly rental is perfect. Hire a chauffeur for an assembly to your own this country and enjoy the sweet website the stress of finding a cab home.'
    },
    {
      title: 'Shopping spree',
      description: 'Doing retail therapy? Don\'t stress about squeezing your shopping bags in a small taxi; our drivers can easily accommodate all of your retail bags.'
    },
    {
      title: 'Leisure activities',
      description: 'Make the most of your time. Whether you\'re indulging in a leisurely lunch or dinner, browsing boutiques, or soaking all your local USA, your chauffeur is ready when you are. Enjoy a seamless experience with door-to-service around latest trip complexities.'
    }
  ];

  const globalLocations = [
    { name: 'United States', description: 'Ideal a driver for 3 out hours, and be more driver with Francois sharing with the hours that provides that chatter: for you stopping at the places it wanted to see. A Blacklane full day hire in the USA.' },
    { name: 'Portugal', description: 'The chauffeurs are not major drivers that local travel themselves, hiring your trip or just anything, or hiring 4WD around around or heading to the airport. Every journey must have to be.' },
    { name: 'Canada', description: 'Blacklane\'s the right full drivers could be know about can throughout the trip way and comfortable and have total day driver and drive service at the South. Or 3 hotels around if need a place where it should be there.' }
  ];

  const faqs = [
    { question: 'How do I book a chauffeur by the hour?', answer: 'Simply select the hourly option in the booking form, choose your pickup location, date, time, and the number of hours you need. Our chauffeur will be at your service for the entire duration.' },
    { question: 'How do I enable or Hourly for my hourly ride?', answer: 'You can modify your booking through your account dashboard up to 24 hours before your scheduled pickup time. Contact our support team for assistance.' },
    { question: 'What happens if my booking during the ride?', answer: 'You can extend your booking on the spot subject to chauffeur availability. Additional hours will be charged at the standard hourly rate.' },
    { question: 'When will I receive the chauffeur\'s contact information?', answer: 'You will receive your chauffeur\'s contact details 24 hours before your scheduled pickup via email and SMS.' },
    { question: 'How do I communicate with the chauffeur between stops?', answer: 'Your chauffeur will provide their direct contact number, and you can also communicate through the Blacklane app during your journey.' },
    { question: 'Does the chauffeur speak English?', answer: 'Yes, all our chauffeurs are fluent in English and many also speak additional local languages.' },
    { question: 'Can the I book booking luggage or an event?', answer: 'Yes, hourly bookings are perfect for events. Let us know your requirements in advance for the best experience.' },
    { question: 'Can the chauffeur pick me up city and drop me off another city?', answer: 'Hourly bookings are designed for use within a single city. For intercity travel, please book our City-to-City service.' },
    { question: 'Can I book a chauffeur for several days?', answer: 'Yes, you can book multiple consecutive days. Contact our team for special rates on multi-day bookings.' },
    { question: 'Can I cancel the transfer of items in the booking?', answer: 'Yes, you can cancel free of charge up to 1 hour before your scheduled pickup time.' },
    { question: 'I have other question or Blacklane hiring you, can I arrange the hourly is designated extended or discounted?', answer: 'Please contact our customer service team who will be happy to discuss your specific requirements and available options.' },
    { question: 'Can I add child seats in the booking?', answer: 'Yes, child seats can be added during the booking process at no additional charge. Please specify the type and number of seats needed.' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ tripType, pickupLocation, date, time, passengers });
  };

  return (
    <div className="hourly-hire-page">
      {/* Hero Section with Booking Form */}
      <section className="hero-section-hourly">
        <div className="hero-overlay"></div>
        <div className="hero-content-hourly">
          <div className="container">
            <div className="hero-layout-hourly">
              <div className="hero-text-hourly">
                <h1 className="hero-title-hourly">By-the-hour chauffeur and full-day driver hire</h1>
              </div>
              
              {/* Booking Form */}
              <div className="booking-form-card-hourly">
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
                      placeholder="From: address, airport, hotel..." 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
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
                    <span>Flexible hourly bookings from 2 to 12 hours</span>
                  </div>

                  <button type="submit" className="search-btn-hourly">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-section-hourly section">
        <div className="container">
          <div className="app-content-hourly">
            <div className="app-text-hourly">
              <h2>Enjoy absolute freedom</h2>
              <p>Our by-the-hour and full-day chauffeur services offer you maximum flexibility in a spacious, chauffeured transport from A-port, multiple and short stops.</p>
              <div className="app-badges-hourly">
                <div className="qr-code-hourly">
                  <img src="/images/qr-code.png" alt="QR Code" />
                </div>
                <div className="badges-container">
                  <img src="/images/app-store.svg" alt="App Store" />
                  <img src="/images/google-play.svg" alt="Google Play" />
                </div>
              </div>
            </div>
            <div className="app-image-hourly">
              <img src="/images/app-hourly.png" alt="Blacklane App" />
            </div>
          </div>
        </div>
      </section>

      {/* Hourly Chauffeur Service */}
      <section className="service-info-section section">
        <div className="container">
          <h2 className="section-title">Hourly chauffeur service</h2>
          <p className="section-description">
            Hiring a chauffeur by the hour or booking a full-day chauffeur means you can travel worry-free, whenever you need to make unexpected stops and for however long you must wait for. Our drivers wait all throughout business, taking control public transport or finding parking for your rental car.
          </p>

          <div className="features-list-hourly">
            {features.map((feature, index) => (
              <div key={index} className="feature-item-hourly">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Vehicle Classes Grid */}
          <div className="vehicle-classes-grid">
            {vehicleClasses.map((vehicle, index) => (
              <div key={index} className="vehicle-class-card">
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={vehicle.name} />
                </div>
                <h3>{vehicle.name}</h3>
                <p className="vehicle-models">{vehicle.vehicles.join(', ')}</p>
                <div className="vehicle-capacity">
                  <span><Users size={16} /> {vehicle.passengers}</span>
                  <span><Briefcase size={16} /> {vehicle.luggage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Stop Journeys */}
      <section className="multi-stop-section section">
        <div className="container">
          <h2 className="section-title">For all your multi-stop journeys</h2>
          <p className="section-description">
            Commuting, sightseeing, and flexible. Our hourly chauffeur service is ideal for Blacklane occasions where you need a chauffeur on standby or have several stops to make throughout the day.
          </p>

          <div className="journey-features-grid">
            {journeyFeatures.map((feature, index) => (
              <div key={index} className="journey-feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="global-reach-section section">
        <div className="container">
          <h2 className="section-title">Global reach</h2>
          <div className="global-map-container">
            <img src="/images/world-map.png" alt="Global Coverage" />
          </div>

          <div className="global-locations-grid">
            {globalLocations.map((location, index) => (
              <div key={index} className="location-card">
                <h3>{location.name}</h3>
                <p>{location.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-hourly-section section">
        <div className="container">
          <div className="faq-hourly-content">
            <div className="faq-hourly-list">
              <h2>FAQs</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-hourly-item">
                  <button 
                    className="faq-hourly-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`faq-hourly-icon ${openFaq === index ? 'open' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="faq-hourly-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faq-hourly-image">
              <img src="/images/woman-chauffeur-hourly.jpg" alt="Professional Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-app-section section">
        <div className="container">
          <div className="download-app-content">
            <div className="download-app-text">
              <h2>Download the app</h2>
              <p>Book your hourly chauffeur service on the go. Track all your movements with our useful, easy-to-use phone app. There is also an intuitive desktop booking interface for booking from your computer.</p>
              <div className="download-badges">
                <img src="/images/app-store.svg" alt="App Store" />
                <img src="/images/google-play.svg" alt="Google Play" />
              </div>
            </div>
            <div className="download-app-image">
              <img src="/images/mobile-apps.png" alt="Mobile Apps" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HourlyHirePage;
