import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">RIDESERENE</h3>
            <p className="footer-tagline">{t('footer.tagline')}</p>
            <div className="footer-apps">
              <button className="app-button">
                <span>Download on the</span>
                <strong>App Store</strong>
              </button>
              <button className="app-button">
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </button>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>{t('footer.company')}</h4>
              <Link to="/about">{t('footer.aboutUs')}</Link>
              <Link to="/careers">{t('footer.careers')}</Link>
              <Link to="/press">{t('footer.press')}</Link>
              <Link to="/blog">{t('footer.blog')}</Link>
            </div>

            <div className="footer-column">
              <h4>{t('footer.rideSereneForBusiness')}</h4>
              <Link to="/business">{t('footer.businessOverview')}</Link>
              <Link to="/business/corporate">{t('footer.corporateAccounts')}</Link>
              <Link to="/business/enterprise">{t('footer.enterprise')}</Link>
            </div>

            <div className="footer-column">
              <h4>{t('footer.topCities')}</h4>
              <Link to="/cities/new-york">{t('footer.newYork')}</Link>
              <Link to="/cities/london">{t('footer.london')}</Link>
              <Link to="/cities/paris">{t('footer.paris')}</Link>
              <Link to="/cities/dubai">{t('footer.dubai')}</Link>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <Link to="/services">{t('header.ourServices')}</Link>
              <Link to="/become-chauffeur">{t('footer.becomeAChauffeur')}</Link>
              <Link to="/business-overview">{t('footer.businessOverview')}</Link>
              <Link to="/chauffeur-login">{t('footer.chauffeurLogin')}</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; {currentYear} RideSerene. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/legal">Legal Notice</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="LinkedIn" className="social-link">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="social-link">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="social-link">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

