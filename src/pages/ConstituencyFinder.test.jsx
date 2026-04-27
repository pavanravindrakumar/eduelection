import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConstituencyFinder from './ConstituencyFinder';

describe('ConstituencyFinder Component', () => {
  it('renders correctly', () => {
    render(<ConstituencyFinder />);
    expect(screen.getByText(/Constituency & Polling Booth Finder/i)).toBeInTheDocument();
  });

  it('shows result after searching pincode', async () => {
    render(<ConstituencyFinder />);
    const input = screen.getByPlaceholderText(/e.g. 500001/i);
    fireEvent.change(input, { target: { value: '500001' } });
    
    const btn = screen.getByRole('button', { name: /Find Constituency/i });
    fireEvent.click(btn);
    
    await waitFor(() => {
      expect(screen.getByText(/Hyderabad Central/i)).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});
