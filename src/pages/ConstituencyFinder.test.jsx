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

  it('disables the search button for invalid empty input', async () => {
    render(<ConstituencyFinder />);
    const input = screen.getByPlaceholderText(/e.g. 500001/i);
    // Enter only spaces
    fireEvent.change(input, { target: { value: '   ' } });
    
    const btn = screen.getByRole('button', { name: /Find Constituency/i });
    expect(btn).toBeDisabled();
  });

  it('renders error fallback correctly when geolocation is unavailable', async () => {
    // Mock navigator.geolocation as undefined
    const originalGeolocation = global.navigator.geolocation;
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    render(<ConstituencyFinder />);
    const locateBtn = screen.getByRole('button', { name: /Use my current location/i });
    fireEvent.click(locateBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Geolocation is not supported by your browser/i)).toBeInTheDocument();
    });

    // Restore original
    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
    });
  });
});
