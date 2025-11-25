import { useState } from 'react';
import { DollarSign, Calendar, Users, Headphones, FileText, Shield, ChevronDown, X, Upload } from 'lucide-react';
import './BecomeChauffeurPage.css';

const BecomeChauffeurPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const [formData, setFormData] = useState({
    country: '',
    city: '',
    countryCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    requirementsAccepted: false,
    profilePicture: null,
    driverLicense: null,
    identityCard: null,
    vehicle: {
      model: '',
      year: '',
      color: '',
      registrationNumber: '',
      registrationCertificate: null,
      insuranceCertificate: null,
      vehiclePhoto: null,
    },
    company: {
      commercialRegistration: null,
      fleetInsuranceAgreement: null,
      vatRegistrationCertificate: null,
      operatingPermit: null,
    }
  });

  const approvedVehicles = [
    'Ford Expedition',
    'Mercedes-Benz Vito',
    'Mercedes-Benz EQE',
    'Land Rover Range Rover',
    'Mercedes-Benz GLE',
    'Genesis G90',
    'Mercedes-Benz E-Class',
    'BMW 5 series',
    'Audi A8',
    'Mercedes-Benz GLS',
    'Cadillac Escalade',
    'Chevrolet Tahoe',
    'Chevrolet Suburban',
    'BMW 7 series',
    'Mercedes-Benz EQV',
    'BMW i7',
    'Lucid Air',
    'GMC Yukon XL',
    'Audi A6',
    'Mercedes-Benz EQS',
    'Mercedes-Benz S-Class',
    'BMW i5',
    'GMC Yukon Denali',
    'Mercedes-Benz V-Class',
  ];

  const countries = [
    { name: 'United States', code: '+1' },
    { name: 'Canada', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Australia', code: '+61' },
    { name: 'Germany', code: '+49' },
    { name: 'France', code: '+33' },
    { name: 'Spain', code: '+34' },
    { name: 'Italy', code: '+39' },
    { name: 'Japan', code: '+81' },
    { name: 'China', code: '+86' },
    { name: 'India', code: '+91' },
    { name: 'Mexico', code: '+52' },
    { name: 'Brazil', code: '+55' },
    { name: 'Singapore', code: '+65' },
    { name: 'Hong Kong', code: '+852' },
    { name: 'Thailand', code: '+66' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Philippines', code: '+63' },
    { name: 'South Korea', code: '+82' },
    { name: 'Vietnam', code: '+84' },
    { name: 'UAE', code: '+971' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Qatar', code: '+974' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Oman', code: '+968' },
    { name: 'Egypt', code: '+20' },
    { name: 'South Africa', code: '+27' },
    { name: 'Turkey', code: '+90' },
    { name: 'Switzerland', code: '+41' },
    { name: 'Netherlands', code: '+31' },
    { name: 'Belgium', code: '+32' },
    { name: 'Sweden', code: '+46' },
    { name: 'Norway', code: '+47' },
    { name: 'Denmark', code: '+45' },
    { name: 'Poland', code: '+48' },
    { name: 'Greece', code: '+30' },
    { name: 'Portugal', code: '+351' },
    { name: 'Ireland', code: '+353' },
    { name: 'New Zealand', code: '+64' },
  ];

  const cities = {
    'United States': [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
      'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Miami',
      'Atlanta', 'Denver', 'Boston', 'Seattle', 'Washington DC', 'Las Vegas'
    ],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
    'United Kingdom': [
      'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool',
      'Bristol', 'Edinburgh', 'Cardiff', 'Belfast'
    ],
    'Australia': [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast'
    ],
    'Germany': [
      'Berlin', 'Munich', 'Cologne', 'Hamburg', 'Frankfurt', 'Düsseldorf',
      'Stuttgart', 'Dortmund', 'Essen', 'Dresden'
    ],
    'France': [
      'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
      'Montpellier', 'Bordeaux', 'Lille'
    ],
    'Spain': [
      'Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Málaga',
      'Murcia', 'Palma', 'Las Palmas', 'Alicante'
    ],
    'Italy': [
      'Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna',
      'Florence', 'Bari', 'Venice'
    ],
    'Japan': [
      'Tokyo', 'Yokohama', 'Osaka', 'Kyoto', 'Kobe', 'Sapporo', 'Fukuoka',
      'Kawasaki', 'Saitama', 'Nagoya'
    ],
    'China': [
      'Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou',
      'Chongqing', 'Xi\'an', 'Nanjing', 'Wuhan'
    ],
    'India': [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
      'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
    ],
    'Mexico': [
      'Mexico City', 'Guadalajara', 'Monterrey', 'Cancún', 'Playa del Carmen',
      'Acapulco', 'Puerto Vallarta', 'Los Cabos', 'Mazatlán', 'Mérida'
    ],
    'Brazil': [
      'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza',
      'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'
    ],
    'Singapore': ['Singapore'],
    'Hong Kong': ['Hong Kong'],
    'Thailand': [
      'Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi', 'Samui',
      'Hua Hin', 'Rayong', 'Ubon Ratchathani', 'Hat Yai'
    ],
    'Malaysia': [
      'Kuala Lumpur', 'Penang', 'Johor Bahru', 'Ipoh', 'Kuching', 'Kota Kinabalu',
      'Shah Alam', 'Putrajaya', 'Selangor', 'Klang'
    ],
    'Indonesia': [
      'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar',
      'Palembang', 'Tangerang', 'Depok', 'Bali'
    ],
    'Philippines': [
      'Manila', 'Cebu', 'Davao', 'Quezon City', 'Caloocan', 'Las Piñas',
      'Makati', 'Pasig', 'Boracay', 'Subic'
    ],
    'South Korea': [
      'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju',
      'Ulsan', 'Goyang', 'Yongin', 'Suwon'
    ],
    'Vietnam': [
      'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho',
      'Hue', 'Nha Trang', 'Da Lat', 'Quang Ninh', 'Vung Tau'
    ],
    'UAE': [
      'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah',
      'Fujairah', 'Umm Al Quwain', 'Al Ain'
    ],
    'Saudi Arabia': [
      'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar',
      'Abha', 'Taif', 'Tabuk', 'Al Khobar'
    ],
    'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor'],
    'Bahrain': ['Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'Isa Town'],
    'Kuwait': ['Kuwait City', 'Salmiya', 'Hawalli', 'Al Farwaniyah', 'Jabriya'],
    'Oman': ['Muscat', 'Salalah', 'Nizwa', 'Sohar', 'Ibra'],
    'Egypt': [
      'Cairo', 'Alexandria', 'Giza', 'Shubra El-Khema', 'Damnhur',
      'Port Said', 'Suez', 'Luxor', 'Aswan', 'Hurghada'
    ],
    'South Africa': [
      'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth',
      'Bloemfontein', 'Pietermaritzburg', 'Polokwane', 'East London', 'Kimberley'
    ],
    'Turkey': [
      'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Konya',
      'Gaziantep', 'Adana', 'Diyarbakır', 'Kayseri'
    ],
    'Switzerland': [
      'Zurich', 'Geneva', 'Bern', 'Basel', 'Lucerne', 'St. Gallen',
      'Lausanne', 'Biel', 'Winterthur', 'Lugano'
    ],
    'Netherlands': [
      'Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven',
      'Groningen', 'Arnhem', 'Haarlem', 'Almere', 'Breda'
    ],
    'Belgium': [
      'Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Bruges', 'Liège',
      'Namur', 'Leuven', 'Mons', 'Tournai'
    ],
    'Sweden': [
      'Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås',
      'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'
    ],
    'Norway': [
      'Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Fredrikstad',
      'Drammen', 'Porsgrunn', 'Tromsø', 'Kristiansand', 'Lillehammer'
    ],
    'Denmark': [
      'Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg',
      'Randers', 'Kolding', 'Horsens', 'Vejle', 'Herning'
    ],
    'Poland': [
      'Warsaw', 'Krakow', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin',
      'Łódź', 'Bydgoszcz', 'Lublin', 'Katowice'
    ],
    'Greece': [
      'Athens', 'Thessaloniki', 'Patras', 'Iraklion', 'Larissa',
      'Volos', 'Mytilene', 'Rhodes', 'Corfu', 'Kalamata'
    ],
    'Portugal': [
      'Lisbon', 'Porto', 'Braga', 'Covilhã', 'Setúbal', 'Almada',
      'Oeiras', 'Amadora', 'Funchal', 'Ponta Delgada'
    ],
    'Ireland': [
      'Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford',
      'Drogheda', 'Dundalk', 'Tralee', 'Navan', 'Athlone'
    ],
    'New Zealand': [
      'Auckland', 'Wellington', 'Christchurch', 'Queenstown', 'Dunedin',
      'Hamilton', 'Tauranga', 'Whangarei', 'Rotorua', 'Napier'
    ],
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name.includes('.')) {
          const [parent, child] = name.split('.');
          setFormData(prev => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: reader.result
            }
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [name]: reader.result
          }));
        }
        // Mark file as uploaded
        setUploadedFiles(prev => ({
          ...prev,
          [name]: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.country || !formData.city) {
        alert('Please select country and city');
        return;
      }
    } else if (step === 2) {
      if (!formData.requirementsAccepted) {
        alert('Please accept the requirements');
        return;
      }
    } else if (step === 3) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
        alert('Please fill in all personal details');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    } else if (step === 4) {
      if (!formData.vehicle.model || !formData.vehicle.year || !formData.vehicle.color || !formData.vehicle.registrationNumber) {
        alert('Please fill in all vehicle details');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all documents are uploaded
    if (!formData.profilePicture) {
      alert('Please upload profile picture');
      return;
    }
    if (!formData.driverLicense) {
      alert('Please upload driver license');
      return;
    }
    if (!formData.identityCard) {
      alert('Please upload identity card');
      return;
    }
    if (!formData.vehicle.registrationCertificate) {
      alert('Please upload vehicle registration certificate');
      return;
    }
    if (!formData.vehicle.insuranceCertificate) {
      alert('Please upload vehicle insurance certificate');
      return;
    }
    if (!formData.vehicle.vehiclePhoto) {
      alert('Please upload vehicle photo');
      return;
    }
    if (!formData.company.commercialRegistration) {
      alert('Please upload commercial registration');
      return;
    }
    if (!formData.company.fleetInsuranceAgreement) {
      alert('Please upload fleet insurance agreement');
      return;
    }
    if (!formData.company.vatRegistrationCertificate) {
      alert('Please upload VAT registration certificate');
      return;
    }
    if (!formData.company.operatingPermit) {
      alert('Please upload operating permit');
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        countryCode: countries.find(c => c.name === formData.country)?.code,
        country: formData.country,
        city: formData.city,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        requirementsAccepted: formData.requirementsAccepted,
        profilePicture: formData.profilePicture,
        driverLicense: formData.driverLicense,
        identityCard: formData.identityCard,
        vehicle: formData.vehicle,
        company: formData.company,
      };

      const res = await fetch(`${API_BASE}/api/chauffeur/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        alert(data.message || 'Registration failed');
        console.error('Registration error:', data);
        return;
      }

      setIsLoading(false);
      alert('Registration submitted successfully! Pending admin approval.');
      
      if (data.token) {
        localStorage.setItem('chauffeurToken', data.token);
      }
      
      setShowRegistration(false);
      setStep(1);
      setUploadedFiles({});
      setFormData({
        country: '',
        city: '',
        countryCode: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        requirementsAccepted: false,
        profilePicture: null,
        driverLicense: null,
        identityCard: null,
        vehicle: { model: '', year: '', color: '', registrationNumber: '', registrationCertificate: null, insuranceCertificate: null, vehiclePhoto: null },
        company: { commercialRegistration: null, fleetInsuranceAgreement: null, vatRegistrationCertificate: null, operatingPermit: null },
      });
    } catch (err) {
      console.error('Registration error:', err);
      setIsLoading(false);
      alert('Network error: ' + err.message);
    }
  };

  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Reliable payments',
      description: 'The amount shown will enable others to like communicate that will be transferred to your business. Rides booked immediately upon completion of the journey. Your local team. Monthly payments for your business account will be transferred to your bank account.'
    },
    {
      icon: <Calendar size={32} />,
      title: 'Complete schedule flexibility',
      description: 'Select your rides through our innovative analytic. Adjust your own schedule and commission whenever and wherever you want—days, work nights, take you will advance, location, and vehicle type. We don\'t require you to, choose business, hourly bookings. Say when you are.'
    },
    {
      icon: <Users size={32} />,
      title: 'Join an international crew',
      description: 'As a member of the Blacklane crew, you\'ll be able to pay and get the best of it! All of our standards, follow guidelines and rides for our partners and their guests in over 50 countries.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Superior account management',
      description: 'Whether you\'re a dispatcher assigning rides to your crew or an owner-operator on the go with active spare time, our app will make managing and charging more easier than ever before. Easily manage all your rides with a few taps or clicks.'
    },
    {
      icon: <Headphones size={32} />,
      title: 'Dedicated support team',
      description: 'Alongside our 24/7 Customer Care who help with navigating reporting rides, our Partner Support Team can assist 24/5 for onboarding, general inquiries and account needs. Plus, they are on your fingertips at our Partner Help Chatbot.'
    }
  ];

  const requirements = [
    'Professional chauffeur license and insurance for all chauffeurs and vehicles',
    'A minimum of three clean, undamaged, smoke-free, and in full compliance functioning sedans or SUVs',
    'Completion must have up-to-date with area standards and proficient and ensure vehicle quality'
  ];

  const onboardingSteps = [
    'Submit your application',
    'Upload your required documents',
    'Upload your documentation for the cars want to receive',
    'Complete the licensing checklist and follow up their assistance via support',
    'Accept your first ride!'
  ];

  const faqs = [
    {
      question: 'Can anyone become a Blacklane partner?',
      answer: 'To become a Blacklane partner, you need to have a professional chauffeur license, appropriate insurance, and meet our vehicle standards. We welcome both individual chauffeurs and fleet operators.'
    },
    {
      question: 'How many rides can I do with Blacklane per month?',
      answer: 'There is no limit to the number of rides you can accept. You have complete flexibility to set your own schedule and accept as many rides as you wish.'
    },
    {
      question: 'How do I get paid?',
      answer: 'Payments are processed monthly and transferred directly to your bank account. You\'ll receive detailed statements showing all completed rides and earnings.'
    },
    {
      question: 'Which vehicles can I use to work with Blacklane?',
      answer: 'We accept premium sedans and SUVs that are no more than 5 years old, well-maintained, smoke-free, and meet our quality standards. Popular models include Mercedes E-Class, BMW 5 Series, and similar vehicles.'
    },
    {
      question: 'How do I apply to partner with Blacklane?',
      answer: 'Click the "Apply now" button on this page to start your application. You\'ll need to provide your professional details, license information, and vehicle documentation.'
    },
    {
      question: 'Does Blacklane work with electric vehicles?',
      answer: 'Yes! We actively encourage our partners to use electric and hybrid vehicles as part of our commitment to sustainability.'
    }
  ];

  return (
    <div className="become-chauffeur-page">
      {/* Hero Section */}
      <section className="hero-chauffeur-section">
        <div className="hero-chauffeur-overlay"></div>
        <div className="hero-chauffeur-content">
          <div className="container">
            <div className="hero-chauffeur-text">
              <h1 className="hero-chauffeur-title">Become a Chauffeur Partner</h1>
              <button className="apply-now-btn-hero" onClick={() => setShowRegistration(true)}>Apply now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Step Registration Modal */}
      {showRegistration && (
        <div className="registration-modal-overlay">
          <div className="registration-modal">
            <button className="modal-close-btn" onClick={() => setShowRegistration(false)}>
              <X size={24} />
            </button>

            <div className="registration-header">
              <h2 className="registration-title">BLACKLANE PARTNER</h2>
              <h3 className="registration-subtitle">Register</h3>
            </div>

            {/* Step 1: Country & City Selection */}
            {step === 1 && (
              <form className="registration-form">
                <div className="form-group">
                  <label>Select Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">-- Select Country --</option>
                    {countries.map(c => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-select"
                    disabled={!formData.country}
                  >
                    <option value="">-- Select City --</option>
                    {formData.country && cities[formData.country]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="btn-next"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </form>
            )}

            {/* Step 2: Requirements Acceptance */}
            {step === 2 && (
              <form className="registration-form">
                <div className="requirements-box">
                  <h4>Requirements to Drive with Blacklane</h4>
                  <ul className="requirements-list">
                    <li>Valid driver's license (minimum 3 years driving experience)</li>
                    <li>Professional vehicle (maximum 4 years old)</li>
                    <li>Vehicle insurance certificate</li>
                    <li>Commercial registration documents</li>
                    <li>Fluent English communication skills</li>
                    <li>Clean driving record</li>
                  </ul>
                </div>

                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    name="requirementsAccepted"
                    checked={formData.requirementsAccepted}
                    onChange={handleInputChange}
                    id="requirements-checkbox"
                  />
                  <label htmlFor="requirements-checkbox">I confirm I meet all requirements</label>
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="btn-back"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-next"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <form className="registration-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="phone-input-group">
                    <span className="country-code">
                      {countries.find(c => c.name === formData.country)?.code || '+966'}
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Create password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Profile Picture</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Profile Photo</span>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      accept="image/*"
                      hidden
                    />
                  </label>
                  {uploadedFiles['profilePicture'] && (
                    <div className="uploaded-file-info">{uploadedFiles['profilePicture']}</div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Driver License</label>
                    <label className="file-upload-label">
                      <Upload size={20} />
                      <span>Upload License</span>
                      <input
                        type="file"
                        name="driverLicense"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        hidden
                      />
                    </label>
                    {uploadedFiles['driverLicense'] && (
                      <div className="uploaded-file-info">{uploadedFiles['driverLicense']}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Identity Card</label>
                    <label className="file-upload-label">
                      <Upload size={20} />
                      <span>Upload ID</span>
                      <input
                        type="file"
                        name="identityCard"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        hidden
                      />
                    </label>
                    {uploadedFiles['identityCard'] && (
                      <div className="uploaded-file-info">{uploadedFiles['identityCard']}</div>
                    )}
                  </div>
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="btn-back"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-next"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Vehicle Information */}
            {step === 4 && (
              <form className="registration-form">
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <select
                    name="vehicle.model"
                    value={formData.vehicle.model}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">-- Select Vehicle --</option>
                    {approvedVehicles.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Year</label>
                    <input
                      type="number"
                      name="vehicle.year"
                      value={formData.vehicle.year}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., 2023"
                      min={new Date().getFullYear() - 4}
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vehicle Color</label>
                    <select
                      name="vehicle.color"
                      value={formData.vehicle.color}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">-- Select Color --</option>
                      <option value="Black">Black</option>
                      <option value="Silver">Silver</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    name="vehicle.registrationNumber"
                    value={formData.vehicle.registrationNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter registration number"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Registration Certificate</label>
                    <label className="file-upload-label">
                      <Upload size={20} />
                      <span>Upload Certificate</span>
                      <input
                        type="file"
                        name="vehicle.registrationCertificate"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        hidden
                      />
                    </label>
                    {uploadedFiles['vehicle.registrationCertificate'] && (
                      <div className="uploaded-file-info">{uploadedFiles['vehicle.registrationCertificate']}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Insurance Certificate</label>
                    <label className="file-upload-label">
                      <Upload size={20} />
                      <span>Upload Insurance</span>
                      <input
                        type="file"
                        name="vehicle.insuranceCertificate"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        hidden
                      />
                    </label>
                    {uploadedFiles['vehicle.insuranceCertificate'] && (
                      <div className="uploaded-file-info">{uploadedFiles['vehicle.insuranceCertificate']}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Vehicle Photo</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Vehicle Photo</span>
                    <input
                      type="file"
                      name="vehicle.vehiclePhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      hidden
                    />
                  </label>
                  {uploadedFiles['vehicle.vehiclePhoto'] && (
                    <div className="uploaded-file-info">{uploadedFiles['vehicle.vehiclePhoto']}</div>
                  )}
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="btn-back"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-next"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Step 5: Company Documents */}
            {step === 5 && (
              <form className="registration-form" onSubmit={handleSubmit}>
                <h4 className="step-subtitle">Company Documents</h4>
                <p className="step-description">Please upload all required company documentation</p>

                <div className="form-group">
                  <label>Commercial Registration</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      name="company.commercialRegistration"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      hidden
                    />
                  </label>
                  {uploadedFiles['company.commercialRegistration'] && (
                    <div className="uploaded-file-info">{uploadedFiles['company.commercialRegistration']}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Fleet Insurance Agreement</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      name="company.fleetInsuranceAgreement"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      hidden
                    />
                  </label>
                  {uploadedFiles['company.fleetInsuranceAgreement'] && (
                    <div className="uploaded-file-info">{uploadedFiles['company.fleetInsuranceAgreement']}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>VAT Registration Certificate</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      name="company.vatRegistrationCertificate"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      hidden
                    />
                  </label>
                  {uploadedFiles['company.vatRegistrationCertificate'] && (
                    <div className="uploaded-file-info">{uploadedFiles['company.vatRegistrationCertificate']}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Operating Permit</label>
                  <label className="file-upload-label">
                    <Upload size={20} />
                    <span>Upload Document</span>
                    <input
                      type="file"
                      name="company.operatingPermit"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      hidden
                    />
                  </label>
                  {uploadedFiles['company.operatingPermit'] && (
                    <div className="uploaded-file-info">{uploadedFiles['company.operatingPermit']}</div>
                  )}
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="btn-back"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>

                <p className="login-link">
                  Already have an account? <a href="/chauffeur-login">Sign in</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Intro Section */}
      <section className="intro-section section">
        <div className="container">
          <h2 className="section-title-chauffeur">Grow your business with Blacklane</h2>
          <p className="section-description-chauffeur">
            Blacklane's app and web-portal connect licensed and insured chauffeur partners with a global client base of sophisticated 
            business travelers and leisure travelers. You can add rides to your calendar as you could more sources your main source or relay less 
            on other sources. We are committed to supporting our chauffeurs with service quality standards, marketing, and technology that help 
            you cater to chauffeurs with ensuring exceptional service for guests.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section section">
        <div className="container">
          <div className="testimonial-box">
            <p className="testimonial-quote">
              "Blacklane is 60% of my revenue. I've grown from 2 to 20 chauffeurs and have 10 vehicles from working with them."
            </p>
            <p className="testimonial-author">Angel T., Blacklane chauffeur, Madrid</p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-section section">
        <div className="container">
          <div className="benefits-grid-chauffeur">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card-chauffeur">
                <div className="benefit-icon-chauffeur">{benefit.icon}</div>
                <h3 className="benefit-title-chauffeur">{benefit.title}</h3>
                <p className="benefit-description-chauffeur">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements-section section">
        <div className="container">
          <div className="requirements-content">
            <div className="requirements-image">
              <img src="/images/chauffeur-loading.jpg" alt="Professional Chauffeur" />
            </div>
            <div className="requirements-text">
              <h2 className="requirements-title">Requirements</h2>
              <p className="requirements-intro">
                To join our select network of professional chauffeurs and transport for all chauffeurs and vehicles:
              </p>
              <ul className="requirements-list">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <p className="requirements-note">
                Note: Each city or country may have specific legal for your business there.
              </p>
              <button className="view-requirements-btn">View local requirements</button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="onboarding-section section">
        <div className="container">
          <div className="onboarding-content">
            <div className="onboarding-text">
              <h2 className="onboarding-title">Onboarding</h2>
              <ol className="onboarding-steps">
                {onboardingSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <button className="apply-btn-onboarding">Apply now</button>
            </div>
            <div className="onboarding-image">
              <img src="/images/chauffeur-car.jpg" alt="Chauffeur with Vehicle" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability-section section">
        <div className="container">
          <div className="sustainability-content">
            <div className="sustainability-image">
              <img src="/images/electric-vehicle.jpg" alt="Electric Vehicle" />
            </div>
            <div className="sustainability-text">
              <h2 className="sustainability-title">Driving a sustainable future</h2>
              <p className="sustainability-description">
                As pioneers of sustainable chauffeuring, we're committed to reducing travel's impact in all our cities, offering 
                moving toward making all of our cities electric. Our acquisition of business towards Blacklane chauffeur service 
                has been one of our first major sustainability commitments. Since 2018, Blacklane has increased the use of hybrid 
                and electric cars in our offering in Paris, some cities drive 24/7 in carbon offset and we're working on offsetting all 
                of our carbon emissions since the company founding in 2011.
              </p>
              <button className="learn-more-btn">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-chauffeur-section section">
        <div className="container">
          <div className="faq-chauffeur-content">
            <div className="faq-chauffeur-list">
              <h2>Frequently asked questions</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-chauffeur-item">
                  <button 
                    className="faq-chauffeur-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`faq-chauffeur-icon ${openFaq === index ? 'open' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="faq-chauffeur-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faq-chauffeur-image">
              <img src="/images/woman-professional.jpg" alt="Professional Chauffeur" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-box">
            <p className="cta-text">Still have questions?</p>
            <p className="cta-subtext">Visit our Partner Help Center or check out our FAQs</p>
            <button className="learn-more-cta-btn">Learn more</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeChauffeurPage;
