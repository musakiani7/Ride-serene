import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Info, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AutocompleteInput from './AutocompleteInput';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const [rideType, setRideType] = useState('one-way');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    duration: '2' // Duration in hours for "By the hour"
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.from) {
      alert('Please enter a pickup location (From).');
      return;
    }
    if (rideType === 'one-way' && !formData.to) {
      alert('Please enter a destination (To).');
      return;
    }

    // Build query string
    const params = new URLSearchParams();
    params.set('rideType', rideType);
    params.set('from', formData.from);
    if (rideType === 'one-way') params.set('to', formData.to);
    if (formData.date) params.set('date', formData.date);
    if (formData.time) params.set('time', formData.time);
    if (rideType === 'by-hour') params.set('duration', formData.duration);

    navigate(`/search?${params.toString()}`);
  };

  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  const defaultDate = formData.date || today;

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-image-overlay">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
        </div>
      </div>
      
      <div className="hero-container">
        <div className="booking-form-card">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="ride-type-cards">
                <button
                  type="button"
                  className={`ride-type-card ${rideType === 'one-way' ? 'active' : ''}`}
                  onClick={() => setRideType('one-way')}
                >
                  <div className="card-content">
                    <ArrowRight size={24} />
                    <span>{t('hero.oneWay')}</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`ride-type-card ${rideType === 'by-hour' ? 'active' : ''}`}
                  onClick={() => setRideType('by-hour')}
                >
                  <div className="card-content">
                    <Clock size={24} />
                    <span>{t('hero.byTheHour')}</span>
                  </div>
                </button>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="from">
                    <MapPin size={18} />
                    {t('common.from')}
                  </label>
                  <AutocompleteInput
                    id="from"
                    name="from"
                    placeholder={t('hero.pickupLocation')}
                    value={formData.from}
                    onChange={handleInputChange}
                    returnPlaceDetails={true}
                    onSelect={({ prediction, details }) => {
                      // store place id and coordinates when available
                      setFormData((prev) => ({
                        ...prev,
                        from: (details && details.formatted_address) || (prediction && prediction.description) || prev.from,
                        fromPlaceId: prediction?.place_id || prev.fromPlaceId,
                        fromLat: details && details.geometry && details.geometry.location ? details.geometry.location.lat() : prev.fromLat,
                        fromLng: details && details.geometry && details.geometry.location ? details.geometry.location.lng() : prev.fromLng,
                      }));
                    }}
                  />
                </div>

                {rideType === 'one-way' && (
                  <div className="form-group">
                    <label htmlFor="to">
                      <MapPin size={18} />
                      {t('common.to')}
                    </label>
                    <AutocompleteInput
                      id="to"
                      name="to"
                      placeholder={t('hero.pickupLocation')}
                      value={formData.to}
                      onChange={handleInputChange}
                      returnPlaceDetails={true}
                      onSelect={({ prediction, details }) => {
                        setFormData((prev) => ({
                          ...prev,
                          to: (details && details.formatted_address) || (prediction && prediction.description) || prev.to,
                          toPlaceId: prediction?.place_id || prev.toPlaceId,
                          toLat: details && details.geometry && details.geometry.location ? details.geometry.location.lat() : prev.toLat,
                          toLng: details && details.geometry && details.geometry.location ? details.geometry.location.lng() : prev.toLng,
                        }));
                      }}
                    />
                  </div>
                )}

                {rideType === 'by-hour' && (
                  <div className="form-group">
                    <label htmlFor="duration">
                      <Clock size={18} />
                      {t('common.duration')}
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="1">1 {t('common.hours')}</option>
                      <option value="2">2 {t('common.hours')}</option>
                      <option value="3">3 {t('common.hours')}</option>
                      <option value="4">4 {t('common.hours')}</option>
                      <option value="5">5 {t('common.hours')}</option>
                      <option value="6">6 {t('common.hours')}</option>
                      <option value="8">8 {t('common.hours')}</option>
                      <option value="12">12 {t('common.hours')}</option>
                      <option value="24">24 {t('common.hours')}</option>
                    </select>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">
                      <Calendar size={18} />
                      {t('common.date')}
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date || today}
                      onChange={handleInputChange}
                      min={today}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">
                      <Clock size={18} />
                      {t('common.time')}
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Live preview of selected locations */}
              <div className="location-preview" style={{margin: '10px 0', padding: '8px 12px', background: '#f7f7f7', borderRadius: 6}}>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap'}}>
                  <div><strong>{t('common.from')}:</strong>&nbsp;{formData.from ? formData.from : '—'}</div>
                  {rideType === 'one-way' && (
                    <div><strong>{t('common.to')}:</strong>&nbsp;{formData.to ? formData.to : '—'}</div>
                  )}
                  {rideType === 'by-hour' && (
                    <div><strong>{t('common.duration')}:</strong>&nbsp;{formData.duration} {t('common.hours')}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary search-btn">
                {t('common.search')}
              </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

