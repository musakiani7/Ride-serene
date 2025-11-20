import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="logo">
            <span className="logo-text">RIDESERENE</span>
          </Link>
          <p className="tagline">The premium chauffeur marketplace</p>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div 
            className="nav-item"
            onMouseEnter={() => handleMouseEnter('services')}
          >
            <button 
              className="nav-link" 
              onClick={() => toggleDropdown('services')}
            >
              Our services <ChevronDown size={16} className={activeDropdown === 'services' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'services' && (
              <div className="dropdown">
                <Link to="/services/city-to-city" onClick={closeDropdown}>City-to-City Rides</Link>
                <Link to="/services/chauffeur-hailing" onClick={closeDropdown}>Chauffeur Hailing</Link>
                <Link to="/services/airport-transfers" onClick={closeDropdown}>Airport Transfers</Link>
                <Link to="/services/hourly-hire" onClick={closeDropdown}>Hourly & Full Day Hire</Link>
                <Link to="/services/chauffeur-services" onClick={closeDropdown}>Chauffeur Services</Link>
                <Link to="/services/limousine-services" onClick={closeDropdown}>Limousine Services</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item"
            onMouseEnter={() => handleMouseEnter('business')}
          >
            <button 
              className="nav-link"
              onClick={() => toggleDropdown('business')}
            >
              For business <ChevronDown size={16} className={activeDropdown === 'business' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'business' && (
              <div className="dropdown">
                <Link to="/business/overview" onClick={closeDropdown}>Overview</Link>
                <Link to="/business/corporate-accounts" onClick={closeDropdown}>Corporations</Link>
                <Link to="/business/travel-agencies" onClick={closeDropdown}>Travel Agencies</Link>
                <Link to="/business/strategic-partnerships" onClick={closeDropdown}>Strategic Partnerships</Link>
                <Link to="/business/events" onClick={closeDropdown}>Events</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item"
            onMouseEnter={() => handleMouseEnter('chauffeurs')}
          >
            <button 
              className="nav-link"
              onClick={() => toggleDropdown('chauffeurs')}
            >
              For chauffeurs <ChevronDown size={16} className={activeDropdown === 'chauffeurs' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'chauffeurs' && (
              <div className="dropdown">
                <Link to="/become-chauffeur" onClick={closeDropdown}>Become a Chauffeur</Link>
                <Link to="/chauffeur-login" onClick={closeDropdown}>Chauffeur Login</Link>
              </div>
            )}
          </div>

          <Link to="/help" className="nav-link" onMouseEnter={closeDropdown}>Help</Link>

          <div 
            className="nav-item"
            onMouseEnter={() => handleMouseEnter('language')}
          >
            <button 
              className="nav-link"
              onClick={() => toggleDropdown('language')}
            >
              English <ChevronDown size={16} className={activeDropdown === 'language' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'language' && (
              <div className="dropdown">
                <button onClick={closeDropdown}>English</button>
                <button onClick={closeDropdown}>Español</button>
                <button onClick={closeDropdown}>Français</button>
                <button onClick={closeDropdown}>Deutsch</button>
              </div>
            )}
          </div>

          <Link to="/login" className="btn btn-outline sign-in-btn">
            <User size={18} />
            Sign in
          </Link>
        </nav>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;

