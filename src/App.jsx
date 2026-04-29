import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Settings, Moon, Sun, Type, Menu, X, Loader2 } from 'lucide-react';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Assistant = lazy(() => import('./pages/Assistant'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const Simulator = lazy(() => import('./pages/Simulator'));
const EligibilityChecker = lazy(() => import('./pages/EligibilityChecker'));
const Journey = lazy(() => import('./pages/Journey'));
const FactChecker = lazy(() => import('./pages/FactChecker'));
const ConstituencyFinder = lazy(() => import('./pages/ConstituencyFinder'));

const LoadingFallback = () => (
  <div className="loading-fallback" aria-live="polite" aria-busy="true">
    <div className="skeleton-card">
      <div className="skeleton-icon animate-pulse"></div>
      <div className="skeleton-text animate-pulse"></div>
      <div className="skeleton-text animate-pulse short"></div>
    </div>
    <div className="loading-spinner">
      <Loader2 className="animate-spin text-primary" size={32} />
      <span>Loading module...</span>
    </div>
  </div>
);

function App() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showA11yMenu, setShowA11yMenu] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    // Theme color meta tag for PWA/Mobile
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", theme === 'dark' ? '#1e1e2d' : '#4F46E5');
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'small') root.style.setProperty('--font-base', '14px');
    if (fontSize === 'medium') root.style.setProperty('--font-base', '16px');
    if (fontSize === 'large') root.style.setProperty('--font-base', '20px');
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const cycleFontSize = () => {
    setFontSize(prev => {
      if (prev === 'small') return 'medium';
      if (prev === 'medium') return 'large';
      return 'small';
    });
  };

  return (
    <Router>
      <div className="app-container">
        <header className="navbar" role="banner">
          <div className="navbar-content container">
            <Link to="/" className="brand" aria-label="VoteWise AI Home">
              <span className="brand-icon" aria-hidden="true">🗳️</span>
              <span className="brand-text">VoteWise AI</span>
            </Link>

            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>

            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-label="Main Navigation">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/assistant" onClick={() => setIsMenuOpen(false)}>AI Assistant</Link>
              <Link to="/constituency" onClick={() => setIsMenuOpen(false)}>Find Booth</Link>
              <Link to="/timeline" onClick={() => setIsMenuOpen(false)}>Timeline</Link>
              <Link to="/simulator" onClick={() => setIsMenuOpen(false)}>Simulator</Link>
              <Link to="/eligibility" onClick={() => setIsMenuOpen(false)}>Eligibility</Link>
              <Link to="/fact-check" onClick={() => setIsMenuOpen(false)}>Fact Check</Link>
              <Link to="/journey" onClick={() => setIsMenuOpen(false)}>Your Journey</Link>
            </nav>

            <div className="a11y-controls">
              <button 
                className="icon-btn" 
                onClick={() => setShowA11yMenu(!showA11yMenu)}
                aria-label="Accessibility settings"
                aria-expanded={showA11yMenu}
                title="Accessibility settings"
              >
                <Settings size={20} aria-hidden="true" />
              </button>

              {showA11yMenu && (
                <div className="a11y-menu card animate-fade-in" role="dialog" aria-label="Accessibility Options">
                  <h4>Accessibility</h4>
                  <div className="a11y-option">
                    <span id="theme-label">Theme</span>
                    <button onClick={toggleTheme} className="icon-btn" aria-labelledby="theme-label" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                      {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                    </button>
                  </div>
                  <div className="a11y-option">
                    <span id="text-size-label">Text Size ({fontSize})</span>
                    <button onClick={cycleFontSize} className="icon-btn" aria-labelledby="text-size-label" aria-label="Change text size">
                      <Type size={18} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="a11y-option">
                    <span>Translate</span>
                    <div id="google_translate_element"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="main-content container" role="main">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/constituency" element={<ConstituencyFinder />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/eligibility" element={<EligibilityChecker />} />
              <Route path="/fact-check" element={<FactChecker />} />
              <Route path="/journey" element={<Journey />} />
            </Routes>
          </Suspense>
        </main>
        
        <footer className="footer" role="contentinfo">
          <div className="container">
            <p>VoteWise AI - Hack2Skill Visual Prompt Wars</p>
            <div className="footer-badges" aria-label="Footer Tech Stack">
              <span className="footer-badge">React</span>
              <span className="footer-badge">Cloud Run</span>
              <span className="footer-badge">Gemini</span>
              <span className="footer-badge">A11y Ready</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
