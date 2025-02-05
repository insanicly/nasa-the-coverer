import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NEOSection from './NEOSection';
import { NearEarthObject } from '../../types/nasa';

describe('NEOSection', () => {
    const mockOnToggleFavorite = jest.fn();
    const neoList: NearEarthObject[] = [
            {
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
            },
            {
                absolute_magnitude_h: 1,
                close_approach_data: [
                    {
                        close_approach_date: "2021-08-11",
                        miss_distance: {kilometers: "1"},
                        relative_velocity: {kilometers_per_hour: "1"}
                    }
                ],
                estimated_diameter: {kilometers: {estimated_diameter_max: 5, estimated_diameter_min: 5}},
                id: "2",
                isFavorite: false,
                is_potentially_hazardous_asteroid: false,
                name: "Apophis",
                nasa_jpl_url: "https://www.nasa.gov",
                neo_reference_id: "2"
            }
        ]

    test('should render list of neo', () => {
        // When
        render(<NEOSection neoList={neoList} onToggleFavorite={mockOnToggleFavorite} />);

        // Then
        expect(screen.getByText('Bennu')).toBeInTheDocument();
        expect(screen.getByText('Apophis')).toBeInTheDocument();
    });

    test('should not render any neo if the list is empty', () => {
        // When
        render(<NEOSection neoList={[]} onToggleFavorite={mockOnToggleFavorite} />);

        // Then
        expect(screen.queryByText('Bennu')).not.toBeInTheDocument();
        expect(screen.queryByText('Apophis')).not.toBeInTheDocument();
    });
});
