import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import TimelinePage from './TimelinePage';

describe('TimelinePage Component', () => {
  it('renders without crashing', () => {
    render(<TimelinePage />);
  });
});