import React from 'react';

const TimelineStep = ({ step, index, isActive, onClick, isLast }) => {
  return (
    <button 
      className={`timeline-item ${isActive ? 'active' : ''}`}
      onClick={() => onClick(step)}
      aria-current={isActive ? "step" : undefined}
      style={{textAlign: 'left', background: 'none', border: 'none', padding: 0, width: '100%', cursor: 'pointer', fontFamily: 'inherit'}}
    >
      <div className="timeline-connector">
        <div className="timeline-marker" aria-hidden="true">{index + 1}</div>
        {!isLast && <div className="timeline-line" aria-hidden="true"></div>}
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          <span className="timeline-icon" aria-hidden="true">{step.icon}</span>
          <h3>{step.title}</h3>
        </div>
      </div>
    </button>
  );
};

export default TimelineStep;
