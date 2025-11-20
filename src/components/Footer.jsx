import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">RIDESERENE</h3>
            <p className="footer-tagline">Luxury. Reliability. Serene.</p>
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
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press</Link>
              <Link to="/blog">Blog</Link>
            </div>

            <div className="footer-column">
              <h4>RideSerene for Business</h4>
              <Link to="/business">Business Overview</Link>
              <Link to="/business/corporate">Corporate Accounts</Link>
              <Link to="/business/enterprise">Enterprise</Link>
            </div>

            <div className="footer-column">
              <h4>Top Cities</h4>
              <Link to="/cities/new-york">New York</Link>
              <Link to="/cities/london">London</Link>
              <Link to="/cities/paris">Paris</Link>
              <Link to="/cities/dubai">Dubai</Link>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <Link to="/services">Our Services</Link>
              <Link to="/chauffeurs">For Chauffeurs</Link>
              <Link to="/sustainability">Sustainability</Link>
              <Link to="/contact">Contact</Link>
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

