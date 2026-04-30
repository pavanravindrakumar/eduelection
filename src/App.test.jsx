import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

describe('Home Component', () => {
  it('renders the main title', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Empowering Every Voter/i)).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Voice enabled/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Eligibility Checker/i)).toBeInTheDocument();
    expect(screen.getByText(/Voting Simulator/i)).toBeInTheDocument();
  });
});
