import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('APOD')).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('NEO Feed')).toBeInTheDocument();
    expect(screen.getByText('EPIC')).toBeInTheDocument();
  });
});
