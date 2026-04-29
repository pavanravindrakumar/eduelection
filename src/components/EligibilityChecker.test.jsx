import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EligibilityChecker from '../pages/EligibilityChecker';

describe('EligibilityChecker Component', () => {
  it('renders correctly', () => {
    render(<EligibilityChecker />);
    expect(screen.getByText(/Eligibility Checker/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/How old are you\?/i)).toBeInTheDocument();
  });

  it('shows not eligible for under 18', () => {
    render(<EligibilityChecker />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/How old are you\?/i), { target: { value: '16' } });

    const citizenYes = screen.getAllByLabelText('Yes')[0]; // First Yes is for citizen
    fireEvent.click(citizenYes);

    const residentYes = screen.getAllByLabelText('Yes')[1]; // Second Yes is for resident
    fireEvent.click(residentYes);

    const disqualifiedNo = screen.getAllByLabelText('No')[2]; // Third No is for disqualified
    fireEvent.click(disqualifiedNo);

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Check my voting eligibility/i }));

    // Assert
    expect(screen.getByText(/Not Eligible/i)).toBeInTheDocument();
    expect(screen.getByText(/You must be at least 18 years old/i)).toBeInTheDocument();
  });

  it('shows eligible for valid inputs', () => {
    render(<EligibilityChecker />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/How old are you\?/i), { target: { value: '25' } });

    const citizenYes = screen.getAllByLabelText('Yes')[0];
    fireEvent.click(citizenYes);

    const residentYes = screen.getAllByLabelText('Yes')[1];
    fireEvent.click(residentYes);

    const disqualifiedNo = screen.getAllByLabelText('No')[2];
    fireEvent.click(disqualifiedNo);

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Check my voting eligibility/i }));

    // Assert
    expect(screen.getByText(/You are Eligible!/i)).toBeInTheDocument();
    expect(screen.getByText(/You meet all basic requirements to vote/i)).toBeInTheDocument();
  });
});
