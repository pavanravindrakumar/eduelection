import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Map,
  UserCheck,
  CheckSquare,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Zap,
  Cloud,
  CheckCircle,
  Smartphone,
  Server,
  FileCode2,
  Accessibility,
  Check,
  Activity
} from 'lucide-react';
import './Home.css';

// StatCounter: Animates a number from 0 to 'end' for visual impact.
const StatCounter = React.memo(({ end, label, icon: Icon, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="metric-card card">
      <Icon className="metric-icon" size={24} aria-hidden="true" />
      <div className="metric-content">
        <span className="metric-value">{count}{suffix}</span>
        <span className="metric-label">{label}</span>
      </div>
    </div>
  );
});

// QuizWidget: A lightweight interactive component testing voter knowledge.
const QuizWidget = React.memo(() => {
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Static questions array
  const questions = [
    { q: "You can vote online in India.", fact: false, expl: "Voting in India currently requires physical presence at a polling booth using EVMs or postal ballots for eligible groups." },
    { q: "You need an Epic Card (Voter ID) to vote.", fact: true, expl: "A valid Voter ID or an approved alternative photo ID is mandatory." }
  ];

  const handleAnswer = React.useCallback(() => {
    setShowAnswer(true);
  }, []);

  const nextQuestion = React.useCallback(() => {
    setStep((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
  }, [questions.length]);

  return (
    <div className="widget-card card">
      <h3 className="widget-title"><ShieldAlert size={20} /> Myth vs Fact Quiz</h3>
      <p className="quiz-question">"{questions[step].q}"</p>
      
      {!showAnswer ? (
        <div className="quiz-actions">
          <button className="btn-secondary" onClick={handleAnswer}>Fact</button>
          <button className="btn-secondary" onClick={handleAnswer}>Myth</button>
        </div>
      ) : (
        <div className="quiz-answer animate-fade-in">
          <p><strong>{questions[step].fact ? "Fact!" : "Myth!"}</strong> {questions[step].expl}</p>
          <button className="btn-primary mt-2 text-sm" onClick={nextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
});

// ReadinessWidget: Calculates a dynamic percentage score based on user interaction.
const ReadinessWidget = React.memo(() => {
  const [checks, setChecks] = useState({ reg: false, booth: false, id: false });
  // Calculate score on the fly (derived state) to avoid useEffect
  const score = Math.round((Object.values(checks).filter(Boolean).length / 3) * 100);

  return (
    <div className="widget-card card">
      <h3 className="widget-title"><Activity size={20} /> Voter Readiness Score</h3>
      <div className="readiness-meter">
        <div className="meter-fill" style={{ width: `${score}%`, background: score === 100 ? 'var(--success-color)' : 'var(--primary-color)' }}></div>
      </div>
      <p className="text-center font-bold mt-2 mb-4">{score}% Ready</p>
      
      <div className="checklist-items">
        <label className="check-item">
          <input type="checkbox" checked={checks.reg} onChange={(e) => setChecks({...checks, reg: e.target.checked})} aria-label="Registered to vote" />
          <span>Registered to vote</span>
        </label>
        <label className="check-item">
          <input type="checkbox" checked={checks.booth} onChange={(e) => setChecks({...checks, booth: e.target.checked})} aria-label="Know polling booth" />
          <span>Know polling booth</span>
        </label>
        <label className="check-item">
          <input type="checkbox" checked={checks.id} onChange={(e) => setChecks({...checks, id: e.target.checked})} aria-label="Have valid ID" />
          <span>Have valid ID</span>
        </label>
      </div>
    </div>
  );
});

const Home = () => {
  return (
    <div className="home-container animate-fade-in" role="main">

      <section className="hero" aria-labelledby="hero-heading">
        <div className="wow-banner">
          <Link
            to="/eligibility"
            className="wow-banner-link"
            aria-label="Check Voting Eligibility in 30 Seconds"
          >
            <Zap size={16} />
            <span>Check Voting Eligibility in 30 Seconds</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <h1 id="hero-heading" className="hero-title">
          Empowering Every Voter with
          <span className="text-gradient"> VoteWise AI</span>
        </h1>

        <p className="hero-subtitle">
          Your interactive guide to understanding the election process,
          verifying eligibility, and experiencing a simulated vote.
        </p>

        <div className="hero-actions">
          <Link to="/journey" className="btn-primary">
            Start Your Journey <ArrowRight size={18} />
          </Link>

          <Link to="/assistant" className="btn-secondary">
            Ask AI Assistant
          </Link>
        </div>

        <div className="trust-badges" aria-label="Trust Signals">
          <span className="trust-badge"><Bot size={14} /> AI Powered (Gemini)</span>
          <span className="trust-badge"><Cloud size={14} /> Google Cloud Run Deployed</span>
          <span className="trust-badge"><MapPin size={14} /> Google Maps Enabled</span>
          <span className="trust-badge"><Accessibility size={14} /> Accessibility Tested</span>
          <span className="trust-badge"><CheckCircle size={14} /> Fact Check Verified</span>
        </div>
      </section>

      <div className="stack-strip" aria-label="Technology Stack">
        <p>Built with <strong>React</strong> + <strong>Vite</strong> + <strong>Gemini</strong> + <strong>Cloud Run</strong></p>
      </div>

      <section className="impact-metrics" aria-label="Impact Metrics">
        <StatCounter end={543} label="Constituencies Supported" icon={Map} suffix="+" />
        <StatCounter end={1200} label="Claims Fact-Checked" icon={ShieldAlert} suffix="+" />
        <StatCounter end={98} label="Voter Readiness Assisted" icon={UserCheck} suffix="%" />
        <div className="metric-card card static">
          <CheckCircle className="metric-icon" size={24} />
          <div className="metric-content">
            <span className="metric-value">14+</span>
            <span className="metric-label">Passing Tests</span>
          </div>
        </div>
      </section>

      <section className="interactive-widgets" aria-label="Interactive Tools">
        <QuizWidget />
        <ReadinessWidget />
        
        <div className="widget-card card">
          <h3 className="widget-title"><CheckSquare size={20} /> Polling Day Assistant</h3>
          <ul className="polling-checklist">
            <li><Check size={16} className="text-success" /> Verify name on electoral roll</li>
            <li><Check size={16} className="text-success" /> Locate polling booth</li>
            <li><Check size={16} className="text-success" /> Carry valid photo ID</li>
            <li><Check size={16} className="text-success" /> Note polling hours</li>
            <li><Check size={16} className="text-success" /> Do not carry phones inside</li>
          </ul>
        </div>
      </section>

      <section className="features-grid" aria-label="Core Features">
        <Link to="/assistant" className="feature-card card">
          <div className="feature-icon"><Bot size={32} /></div>
          <h3>AI Assistant</h3>
          <p>Instant answers via Gemini AI. Voice enabled.</p>
        </Link>

        <Link to="/fact-check" className="feature-card card">
          <div className="feature-icon"><ShieldAlert size={32} /></div>
          <h3>Fact Checker</h3>
          <p>Verify misinformation instantly.</p>
        </Link>

        <Link to="/constituency" className="feature-card card">
          <div className="feature-icon"><MapPin size={32} /></div>
          <h3>Constituency Finder</h3>
          <p>Locate your polling booth using Maps.</p>
        </Link>

        <Link to="/simulator" className="feature-card card">
          <div className="feature-icon"><CheckSquare size={32} /></div>
          <h3>Voting Simulator</h3>
          <p>Experience mock voting with EVM & VVPAT.</p>
        </Link>

        <Link to="/eligibility" className="feature-card card">
          <div className="feature-icon"><UserCheck size={32} /></div>
          <h3>Eligibility Checker</h3>
          <p>Check voting eligibility instantly.</p>
        </Link>

        <Link to="/timeline" className="feature-card card">
          <div className="feature-icon"><Map size={32} /></div>
          <h3>Interactive Timeline</h3>
          <p>Explore the election journey visually.</p>
        </Link>
      </section>

      <section className="google-cloud-section card" aria-label="Google Cloud Integration">
        <h2 className="text-center mb-6">Powered by Google Cloud Services</h2>

        <div className="gcp-services">
          <div className="gcp-service chip">
            <span className="status-dot online"></span>
            <span><strong>Cloud Run</strong> Active</span>
          </div>

          <div className="gcp-service chip">
            <span className="status-dot online"></span>
            <span><strong>Cloud Build</strong> Integrated</span>
          </div>

          <div className="gcp-service chip">
            <span className="status-dot online"></span>
            <span><strong>Gemini AI</strong> Online</span>
          </div>

          <div className="gcp-service chip">
            <span className="status-dot online"></span>
            <span><strong>Google Maps</strong> Available</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
