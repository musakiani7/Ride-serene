import { Link } from 'react-router-dom';
import { Car, Clock, Plane, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      icon: <MapPin size={32} />,
      title: t('servicesSection.cityToCity.title'),
      description: t('servicesSection.cityToCity.desc'),
      link: '/services/city-to-city'
    },
    {
      id: 2,
      icon: <Car size={32} />,
      title: t('servicesSection.chauffeurHailing.title'),
      description: t('servicesSection.chauffeurHailing.desc'),
      link: '/services/chauffeur-hailing',
      badge: t('servicesSection.newBadge')
    },
    {
      id: 3,
      icon: <Plane size={32} />,
      title: t('servicesSection.airportTransfers.title'),
      description: t('servicesSection.airportTransfers.desc'),
      link: '/services/airport-transfers'
    },
    {
      id: 4,
      icon: <Clock size={32} />,
      title: t('servicesSection.hourlyHire.title'),
      description: t('servicesSection.hourlyHire.desc'),
      link: '/services/hourly-hire'
    }
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">{t('servicesSection.title')}</h2>
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
                {t('common.learnMore')} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

