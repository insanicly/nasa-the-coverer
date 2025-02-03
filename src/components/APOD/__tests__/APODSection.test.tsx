import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import APODSection from '../APODSection';

const mockApod = {
  date: '2024-01-01',
  explanation: 'A beautiful galaxy',
  title: 'Galaxy Photo',
  url: 'https://example.com/image.jpg',
  hdurl: 'https://example.com/image-hd.jpg',
  media_type: 'image' as const,
  service_version: 'v1',
};

describe('APODSection Component', () => {
  it('should render APOD content when data is provided', () => {
    render(<APODSection apod={mockApod} />);
    expect(
      screen.getByText('Astronomy Picture of the Day')
    ).toBeInTheDocument();
    expect(screen.getByText('Galaxy Photo')).toBeInTheDocument();
    expect(screen.getByText('A beautiful galaxy')).toBeInTheDocument();
    expect(screen.getByAltText('Galaxy Photo')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });
  it('should render nothing when apod is null', () => {
    const { container } = render(<APODSection apod={null} />);
    expect(container).toBeEmptyDOMElement();
  });
  it('should handle optional copyright information', () => {
    const apodWithCopyright = {
      ...mockApod,
      copyright: 'John Doe',
    };
    render(<APODSection apod={apodWithCopyright} />);
    expect(screen.getByText('Galaxy Photo')).toBeInTheDocument();
  });
});
