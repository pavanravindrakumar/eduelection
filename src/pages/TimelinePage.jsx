import React, { useState } from 'react';
import { Calendar, FileText, Megaphone, CheckCircle, BarChart3 } from 'lucide-react';
import TimelineStep from '../components/TimelineStep';
import './Timeline.css';

const timelineData = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <FileText size={24} />,
    description: "Ensure your name is on the electoral roll. Submit Form 6 if you are a new voter or have moved.",
    details: "The Electoral Registration Officer updates the list. You can apply online via NVSP or offline. The deadline is usually a few weeks before the election announcement."
  },
  {
    id: 2,
    title: "Verification & Scrutiny",
    icon: <CheckCircle size={24} />,
    description: "Election Commission verifies candidate nominations and finalizes the candidate list.",
    details: "Candidates submit their nomination papers. The Returning Officer scrutinizes them for validity. Candidates can withdraw before the final list is published."
  },
  {
    id: 3,
    title: "Campaign Period",
    icon: <Megaphone size={24} />,
    description: "Candidates present their manifestos and campaign. Strict Model Code of Conduct applies.",
    details: "Campaigning ends 48 hours before polling begins. During this time, rallies, public meetings, and advertisements are closely monitored by the Election Commission."
  },
  {
    id: 4,
    title: "Polling Day",
    icon: <Calendar size={24} />,
    description: "Voters cast their vote using Electronic Voting Machines (EVMs) at designated polling stations.",
    details: "Carry a valid ID (Voter ID card or alternatives like Aadhar). Polling officials verify your identity, apply indelible ink, and allow you to cast your vote."
  },
  {
    id: 5,
    title: "Counting & Results",
    icon: <BarChart3 size={24} />,
    description: "EVMs are opened in the presence of observers. Votes are counted and results declared.",
    details: "The candidate with the highest number of valid votes in a constituency is declared the winner by the Returning Officer."
  }
];

const TimelinePage = () => {
  const [activeStep, setActiveStep] = useState(timelineData[0]);

  return (
    <div className="timeline-page animate-fade-in">
      <div className="text-center mb-8">
        <h1>The Election Journey</h1>
        <p className="subtitle">Understanding the democratic process step-by-step</p>
      </div>

      <div className="timeline-layout">
        <div className="timeline-steps">
          {timelineData.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep.id === step.id}
              onClick={setActiveStep}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>

        <div className="timeline-details card animate-fade-in" key={activeStep.id}>
          <div className="details-header">
            <div className="details-icon">{activeStep.icon}</div>
            <h2>{activeStep.title}</h2>
          </div>
          <div className="details-body">
            <p className="primary-desc">{activeStep.description}</p>
            <div className="divider"></div>
            <p className="secondary-desc">{activeStep.details}</p>
          </div>
          
          {activeStep.id === 1 && (
            <div className="action-box">
              <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>
                Go to NVSP Portal
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
