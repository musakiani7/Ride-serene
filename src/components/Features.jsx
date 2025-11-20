import { Shield, Car, Leaf } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Shield size={40} />,
      title: 'Safety first',
      description: 'Your safety is our top priority. All chauffeurs are verified, licensed, and undergo thorough background checks.'
    },
    {
      icon: <Car size={40} />,
      title: 'Private travel solutions',
      description: 'Your one-stop travel shop for city-to-city rides, airport transfers, hourly hire, and chauffeur hailing.'
    },
    {
      icon: <Leaf size={40} />,
      title: 'Sustainable travel',
      description: 'All ride emissions are offset as part of our commitment to sustainable and responsible transportation.'
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

