import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Simulator from '../pages/Simulator';

describe('Simulator Component', () => {
  it('renders initial verification step', () => {
    render(<Simulator />);
    expect(screen.getByText(/Step 1: Identity Verification/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Voter ID/i)).toBeInTheDocument();
  });

  it('progresses to EVM voting step on form submit', () => {
    render(<Simulator />);
    
    const verifyBtn = screen.getByRole('button', { name: /Verify Identity/i });
    fireEvent.click(verifyBtn);
    
    expect(screen.getByText(/Electronic Voting Machine \(EVM\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Rahul Sharma/i)).toBeInTheDocument();
  });

  it('progresses to VVPAT and finally Done step when voting', async () => {
    render(<Simulator />);
    
    // Skip to voting
    fireEvent.click(screen.getByRole('button', { name: /Verify Identity/i }));
    
    // Vote for Rahul
    const voteBtn = screen.getByRole('button', { name: /Vote for Rahul Sharma/i });
    fireEvent.click(voteBtn);
    
    expect(screen.getByText(/VVPAT Verification/i)).toBeInTheDocument();
    
    // Fast-forward to trigger the transition
    await waitFor(() => {
      expect(screen.getByText(/Vote Cast Successfully!/i)).toBeInTheDocument();
    });
  });
});
