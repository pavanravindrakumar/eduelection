import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle, Search, Loader2 } from 'lucide-react';
import { checkFact } from '../services/geminiService';
import { sanitizeInput } from '../utils/sanitize';
import './FactChecker.css';

const FactChecker = () => {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = React.useCallback(async (e) => {
    e.preventDefault();
    const sanitizedClaim = sanitizeInput(claim);
    if (!sanitizedClaim) return;

    setIsLoading(true);
    setResult(null);

    try {
      const factResult = await checkFact(sanitizedClaim);
      setResult(factResult);
    } catch (error) {
      setResult({
        verdict: "Error",
        explanation: "Unable to verify the claim at this moment. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  }, [claim]);

  const getVerdictIcon = (verdict) => {
    switch(verdict) {
      case 'True': return <CheckCircle size={48} className="verdict-true" />;
      case 'False': return <XCircle size={48} className="verdict-false" />;
      case 'Misleading': return <AlertTriangle size={48} className="verdict-misleading" />;
      default: return <ShieldAlert size={48} className="verdict-error" />;
    }
  };

  return (
    <div className="fact-checker-container animate-fade-in">
      <div className="text-center mb-8">
        <h1>Election Fact Checker</h1>
        <p className="subtitle">Verify viral claims, forwards, and election news instantly.</p>
      </div>

      <div className="card fact-checker-card mx-auto">
        <form onSubmit={handleCheck} className="fact-check-form">
          <label htmlFor="claim-input" className="form-label">Enter the claim or news to verify:</label>
          <textarea
            id="claim-input"
            className="input textarea-input"
            rows="4"
            placeholder="e.g. You can vote online in this election."
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="btn-primary flex items-center justify-center gap-2" disabled={isLoading || !claim.trim()}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            {isLoading ? 'Analyzing...' : 'Check Fact'}
          </button>
        </form>

        <div className="trending-claims mt-4">
          <p className="text-sm text-gray-500 mb-2">Trending checks:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setClaim("EVMs can be hacked via Bluetooth")} className="badge cursor-pointer hover:bg-primary hover:text-white transition-colors" style={{padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', border: '1px solid var(--border-color)', background: 'var(--card-bg)'}}>EVMs hacked via Bluetooth?</button>
            <button onClick={() => setClaim("You can vote online in India")} className="badge cursor-pointer hover:bg-primary hover:text-white transition-colors" style={{padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', border: '1px solid var(--border-color)', background: 'var(--card-bg)'}}>Online voting available?</button>
            <button onClick={() => setClaim("NRIs cannot vote in Indian elections")} className="badge cursor-pointer hover:bg-primary hover:text-white transition-colors" style={{padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', border: '1px solid var(--border-color)', background: 'var(--card-bg)'}}>Can NRIs vote?</button>
          </div>
        </div>

        {result && (
          <div className={`fact-result animate-fade-in verdict-${result.verdict.toLowerCase()}`} role="region" aria-live="polite" aria-label="Fact Check Result">
            <div className="result-header">
              {getVerdictIcon(result.verdict)}
              <h2>{result.verdict}</h2>
            </div>
            <div className="result-body">
              <p>{result.explanation}</p>
              
              {result.confidenceScore && (
                <div className="confidence-meter mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence Score</span>
                    <span>{result.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" style={{background: 'var(--border-color)', borderRadius: '999px', height: '8px'}}>
                    <div className="bg-primary h-2.5 rounded-full" style={{width: `${result.confidenceScore}%`, background: 'var(--primary-color)', borderRadius: '999px', height: '8px'}}></div>
                  </div>
                </div>
              )}

              {result.sources && result.sources.length > 0 && (
                <div className="sources-list mt-4">
                  <h4 className="text-sm font-semibold mb-1">Sources:</h4>
                  <ul className="text-sm list-disc pl-5">
                    {result.sources.map((src, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">{src}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactChecker;
