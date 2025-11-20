import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, Clock, MapPin, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt:', formData);
      setIsLoading(false);
      // Handle signup logic here
    }, 1500);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Handle social signup logic here
  };

  const features = [
    {
      icon: <MapPin size={32} />,
      title: 'Book Premium Rides',
      description: 'Access luxury chauffeur services worldwide'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: <Clock size={32} />,
      title: '24/7 Availability',
      description: 'Book rides anytime, anywhere in the world'
    }
  ];

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Signup Form */}
        <div className="signup-form-section">
          <div className="signup-form-wrapper">
            <div className="signup-header">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Sign up to start booking premium rides</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-row-signup">
                <div className="form-group-signup">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group-signup">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-signup">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group-signup">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={20} className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group-signup">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group-signup">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>I agree to the <Link to="/terms" className="link-text">Terms & Conditions</Link> and <Link to="/privacy" className="link-text">Privacy Policy</Link></span>
                </label>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="divider">
                <span>Or sign up with</span>
              </div>

              <div className="social-buttons">
                <button 
                  type="button" 
                  className="social-btn google-btn"
                  onClick={() => handleSocialSignup('Google')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  type="button" 
                  className="social-btn apple-btn"
                  onClick={() => handleSocialSignup('Apple')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <p className="signup-footer">
                Already have an account? <Link to="/login" className="link-text">Sign in</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="signup-features-section">
          <div className="features-content">
            <h2 className="features-title">Join Premium Chauffeur Service</h2>
            <p className="features-description">
              Experience luxury travel with professional chauffeurs worldwide
            </p>
            
            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
