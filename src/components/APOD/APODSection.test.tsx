import React from 'react';
import { render, screen } from '@testing-library/react';
import APODSection from './APODSection';
import { APOD } from '../../types/nasa';

describe('APODSection', () => {
    test('should not render if apod is null', () => {
        // Given
        const apod = null;

        // When
        const { container } = render(<APODSection apod={apod} />);

        // Then
        expect(container.firstChild).toBeNull();
    });

    test('should render apod', () => {
        const apod: APOD = {
            "date": "2025-02-03",
            "explanation": "Some stars explode in slow motion.",
            "hdurl": "https://example.come/example-image.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "Star 124",
            "url": "https://example.come/example-image.jpg"
        }

        // When
        render(<APODSection apod={apod} />);

        // Then
        expect(screen.getByText('Astronomy Picture of the Day')).toBeInTheDocument();
        expect(screen.getByText('Star 124')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Star 124' })).toHaveAttribute('src', 'https://example.come/example-image.jpg');
        expect(screen.getByText('Some stars explode in slow motion.')).toBeInTheDocument();
    });
});
