import { Shield, Car, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Features.css';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield size={40} />,
      title: t('features.safetyFirst.title'),
      description: t('features.safetyFirst.desc')
    },
    {
      icon: <Car size={40} />,
      title: t('features.privateTravel.title'),
      description: t('features.privateTravel.desc')
    },
    {
      icon: <Leaf size={40} />,
      title: t('features.sustainableTravel.title'),
      description: t('features.sustainableTravel.desc')
    }
  ];

  return (
    <section className="features section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

