import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './AutocompleteInput.css';

// Loads Google Maps JS API with places library if not already loaded
const loadGoogleMaps = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window object'));
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log('✅ Google Maps already loaded');
      return resolve(window.google);
    }

    const existing = document.querySelector('script[data-google-maps]');
    if (existing) {
      console.log('⏳ Google Maps script already exists, waiting for load...');
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('data-google-maps', 'true');
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    console.log('🔗 Loading Google Maps from:', scriptUrl.replace(apiKey, 'API_KEY_HIDDEN'));
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ Google Maps script loaded!');
      resolve(window.google);
    };
    script.onerror = (err) => {
      console.error('❌ Google Maps script failed to load:', err);
      reject(err);
    };
    document.head.appendChild(script);
  });
};

const AutocompleteInput = ({ value, onChange, onSelect, placeholder, id, name, types, componentRestrictions, returnPlaceDetails = false }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const serviceRef = useRef(null);
  const containerRef = useRef(null);
  const [portalStyle, setPortalStyle] = useState({ top: 0, left: 0, width: 0 });
  const portalNodeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      console.warn('⚠️ VITE_GOOGLE_MAPS_API_KEY is not set — Autocomplete will not work');
      return;
    }

    console.log('🗺️ Loading Google Maps API...');
    let mounted = true;
    loadGoogleMaps(key)
      .then((google) => {
        if (!mounted) return;
        serviceRef.current = new google.maps.places.AutocompleteService();
        console.log('✅ Google Maps API loaded successfully!');
      })
      .catch((err) => {
        console.error('❌ Failed to load Google Maps API:', err);
      });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    // hide suggestions when clicking outside
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setVisible(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // manage portal node
  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    portalNodeRef.current = node;
    return () => {
      if (portalNodeRef.current) {
        document.body.removeChild(portalNodeRef.current);
        portalNodeRef.current = null;
      }
    };
  }, []);

  const fetchPredictions = (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    // If API finished loading after initial render, initialize serviceRef here
    if (!serviceRef.current && window.google && window.google.maps && window.google.maps.places) {
      console.log('🔧 Initializing AutocompleteService...');
      serviceRef.current = new window.google.maps.places.AutocompleteService();
    }

    if (!serviceRef.current) {
      // service not ready yet, bail and wait for the loader to initialize it
      console.warn('⚠️ AutocompleteService not ready yet');
      return;
    }

    const opts = { input };
    if (types) opts.types = types;
    if (componentRestrictions) opts.componentRestrictions = componentRestrictions;
    console.log('📤 Sending request with options:', opts);

    serviceRef.current.getPlacePredictions(opts, (preds, status) => {
      console.log('📍 Autocomplete status:', status, 'Predictions:', preds?.length || 0);
      if (status !== window.google.maps.places.PlacesServiceStatus.OK || !preds) {
        setSuggestions([]);
        return;
      }
      setSuggestions(preds);
      setVisible(true);
    });
  };

  const handleInput = (e) => {
    onChange && onChange(e);
    const val = e.target.value;
    console.log('⌨️ User typed:', val);

    // clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!val || val.length < 1) {
      setSuggestions([]);
      return;
    }

    // debounce to reduce API calls
    timerRef.current = setTimeout(() => {
      console.log('🔍 Fetching predictions for:', val);
      fetchPredictions(val);
    }, 250);
  };

  const handleSelect = (prediction) => {
    // If caller asked for details, request Place Details and return them
    if (returnPlaceDetails && window.google && window.google.maps && window.google.maps.places) {
      const ps = new window.google.maps.places.PlacesService(document.createElement('div'));
      ps.getDetails({ placeId: prediction.place_id, fields: ['formatted_address', 'geometry', 'name', 'address_components'] }, (details, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && details) {
          const formatted = details.formatted_address || prediction.description || '';
          const syntheticEvent = { target: { name, value: formatted } };
          onChange && onChange(syntheticEvent);
          onSelect && onSelect({ prediction, details });
        } else {
          // fallback to prediction description
          const description = prediction.description || '';
          const syntheticEvent = { target: { name, value: description } };
          onChange && onChange(syntheticEvent);
          onSelect && onSelect({ prediction, details: null });
        }
        setSuggestions([]);
        setVisible(false);
      });
      return;
    }

    const description = prediction.description || prediction.formatted_address || '';
    // create synthetic event for parent onChange
    const syntheticEvent = { target: { name, value: description } };
    onChange && onChange(syntheticEvent);
    onSelect && onSelect({ prediction, details: null });
    setSuggestions([]);
    setVisible(false);
  };

  // compute portal position when suggestions visible
  useEffect(() => {
    if (!visible || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPortalStyle({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX, width: rect.width });

    const onScroll = () => {
      const r = containerRef.current.getBoundingClientRect();
      setPortalStyle({ top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX, width: r.width });
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible]);

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <input
        id={id}
        name={name}
        className="autocomplete-input"
        value={value}
        onChange={handleInput}
        onFocus={() => { if (suggestions.length) setVisible(true); }}
        placeholder={placeholder}
        autoComplete="off"
      />

      {visible && suggestions && suggestions.length > 0 && portalNodeRef.current && createPortal(
        <div className="autocomplete-list" style={{ position: 'absolute', top: portalStyle.top + 'px', left: portalStyle.left + 'px', width: portalStyle.width + 'px' }}>
          {suggestions.map((s) => {
            // choose icon based on types
            const types = s.types || [];
            const isEstablishment = types.includes('establishment') || types.includes('point_of_interest');
            return (
              <button
                type="button"
                key={s.place_id}
                className="autocomplete-item"
                onClick={() => handleSelect(s)}
              >
                <div className="item-icon" aria-hidden>
                  {isEstablishment ? (
                    // building icon (simple SVG)
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 22V6a2 2 0 0 1 2-2h12v18" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2v6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10h.01M8 14h.01M8 18h.01M12 10h.01M12 14h.01M12 18h.01M16 10h.01M16 14h.01M16 18h.01" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    // location pin icon
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="11" r="1.5" fill="#6b7280"/></svg>
                  )}
                </div>

                <div className="item-text">
                  <div className="item-main">{s.structured_formatting?.main_text || s.description}</div>
                  {/* show a fuller address on the next line; fall back to description if no secondary_text */}
                  <div className="item-secondary">
                    {s.structured_formatting?.secondary_text
                      ? s.structured_formatting.secondary_text
                      : (
                        // remove the main_text from description if possible to avoid duplication
                        (() => {
                          const main = s.structured_formatting?.main_text || '';
                          if (s.description && main && s.description.startsWith(main)) {
                            return s.description.substring(main.length).replace(/^,\s*/, '');
                          }
                          return s.description || '';
                        })()
                      )}
                  </div>
                </div>
              </button>
            );
          })}
          <div className="powered-by">powered by Google</div>
        </div>,
        portalNodeRef.current
      )}
    </div>
  );
};

export default AutocompleteInput;
