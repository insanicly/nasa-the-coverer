import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { nasaStore } from './stores/NasaStore';

// Mock the store with initial state
const mockStore = {
  loading: false,
  error: null,
  apod: {
    date: '2024-01-01',
    explanation: 'Test explanation',
    title: 'Test APOD',
    url: 'https://example.com/image.jpg',
    media_type: 'image' as const,
    service_version: 'v1',
  },
  neoList: [
    {
      id: '1',
      name: 'Test Asteroid',
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 0.1,
          estimated_diameter_max: 0.2,
        },
      },
      is_potentially_hazardous_asteroid: true,
      isFavorite: false,
    },
  ],
  fetchAPOD: jest.fn(),
  fetchNEO: jest.fn(),
  toggleFavorite: jest.fn(),
};

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks and set initial state
    jest.clearAllMocks();
    Object.assign(nasaStore, mockStore);
  });

  it('should handle null APOD data', () => {
    nasaStore.loading = false;
    nasaStore.apod = null;
    render(<App />);
    expect(
      screen.queryByText('Astronomy Picture of the Day')
    ).not.toBeInTheDocument();
  });

  it('should handle empty NEO list', () => {
    nasaStore.loading = false;
    nasaStore.neoList = [];
    render(<App />);
    expect(screen.getByText('Near Earth Objects')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /favorite/i })
    ).not.toBeInTheDocument();
  });

  it('should handle NEO favorite toggle', () => {
    nasaStore.loading = false;
    render(<App />);
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });

    fireEvent.click(favoriteButton);
    expect(nasaStore.toggleFavorite).toHaveBeenCalledWith('1');
  });

  it('should handle simultaneous loading states', () => {
    nasaStore.loading = true;
    nasaStore.apod = null;
    nasaStore.neoList = [];

    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('NASA Space Explorer')).not.toBeInTheDocument();
  });

  it('should handle error state with specific error message', () => {
    const errorMessage = 'API Rate Limit Exceeded';
    nasaStore.loading = false;
    nasaStore.error = errorMessage;

    render(<App />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText('NASA Space Explorer')).not.toBeInTheDocument();
  });
});
