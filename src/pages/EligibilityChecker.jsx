import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, FileText, Info } from 'lucide-react';
import './EligibilityChecker.css';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    age: '',
    citizenship: '',
    residence: '',
    disqualified: 'no'
  });
  
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = React.useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg('');
  }, []);

  const checkEligibility = React.useCallback((e) => {
    e.preventDefault();
    
    const age = parseInt(formData.age);
    const isCitizen = formData.citizenship === 'yes';
    const isResident = formData.residence === 'yes';
    const isDisqualified = formData.disqualified === 'yes';

    if (isNaN(age) || age < 0) {
      setErrorMsg("Please enter a valid age.");
      setResult(null);
      return;
    }

    if (!isCitizen) {
      setResult({
        eligible: false,
        reason: "You must be a citizen of the country to be eligible to vote."
      });
    } else if (age < 18) {
      setResult({
        eligible: false,
        reason: `You must be at least 18 years old. You will be eligible in ${18 - age} year(s).`
      });
    } else if (!isResident) {
      setResult({
        eligible: false,
        reason: "You must be a resident of the polling area where you wish to vote."
      });
    } else if (isDisqualified) {
      setResult({
        eligible: false,
        reason: "You are currently disqualified from voting due to legal restrictions."
      });
    } else {
      setResult({
        eligible: true,
        reason: "You meet all basic requirements to vote! Make sure you are registered on the electoral roll."
      });
    }
  }, [formData]);

  return (
    <div className="eligibility-container animate-fade-in">
      <div className="text-center mb-8">
        <h1>Eligibility Checker</h1>
        <p className="subtitle">Find out if you can vote and what you need</p>
      </div>

      <div className="checker-layout">
        <div className="card form-card">
          <h2>Enter Your Details</h2>
          <form onSubmit={checkEligibility} className="eligibility-form">
            <div className="form-group">
              <label htmlFor="age">How old are you?</label>
              <input 
                type="number" 
                id="age" 
                name="age" 
                className="input" 
                min="0" 
                max="120" 
                required 
                value={formData.age} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Are you a citizen?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="citizenship" value="yes" required onChange={handleChange} /> Yes
                </label>
                <label className="radio-label">
                  <input type="radio" name="citizenship" value="no" onChange={handleChange} /> No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Are you a resident of your constituency?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="residence" value="yes" required onChange={handleChange} /> Yes
                </label>
                <label className="radio-label">
                  <input type="radio" name="residence" value="no" onChange={handleChange} /> No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Are you disqualified by law (e.g., corrupt practices)?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="disqualified" value="yes" required onChange={handleChange} /> Yes
                </label>
                <label className="radio-label">
                  <input type="radio" name="disqualified" value="no" defaultChecked onChange={handleChange} /> No
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-4" aria-label="Check my voting eligibility">Check Eligibility</button>
            {errorMsg && (
              <div className="error-message" role="alert">
                {errorMsg}
              </div>
            )}
          </form>
        </div>

        <div className="results-panel">
          {result ? (
            <div className={`card result-card animate-fade-in ${result.eligible ? 'eligible' : 'ineligible'}`}>
              <div className="result-icon">
                {result.eligible ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
              </div>
              <h2>{result.eligible ? 'You are Eligible!' : 'Not Eligible'}</h2>
              <p>{result.reason}</p>
              
              {result.eligible && (
                <div className="next-steps">
                  <h3>Next Steps</h3>
                  <ul className="steps-list">
                    <li><FileText size={18} /> Ensure your name is on the voter list.</li>
                    <li><FileText size={18} /> Fill Form 6 if not registered.</li>
                    <li><FileText size={18} /> Keep your EPIC/Voter ID card ready.</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="card info-card">
              <Info size={48} className="text-primary mb-4" />
              <h2>Why do we check?</h2>
              <p>Voting is a constitutional right, but it comes with specific eligibility criteria to ensure fair democratic processes.</p>
              <p className="mt-4">Fill out the form to see if you meet the requirements set by the Election Commission.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
