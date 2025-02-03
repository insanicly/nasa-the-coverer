import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NEOCard from '../NEOCard';

const mockNeo = {
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
  // Required by the type but not used in component
  neo_reference_id: '123',
  nasa_jpl_url: 'https://example.com',
  absolute_magnitude_h: 20.5,
  close_approach_data: [],
};

describe('NEOCard Component', () => {
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render asteroid information correctly', () => {
    render(<NEOCard neo={mockNeo} onToggleFavorite={mockToggleFavorite} />);

    expect(screen.getByText('Test Asteroid')).toBeInTheDocument();
    expect(screen.getByText('Diameter: 0.20 km')).toBeInTheDocument();
    expect(screen.getByText('Hazardous: Yes')).toBeInTheDocument();
  });

  it('should handle favorite toggle', () => {
    render(<NEOCard neo={mockNeo} onToggleFavorite={mockToggleFavorite} />);

    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('should display non-hazardous status correctly', () => {
    const nonHazardousNeo = {
      ...mockNeo,
      is_potentially_hazardous_asteroid: false,
    };

    render(
      <NEOCard neo={nonHazardousNeo} onToggleFavorite={mockToggleFavorite} />
    );

    expect(screen.getByText('Hazardous: No')).toBeInTheDocument();
  });

  it('should apply correct favorite button class when favorited', () => {
    const favoritedNeo = {
      ...mockNeo,
      isFavorite: true,
    };

    render(
      <NEOCard neo={favoritedNeo} onToggleFavorite={mockToggleFavorite} />
    );

    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteButton).toHaveClass('favorite-button', 'favorite-active');
  });
});
