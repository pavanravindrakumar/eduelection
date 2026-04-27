import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { journeySteps } from '../data/electionData';
import './Journey.css';

const Journey = () => {
  const [currentStepId, setCurrentStepId] = useState('start');
  const [history, setHistory] = useState(['start']);

  const currentStep = journeySteps.find(step => step.id === currentStepId) || journeySteps[0];

  const handleOptionClick = (nextStepId) => {
    setHistory([...history, nextStepId]);
    setCurrentStepId(nextStepId);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentStepId(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <div className="journey-container animate-fade-in">
      <div className="text-center mb-8">
        <h1>Know Your Election Journey</h1>
        <p className="subtitle">A personalized guide to your voting experience</p>
      </div>

      <div className="journey-card card mx-auto">
        <div className="journey-header">
          <Compass size={32} className="text-primary" />
          <div className="progress-indicator">
            Step {history.length}
          </div>
        </div>

        <div className="journey-content animate-fade-in" key={currentStep.id}>
          <h2>{currentStep.title}</h2>
          <p className="journey-description">{currentStep.description}</p>

          {currentStep.action && (
            <div className="journey-action">
              <Link to={currentStep.action.link} className="action-link card">
                <div className="action-icon"><BookOpen size={24} /></div>
                <span>{currentStep.action.text}</span>
                <ArrowRight size={20} className="ml-auto" />
              </Link>
            </div>
          )}

          <div className="journey-options">
            {currentStep.options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(option.next)}
                className="journey-option-btn"
              >
                <CheckCircle size={20} className="option-icon" />
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {history.length > 1 && (
          <div className="journey-footer">
            <button onClick={handleBack} className="btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journey;
