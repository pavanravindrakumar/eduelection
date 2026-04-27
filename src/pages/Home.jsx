import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Map, UserCheck, CheckSquare, ArrowRight, ShieldAlert, MapPin } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero">
        <h1 className="hero-title">Empowering Every Voter with <span className="text-gradient">VoteWise AI</span></h1>
        <p className="hero-subtitle">
          Your interactive guide to understanding the election process, verifying your eligibility, and experiencing a simulated vote.
        </p>
        <div className="hero-actions">
          <Link to="/journey" className="btn-primary">Start Your Journey <ArrowRight size={18} /></Link>
          <Link to="/assistant" className="btn-secondary">Ask AI Assistant</Link>
        </div>
      </section>

      <section className="features-grid">
        <Link to="/assistant" className="feature-card card">
          <div className="feature-icon"><Bot size={32} /></div>
          <h3>AI Assistant</h3>
          <p>Get instant answers using Gemini AI. Now with Voice Input and Output.</p>
        </Link>
        <Link to="/fact-check" className="feature-card card">
          <div className="feature-icon"><ShieldAlert size={32} /></div>
          <h3>Fact Checker</h3>
          <p>Verify viral claims and WhatsApp forwards for misinformation instantly.</p>
        </Link>
        <Link to="/constituency" className="feature-card card">
          <div className="feature-icon"><MapPin size={32} /></div>
          <h3>Constituency Finder</h3>
          <p>Locate your polling booth and representative using Google Maps.</p>
        </Link>
        <Link to="/simulator" className="feature-card card">
          <div className="feature-icon"><CheckSquare size={32} /></div>
          <h3>Voting Simulator</h3>
          <p>Experience a mock voting booth to familiarize yourself with the EVM and VVPAT process.</p>
        </Link>
        <Link to="/eligibility" className="feature-card card">
          <div className="feature-icon"><UserCheck size={32} /></div>
          <h3>Eligibility Checker</h3>
          <p>Instantly check if you are eligible to vote and find out exactly what documents you need.</p>
        </Link>
        <Link to="/timeline" className="feature-card card">
          <div className="feature-icon"><Map size={32} /></div>
          <h3>Interactive Timeline</h3>
          <p>Explore the complete election journey from registration to result declarations in a visual timeline.</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
