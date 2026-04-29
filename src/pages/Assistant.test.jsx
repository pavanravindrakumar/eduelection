import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Assistant from './Assistant';
import * as geminiService from '../services/geminiService';

vi.mock('lucide-react', () => ({
  Send: () => <span data-testid="icon-send" />,
  Bot: () => <span data-testid="icon-bot" />,
  User: () => <span data-testid="icon-user" />,
  Loader2: () => <span data-testid="icon-loader" />,
  Mic: () => <span data-testid="icon-mic" />,
  MicOff: () => <span data-testid="icon-micoff" />,
  Volume2: () => <span data-testid="icon-vol2" />,
  VolumeX: () => <span data-testid="icon-volx" />,
  AlertCircle: () => <span data-testid="icon-alert" />
}));

vi.mock('../services/geminiService', () => ({
  getGeminiResponse: vi.fn()
}));

// Mock scrollIntoView and speechSynthesis
window.HTMLElement.prototype.scrollIntoView = vi.fn();
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    cancel: vi.fn(),
    speak: vi.fn(),
  },
  writable: true
});

describe('Assistant Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial welcome message', () => {
    render(<Assistant />);
    expect(screen.getByText(/Hello! I am VoteWise AI/i)).toBeInTheDocument();
  });

  it('handles invalid input gracefully', async () => {
    render(<Assistant />);
    const input = screen.getByLabelText(/Message input/i);
    const form = input.closest('form');
    
    // Submit empty/whitespace input
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid message/i)).toBeInTheDocument();
    });
  });

  it('displays loading state and mock successful response', async () => {
    geminiService.getGeminiResponse.mockResolvedValueOnce('Here is the registration process.');
    render(<Assistant />);
    
    const input = screen.getByLabelText(/Message input/i);
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'How to register?' } });
    fireEvent.submit(form);
    
    // Check user query rendered
    expect(screen.getByText('How to register?')).toBeInTheDocument();
    // Check loading indicator
    expect(screen.getByText(/Analyzing query.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Here is the registration process./i)).toBeInTheDocument();
    });
    // Ensure loading indicator is removed
    expect(screen.queryByText(/Analyzing query.../i)).not.toBeInTheDocument();
  });

  it('displays error fallback gracefully when API fails', async () => {
    geminiService.getGeminiResponse.mockRejectedValueOnce(new Error('Network error'));
    render(<Assistant />);
    
    const input = screen.getByLabelText(/Message input/i);
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Is EVM safe?' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/I'm having trouble connecting right now/i)).toBeInTheDocument();
    });
  });
});
