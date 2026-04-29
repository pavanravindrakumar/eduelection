import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

// Mock lucide-react to prevent any SVG rendering issues in tests
vi.mock('lucide-react', () => {
  return new Proxy({}, {
    get: () => {
      return function MockIcon() { return <span data-testid="mock-icon" />; };
    }
  });
});

describe('Home Component Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  it('renders trust badges and stack strip', () => {
    renderHome();
    expect(screen.getByText(/AI Powered \(Gemini\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Cloud Run Deployed/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessibility Tested/i)).toBeInTheDocument();
  });

  it('QuizWidget handles myth vs fact correctly', () => {
    renderHome();
    const factButton = screen.getByRole('button', { name: 'Fact' });
    const mythButton = screen.getByRole('button', { name: 'Myth' });

    expect(factButton).toBeInTheDocument();
    expect(mythButton).toBeInTheDocument();

    // Click Fact
    fireEvent.click(factButton);
    expect(screen.getByText(/Myth!/i)).toBeInTheDocument();

    // Next Question
    const nextBtn = screen.getByRole('button', { name: 'Next Question' });
    fireEvent.click(nextBtn);

    // After Next Question, should be back to answering mode
    expect(screen.getByRole('button', { name: 'Fact' })).toBeInTheDocument();
  });

  it('ReadinessWidget updates score properly based on checkbox states', () => {
    renderHome();
    expect(screen.getByText(/0% Ready/i)).toBeInTheDocument();

    const regCheck = screen.getByLabelText(/Registered to vote/i);
    const boothCheck = screen.getByLabelText(/Know polling booth/i);

    fireEvent.click(regCheck);
    expect(screen.getByText(/33% Ready/i)).toBeInTheDocument();

    fireEvent.click(boothCheck);
    expect(screen.getByText(/67% Ready/i)).toBeInTheDocument();
  });

  it('StatCounters animate gracefully', () => {
    renderHome();
    // Initially counts might be 0, fast forward timers to let it settle
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    // Check if 543 constituency count appears
    expect(screen.getByText(/543\+/i)).toBeInTheDocument();
  });
});
