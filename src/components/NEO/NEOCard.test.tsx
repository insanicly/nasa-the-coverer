import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NEOCard from './NEOCard';
import { NearEarthObject } from '../../types/nasa';

describe('NEOCard', () => {
    test('should render neo details', () => {
        // Given
        const neo: NearEarthObject = {
            absolute_magnitude_h: 1,
            close_approach_data: [
                {
                    close_approach_date: "2021-08-11",
                    miss_distance: {kilometers: "1"},
                    relative_velocity: {kilometers_per_hour: "1"}
                }
            ],
            estimated_diameter: {kilometers: {estimated_diameter_max: 5, estimated_diameter_min: 5}},
            id: "1",
            isFavorite: false,
            is_potentially_hazardous_asteroid: false,
            name: "Bennu",
            nasa_jpl_url: "https://www.nasa.gov",
            neo_reference_id: "1"
        }
        const onToggleFavorite = jest.fn();

        // When
        render(<NEOCard neo={neo} onToggleFavorite={onToggleFavorite} />);

        // Then
        expect(screen.getByText('Bennu')).toBeInTheDocument();
        expect(screen.getByText('Diameter: 5.00 km')).toBeInTheDocument();
        expect(screen.getByText('Hazardous: No')).toBeInTheDocument();
    });

    test('should apply favorite-active class if neo is favorite', () => {
        // Given
        const neo: NearEarthObject = {
            absolute_magnitude_h: 1,
            close_approach_data: [
                {
                    close_approach_date: "2021-08-11",
                    miss_distance: {kilometers: "1"},
                    relative_velocity: {kilometers_per_hour: "1"}
                }
            ],
            estimated_diameter: {kilometers: {estimated_diameter_max: 5, estimated_diameter_min: 5}},
            id: "1",
            isFavorite: true,
            is_potentially_hazardous_asteroid: false,
            name: "Bennu",
            nasa_jpl_url: "https://www.nasa.gov",
            neo_reference_id: "1"
        }
        const onToggleFavorite = jest.fn();

        // When
        render(<NEOCard neo={neo} onToggleFavorite={onToggleFavorite} />);

        // Then
        const button = screen.getByRole('button', { name: 'favorite' });
        expect(button).toHaveClass('favorite-active');
    });

    test('should call onToggleFavorite when favorite button is clicked', () => {
        // Given
        const neo: NearEarthObject = {
            absolute_magnitude_h: 1,
            close_approach_data: [
                {
                    close_approach_date: '2021-08-11',
                    miss_distance: { kilometers: '1' },
                    relative_velocity: { kilometers_per_hour: '1' },
                },
            ],
            estimated_diameter: { kilometers: { estimated_diameter_max: 5, estimated_diameter_min: 5 } },
            id: '9876',
            isFavorite: false,
            is_potentially_hazardous_asteroid: false,
            name: 'Bennu',
            nasa_jpl_url: 'https://www.nasa.gov',
            neo_reference_id: '1',
        };

        const onToggleFavorite = jest.fn();

        // When
        render(<NEOCard neo={neo} onToggleFavorite={onToggleFavorite} />);
        const favoriteButton = screen.getByRole('button', { name: 'favorite' });

        // Then
        expect(favoriteButton).not.toHaveClass('favorite-active');

        // When
        fireEvent.click(favoriteButton);

        // Then
        expect(onToggleFavorite).toHaveBeenCalledTimes(1);
        expect(onToggleFavorite).toHaveBeenCalledWith('9876');
    });

    test('should render hazardous status correctly - YES', () => {
        // Given
        const neo: NearEarthObject = {
            absolute_magnitude_h: 1,
            close_approach_data: [
                {
                    close_approach_date: "2021-08-11",
                    miss_distance: {kilometers: "1"},
                    relative_velocity: {kilometers_per_hour: "1"}
                }
            ],
            estimated_diameter: {kilometers: {estimated_diameter_max: 5, estimated_diameter_min: 5}},
            id: "1",
            isFavorite: false,
            is_potentially_hazardous_asteroid: true,
            name: "Bennu",
            nasa_jpl_url: "https://www.nasa.gov",
            neo_reference_id: "1"
        }
        const onToggleFavorite = jest.fn();

        // When
        render(<NEOCard neo={neo} onToggleFavorite={onToggleFavorite} />);

        // Then
        expect(screen.getByText(/Hazardous:\s*Yes/i)).toBeInTheDocument();
    });

    test('should render hazardous status correctly - NO', () => {
        // Given
        const neo: NearEarthObject = {
            absolute_magnitude_h: 1,
            close_approach_data: [
                {
                    close_approach_date: "2021-08-11",
                    miss_distance: {kilometers: "1"},
                    relative_velocity: {kilometers_per_hour: "1"}
                }
            ],
            estimated_diameter: {kilometers: {estimated_diameter_max: 5, estimated_diameter_min: 5}},
            id: "1",
            isFavorite: false,
            is_potentially_hazardous_asteroid: false,
            name: "Bennu",
            nasa_jpl_url: "https://www.nasa.gov",
            neo_reference_id: "1"
        }
        const onToggleFavorite = jest.fn();

        // When
        render(<NEOCard neo={neo} onToggleFavorite={onToggleFavorite} />);

        // Then
        expect(screen.getByText(/Hazardous:\s*No/i)).toBeInTheDocument();
    });
});
