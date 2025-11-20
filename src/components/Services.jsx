import { Link } from 'react-router-dom';
import { Car, Clock, Plane, MapPin } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <MapPin size={32} />,
      title: 'City-to-city rides',
      description: 'A stress-free solution for long-distance rides between cities with professional chauffeurs.',
      link: '/services/city-to-city'
    },
    {
      id: 2,
      icon: <Car size={32} />,
      title: 'Chauffeur hailing',
      description: 'Experience the quality of a traditional chauffeur service with the convenience of riding within minutes of booking.',
      link: '/services/chauffeur-hailing',
      badge: 'NEW'
    },
    {
      id: 3,
      icon: <Plane size={32} />,
      title: 'Airport transfers',
      description: 'Reliable airport transfers with additional wait time and flight tracking for a seamless travel experience.',
      link: '/services/airport-transfers'
    },
    {
      id: 4,
      icon: <Clock size={32} />,
      title: 'Hourly and full day hire',
      description: 'Total flexibility, reliability and comfort for your hourly or full-day transportation needs.',
      link: '/services/hourly-hire'
    }
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Our services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <div className="service-header">
                <h3 className="service-title">
                  {service.title}
                  {service.badge && <span className="badge">{service.badge}</span>}
                </h3>
              </div>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

