import React, { useState } from 'react';
import { MapPin, Search, Navigation, Crosshair } from 'lucide-react';
import { sanitizeInput } from '../utils/sanitize';
import './ConstituencyFinder.css';

const ConstituencyFinder = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLocateMe = React.useCallback(() => {
    setErrorMsg('');
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        // Simulate a reverse geocoded pincode based on coords
        // In a real app, you'd use a Geocoding API here.
        setPincode('500001'); // Auto-fill with a valid mock pincode
        setErrorMsg('');
      },
      (error) => {
        setIsLocating(false);
        setErrorMsg("Unable to retrieve your location. Please check your permissions or enter manually.");
      }
    );
  }, []);

  const handleSearch = React.useCallback((e) => {
    e.preventDefault();
    setErrorMsg('');
    const sanitizedPincode = sanitizeInput(pincode);
    if (!sanitizedPincode) {
      setErrorMsg("Please enter a valid pincode.");
      return;
    }

    setIsLoading(true);
    
    // Mocking an API call for constituency lookup
    setTimeout(() => {
      let mockData = {
        constituency: 'New Delhi (Mock)',
        representative: 'Demo MP - Delhi',
        pollingStation: 'Govt School, Block B, New Delhi',
        lat: 28.6139,
        lng: 77.2090,
      };

      const pinPrefix = sanitizedPincode.charAt(0);
      if (pinPrefix === '4') {
        mockData = { constituency: 'Mumbai South (Mock)', representative: 'Demo MP - Mumbai', pollingStation: 'Municipal School, Colaba', lat: 18.9220, lng: 72.8347 };
      } else if (pinPrefix === '5') {
        mockData = { constituency: 'Hyderabad Central (Mock)', representative: 'Demo MP - Hyderabad', pollingStation: 'Govt High School, Main Road', lat: 17.3850, lng: 78.4867 };
      } else if (pinPrefix === '6') {
        mockData = { constituency: 'Chennai South (Mock)', representative: 'Demo MP - Chennai', pollingStation: 'Community Hall, Adyar', lat: 13.0827, lng: 80.2707 };
      } else if (pinPrefix === '7' || pinPrefix === '8') {
        mockData = { constituency: 'Kolkata North (Mock)', representative: 'Demo MP - Kolkata', pollingStation: 'Primary School, Shyambazar', lat: 22.5726, lng: 88.3639 };
      } else if (pinPrefix === '3') {
        mockData = { constituency: 'Ahmedabad West (Mock)', representative: 'Demo MP - Ahmedabad', pollingStation: 'Navrangpura High School', lat: 23.0225, lng: 72.5714 };
      }

      setResult(mockData);
      setIsLoading(false);
    }, typeof process !== 'undefined' && process.env.NODE_ENV === 'test' ? 0 : 1000);
  }, [pincode]);

  return (
    <div className="constituency-container animate-fade-in">
      <div className="text-center mb-8">
        <h1>Constituency & Polling Booth Finder</h1>
        <p className="subtitle">Locate your election district and voting booth</p>
      </div>

      <div className="finder-layout">
        <div className="card finder-sidebar">
          <h2>Search Location</h2>
          <form onSubmit={handleSearch} className="finder-form">
            <div className="form-group">
              <label htmlFor="pincode">Enter Pincode or Locality</label>
              <div className="search-input-group">
                <MapPin className="search-icon" size={20} />
                <input
                  type="text"
                  id="pincode"
                  className="input search-input-styled"
                  placeholder="e.g. 500001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={isLoading || !pincode.trim()}>
                <Search size={20} /> {isLoading ? 'Searching...' : 'Find Constituency'}
              </button>
              <button 
                type="button" 
                onClick={handleLocateMe}
                className="btn-secondary flex items-center justify-center" 
                disabled={isLocating}
                aria-label="Use my current location"
                title="Use my current location"
              >
                <Crosshair size={20} className={isLocating ? 'animate-spin' : ''} />
              </button>
            </div>
            {errorMsg && (
              <div className="error-message" role="alert">
                {errorMsg}
              </div>
            )}
          </form>

          {isLoading ? (
            <div className="card text-center mt-6 p-6 animate-fade-in">
              <Crosshair size={48} className="text-primary animate-spin mx-auto mb-4" />
              <p>Fetching your constituency details...</p>
            </div>
          ) : result && (
            <div className="constituency-details animate-fade-in mt-6" role="region" aria-live="polite" aria-label="Constituency Search Results">
              <h3>Results</h3>
              <div className="detail-item">
                <span className="detail-label">Constituency:</span>
                <span className="detail-value text-primary">{result.constituency}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Rep:</span>
                <span className="detail-value">{result.representative}</span>
              </div>
              <div className="detail-item mt-4">
                <span className="detail-label flex items-center gap-2">
                  <Navigation size={18} aria-hidden="true" /> Suggested Polling Booth:
                </span>
                <span className="detail-value">{result.pollingStation}</span>
              </div>
            </div>
          )}
        </div>

        <div className="card map-container">
          {result ? (
            <iframe
              title="Google Map Constituency"
              className="google-map-iframe"
              src={`https://maps.google.com/maps?q=${result.lat},${result.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="map-placeholder">
              <MapPin size={48} className="placeholder-icon mb-4" />
              <p>Enter your location to view the map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstituencyFinder;
