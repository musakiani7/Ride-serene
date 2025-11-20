import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      setIsLoading(false);
      // Handle login logic here
    }, 1500);
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
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h1 className="login-title">Customer Login</h1>
              <p className="login-subtitle">Welcome back! Please login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group-login">
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

              <div className="form-group-login">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
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

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Login'
                )}
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19.8055 10.2292C19.8055 9.55056 19.7508 8.86709 19.6359 8.19788H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.825C18.7174 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                    <path d="M10.2002 20.0006C12.9515 20.0006 15.2694 19.1151 16.8304 17.5865L13.6079 15.0879C12.7065 15.6979 11.5518 16.0433 10.2056 16.0433C7.5461 16.0433 5.28897 14.2834 4.48894 11.9169H1.16699V14.4927C2.76846 17.6841 6.31949 20.0006 10.2002 20.0006Z" fill="#34A853"/>
                    <path d="M4.48366 11.9169C4.04462 10.6749 4.04462 9.33009 4.48366 8.08813V5.51233H1.16699C-0.2864 8.33798 -0.2864 11.667 1.16699 14.4927L4.48366 11.9169Z" fill="#FBBC04"/>
                    <path d="M10.2002 3.95805C11.6235 3.936 13.0014 4.47247 14.0395 5.45722L16.8891 2.60501C15.1801 0.990847 12.9296 0.0870667 10.2002 0.110994C6.31949 0.110994 2.76846 2.42736 1.16699 5.61882L4.48366 8.19462C5.27841 5.82282 7.54083 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="signup-link">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="login-features-section">
          <div className="features-content">
            <div className="features-header">
              <h2>Experience Luxury Travel</h2>
              <p>Join thousands of customers enjoying premium chauffeur services worldwide</p>
            </div>

            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-card-login">
                  <div className="feature-icon-login">{feature.icon}</div>
                  <div className="feature-text-login">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="stats-section">
              <div className="stat-item">
                <h3>1M+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <h3>300+</h3>
                <p>Cities Worldwide</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
