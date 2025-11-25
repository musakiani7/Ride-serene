import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
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
          >
            <button 
              className="nav-link" 
              onClick={() => toggleDropdown('services')}
            >
              {t('header.ourServices')} <ChevronDown size={16} className={activeDropdown === 'services' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'services' && (
              <div className="dropdown">
                <Link to="/services/city-to-city" onClick={closeDropdown}>{t('services.cityToCity')}</Link>
                <Link to="/services/chauffeur-hailing" onClick={closeDropdown}>{t('services.chauffeurHailing')}</Link>
                <Link to="/services/airport-transfers" onClick={closeDropdown}>{t('services.airportTransfers')}</Link>
                <Link to="/services/hourly-hire" onClick={closeDropdown}>{t('services.hourlyHire')}</Link>
                <Link to="/services/chauffeur-services" onClick={closeDropdown}>{t('services.chauffeurServices')}</Link>
                <Link to="/services/limousine-services" onClick={closeDropdown}>{t('services.limousineServices')}</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item"
          >
            <button 
              className="nav-link"
              onClick={() => toggleDropdown('business')}
            >
              {t('header.forBusiness')} <ChevronDown size={16} className={activeDropdown === 'business' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'business' && (
              <div className="dropdown">
                <Link to="/business/overview" onClick={closeDropdown}>{t('businessMenu.overview')}</Link>
                <Link to="/business/corporate-accounts" onClick={closeDropdown}>{t('businessMenu.corporations')}</Link>
                <Link to="/business/travel-agencies" onClick={closeDropdown}>{t('businessMenu.travelAgencies')}</Link>
                <Link to="/business/strategic-partnerships" onClick={closeDropdown}>{t('businessMenu.strategicPartnerships')}</Link>
                <Link to="/business/events" onClick={closeDropdown}>{t('businessMenu.events')}</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item"
          >
            <button 
              className="nav-link"
              onClick={() => toggleDropdown('chauffeurs')}
            >
              {t('header.forChauffeurs')} <ChevronDown size={16} className={activeDropdown === 'chauffeurs' ? 'chevron-up' : ''} />
            </button>
            {activeDropdown === 'chauffeurs' && (
              <div className="dropdown">
                <Link to="/become-chauffeur" onClick={closeDropdown}>{t('footer.becomeAChauffeur')}</Link>
                <Link to="/chauffeur-login" onClick={closeDropdown}>{t('footer.chauffeurLogin')}</Link>
              </div>
            )}
          </div>

          <Link to="/help" className="nav-link">{t('header.help')}</Link>

          <Link to="/login" className="btn btn-outline sign-in-btn">
            <User size={18} />
            {t('header.signIn')}
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

