import React, { useState } from 'react';
import { User, Check, RefreshCw } from 'lucide-react';
import { candidates } from '../data/electionData';
import './Simulator.css';

const Simulator = () => {
  const [step, setStep] = useState('verification'); // verification, voting, vvpat, done
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVerify = React.useCallback((e) => {
    e.preventDefault();
    setStep('voting');
  }, []);

  const handleVote = React.useCallback((candidate) => {
    setSelectedCandidate(candidate);
    setStep('vvpat');
    
    // Simulate VVPAT viewing time then complete
    setTimeout(() => {
      setStep('done');
    }, typeof process !== 'undefined' && process.env.NODE_ENV === 'test' ? 0 : 3000);
  }, []);

  const resetSimulator = React.useCallback(() => {
    setStep('verification');
    setSelectedCandidate(null);
  }, []);

  return (
    <div className="simulator-container animate-fade-in">
      <div className="text-center mb-8">
        <h1>Voting Simulator</h1>
        <p className="subtitle">Experience the EVM voting process securely</p>
      </div>

      <div className="simulator-card card mx-auto">
        {step === 'verification' && (
          <div className="sim-step animate-fade-in">
            <div className="step-icon"><User size={48} /></div>
            <h2>Step 1: Identity Verification</h2>
            <p>At the polling booth, the polling officer verifies your identity against the electoral roll.</p>
            <form onSubmit={handleVerify} className="verification-form">
              <input type="text" placeholder="Enter Voter ID (EPIC Number) for Demo" required className="input" defaultValue="ABC1234567" />
              <button type="submit" className="btn-primary w-full">Verify Identity</button>
            </form>
          </div>
        )}

        {step === 'voting' && (
          <div className="sim-step animate-fade-in evm-machine">
            <div className="evm-header">
              <h2>Electronic Voting Machine (EVM)</h2>
              <div className="ready-indicator">READY</div>
            </div>
            <div className="candidates-list">
              {candidates.map(candidate => (
                <div key={candidate.id} className="candidate-row">
                  <div className="candidate-info">
                    <span className="candidate-symbol">{candidate.symbol}</span>
                    <div className="candidate-details">
                      <span className="candidate-name">{candidate.name}</span>
                      <span className="candidate-party">{candidate.party}</span>
                    </div>
                  </div>
                  <button 
                    className="vote-btn" 
                    onClick={() => handleVote(candidate)}
                    aria-label={`Vote for ${candidate.name}`}
                  >
                    <div className="btn-circle"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'vvpat' && selectedCandidate && (
          <div className="sim-step animate-fade-in">
            <h2>VVPAT Verification</h2>
            <p>Please verify your vote on the printed slip.</p>
            <div className="vvpat-window">
              <div className="vvpat-slip animate-slip">
                <span className="slip-symbol">{selectedCandidate.symbol}</span>
                <span className="slip-name">{selectedCandidate.name}</span>
                <span className="slip-party">{selectedCandidate.party}</span>
              </div>
            </div>
            <p className="text-sm mt-4">The slip will be visible for 7 seconds before falling into the sealed box.</p>
          </div>
        )}

        {step === 'done' && (
          <div className="sim-step animate-fade-in success-state">
            <div className="success-icon"><Check size={64} /></div>
            <h2>Vote Cast Successfully!</h2>
            <p>Your vote has been securely recorded.</p>
            <p className="text-sm mt-2 mb-6">In a real election, indelible ink would now be applied to your left index finger.</p>
            <button onClick={resetSimulator} className="btn-secondary flex items-center gap-2 mx-auto">
              <RefreshCw size={18} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;
