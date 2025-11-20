import { useState } from 'react';
import { DollarSign, Calendar, Users, Headphones, FileText, Shield, ChevronDown } from 'lucide-react';
import './BecomeChauffeurPage.css';

const BecomeChauffeurPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Reliable payments',
      description: 'The amount shown will enable others to like communicate that will be transferred to your business. Rides booked immediately upon completion of the journey. Your local team. Monthly payments for your business account will be transferred to your bank account.'
    },
    {
      icon: <Calendar size={32} />,
      title: 'Complete schedule flexibility',
      description: 'Select your rides through our innovative analytic. Adjust your own schedule and commission whenever and wherever you want—days, work nights, take you will advance, location, and vehicle type. We don\'t require you to, choose business, hourly bookings. Say when you are.'
    },
    {
      icon: <Users size={32} />,
      title: 'Join an international crew',
      description: 'As a member of the Blacklane crew, you\'ll be able to pay and get the best of it! All of our standards, follow guidelines and rides for our partners and their guests in over 50 countries.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Superior account management',
      description: 'Whether you\'re a dispatcher assigning rides to your crew or an owner-operator on the go with active spare time, our app will make managing and charging more easier than ever before. Easily manage all your rides with a few taps or clicks.'
    },
    {
      icon: <Headphones size={32} />,
      title: 'Dedicated support team',
      description: 'Alongside our 24/7 Customer Care who help with navigating reporting rides, our Partner Support Team can assist 24/5 for onboarding, general inquiries and account needs. Plus, they are on your fingertips at our Partner Help Chatbot.'
    }
  ];

  const requirements = [
    'Professional chauffeur license and insurance for all chauffeurs and vehicles',
    'A minimum of three clean, undamaged, smoke-free, and in full compliance functioning sedans or SUVs',
    'Completion must have up-to-date with area standards and proficient and ensure vehicle quality'
  ];

  const onboardingSteps = [
    'Submit your application',
    'Upload your required documents',
    'Upload your documentation for the cars want to receive',
    'Complete the licensing checklist and follow up their assistance via support',
    'Accept your first ride!'
  ];

  const faqs = [
    {
      question: 'Can anyone become a Blacklane partner?',
      answer: 'To become a Blacklane partner, you need to have a professional chauffeur license, appropriate insurance, and meet our vehicle standards. We welcome both individual chauffeurs and fleet operators.'
    },
    {
      question: 'How many rides can I do with Blacklane per month?',
      answer: 'There is no limit to the number of rides you can accept. You have complete flexibility to set your own schedule and accept as many rides as you wish.'
    },
    {
      question: 'How do I get paid?',
      answer: 'Payments are processed monthly and transferred directly to your bank account. You\'ll receive detailed statements showing all completed rides and earnings.'
    },
    {
      question: 'Which vehicles can I use to work with Blacklane?',
      answer: 'We accept premium sedans and SUVs that are no more than 5 years old, well-maintained, smoke-free, and meet our quality standards. Popular models include Mercedes E-Class, BMW 5 Series, and similar vehicles.'
    },
    {
      question: 'How do I apply to partner with Blacklane?',
      answer: 'Click the "Apply now" button on this page to start your application. You\'ll need to provide your professional details, license information, and vehicle documentation.'
    },
    {
      question: 'Does Blacklane work with electric vehicles?',
      answer: 'Yes! We actively encourage our partners to use electric and hybrid vehicles as part of our commitment to sustainability.'
    }
  ];

  return (
    <div className="become-chauffeur-page">
      {/* Hero Section */}
      <section className="hero-chauffeur-section">
        <div className="hero-chauffeur-overlay"></div>
        <div className="hero-chauffeur-content">
          <div className="container">
            <div className="hero-chauffeur-text">
              <h1 className="hero-chauffeur-title">Become a Chauffeur Partner</h1>
              <button className="apply-now-btn-hero">Apply now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section section">
        <div className="container">
          <h2 className="section-title-chauffeur">Grow your business with Blacklane</h2>
          <p className="section-description-chauffeur">
            Blacklane's app and web-portal connect licensed and insured chauffeur partners with a global client base of sophisticated 
            business travelers and leisure travelers. You can add rides to your calendar as you could more sources your main source or relay less 
            on other sources. We are committed to supporting our chauffeurs with service quality standards, marketing, and technology that help 
            you cater to chauffeurs with ensuring exceptional service for guests.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial-section section">
        <div className="container">
          <div className="testimonial-box">
            <p className="testimonial-quote">
              "Blacklane is 60% of my revenue. I've grown from 2 to 20 chauffeurs and have 10 vehicles from working with them."
            </p>
            <p className="testimonial-author">Angel T., Blacklane chauffeur, Madrid</p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="benefits-section section">
        <div className="container">
          <div className="benefits-grid-chauffeur">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card-chauffeur">
                <div className="benefit-icon-chauffeur">{benefit.icon}</div>
                <h3 className="benefit-title-chauffeur">{benefit.title}</h3>
                <p className="benefit-description-chauffeur">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements-section section">
        <div className="container">
          <div className="requirements-content">
            <div className="requirements-image">
              <img src="/images/chauffeur-loading.jpg" alt="Professional Chauffeur" />
            </div>
            <div className="requirements-text">
              <h2 className="requirements-title">Requirements</h2>
              <p className="requirements-intro">
                To join our select network of professional chauffeurs and transport for all chauffeurs and vehicles:
              </p>
              <ul className="requirements-list">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              <p className="requirements-note">
                Note: Each city or country may have specific legal for your business there.
              </p>
              <button className="view-requirements-btn">View local requirements</button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="onboarding-section section">
        <div className="container">
          <div className="onboarding-content">
            <div className="onboarding-text">
              <h2 className="onboarding-title">Onboarding</h2>
              <ol className="onboarding-steps">
                {onboardingSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <button className="apply-btn-onboarding">Apply now</button>
            </div>
            <div className="onboarding-image">
              <img src="/images/chauffeur-car.jpg" alt="Chauffeur with Vehicle" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability-section section">
        <div className="container">
          <div className="sustainability-content">
            <div className="sustainability-image">
              <img src="/images/electric-vehicle.jpg" alt="Electric Vehicle" />
            </div>
            <div className="sustainability-text">
              <h2 className="sustainability-title">Driving a sustainable future</h2>
              <p className="sustainability-description">
                As pioneers of sustainable chauffeuring, we're committed to reducing travel's impact in all our cities, offering 
                moving toward making all of our cities electric. Our acquisition of business towards Blacklane chauffeur service 
                has been one of our first major sustainability commitments. Since 2018, Blacklane has increased the use of hybrid 
                and electric cars in our offering in Paris, some cities drive 24/7 in carbon offset and we're working on offsetting all 
                of our carbon emissions since the company founding in 2011.
              </p>
              <button className="learn-more-btn">Learn more</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-chauffeur-section section">
        <div className="container">
          <div className="faq-chauffeur-content">
            <div className="faq-chauffeur-list">
              <h2>Frequently asked questions</h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-chauffeur-item">
                  <button 
                    className="faq-chauffeur-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`faq-chauffeur-icon ${openFaq === index ? 'open' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="faq-chauffeur-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="faq-chauffeur-image">
              <img src="/images/woman-professional.jpg" alt="Professional Chauffeur" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-box">
            <p className="cta-text">Still have questions?</p>
            <p className="cta-subtext">Visit our Partner Help Center or check out our FAQs</p>
            <button className="learn-more-cta-btn">Learn more</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeChauffeurPage;
