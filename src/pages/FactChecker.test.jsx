import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FactChecker from './FactChecker';
import * as geminiService from '../services/geminiService';

vi.mock('../services/geminiService', () => ({
  checkFact: vi.fn(),
}));

describe('FactChecker Component', () => {
  it('renders the initial state correctly', () => {
    render(<FactChecker />);
    expect(screen.getByText(/Election Fact Checker/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check Fact/i })).toBeDisabled();
  });

  it('enables the button when input is provided', () => {
    render(<FactChecker />);
    const input = screen.getByPlaceholderText(/e.g. You can vote online/i);
    fireEvent.change(input, { target: { value: 'Is online voting possible?' } });
    expect(screen.getByRole('button', { name: /Check Fact/i })).toBeEnabled();
  });

  it('displays mock result on trending check click', async () => {
    geminiService.checkFact.mockResolvedValueOnce({
      verdict: "False",
      explanation: "Mock explanation"
    });
    
    render(<FactChecker />);
    const trendingBtn = screen.getByText(/Online voting available\?/i);
    fireEvent.click(trendingBtn);
    
    const checkBtn = screen.getByRole('button', { name: /Check Fact/i });
    fireEvent.click(checkBtn);
    
    await waitFor(() => {
      expect(screen.getByText("False")).toBeInTheDocument();
      expect(screen.getByText("Mock explanation")).toBeInTheDocument();
    });
  });
});
