import '@testing-library/jest-dom';
import { nasaStore } from "./stores/NasaStore";
import {render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

nasaStore.fetchAPOD = jest.fn();
nasaStore.fetchNEO = jest.fn();
nasaStore.toggleFavorite = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    nasaStore.apod = null;
    nasaStore.neoList = [];
    nasaStore.loading = false;
    nasaStore.error = null;
  });

  test('should call fetchAPOD and fetchNEO on mount', () => {
    // When
    render(<App />);

    // Then
    expect(nasaStore.fetchAPOD).toHaveBeenCalled();
    expect(nasaStore.fetchNEO).toHaveBeenCalled();
  });

  test('should show LoadingSpinner when loading', () => {
    // Given
    nasaStore.loading = true;

    // When
    render(<App />);

    // Then
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test('should show ErrorMessage when error', () => {
    // Given
    nasaStore.error = 'Failed to fetch data';

    // When
    render(<App />);

    // Then
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  test('should render APODSection and NEOSection when data is loaded', async () => {
    // Given
    nasaStore.apod = {
      date: '2021-06-01',
      explanation: 'Test explanation',
      hdurl: 'https://apod.nasa.gov/apod/image/2106/ISS-Exp64-pano-2-1.jpg',
      media_type: 'image',
      service_version: 'v1',
      title: 'Test APOD',
      url: 'https://apod.nasa.gov/apod/image/2106/ISS-Exp64-pano-2-1.jpg',
    };

    nasaStore.neoList = [
        {
          id: '1',
          neo_reference_id: '1',
          name: 'Test NEO',
          nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=1',
          absolute_magnitude_h: 1,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 1,
              estimated_diameter_max: 1,
            },
          },
          is_potentially_hazardous_asteroid: false,
          close_approach_data: [
              {
                close_approach_date: '2021-06-01',
                miss_distance: {
                  kilometers: '1',
                },
                relative_velocity: {
                  kilometers_per_hour: '1',
                },
              },
          ],
          isFavorite: false,
        }
    ];

    // When
    render(<App />);

    // Then
    expect(screen.getByText("NASA Space Explorer")).toBeInTheDocument();
    expect(screen.getByText("Test APOD")).toBeInTheDocument();
    expect(screen.getByText("Test NEO")).toBeInTheDocument();
  });

  test('should call toggleFavorite when a favorite button is clicked', async () => {
    // Given
    nasaStore.apod = {
      date: '2021-06-01',
      explanation: 'Test explanation',
      hdurl: 'https://apod.nasa.gov/apod/image/2106/ISS-Exp64-pano-2-1.jpg',
      media_type: 'image',
      service_version: 'v1',
      title: 'Test APOD',
      url: 'https://apod.nasa.gov/apod/image/2106/ISS-Exp64-pano-2-1.jpg',
    };

    nasaStore.neoList = [
        {
          id: '1',
          neo_reference_id: '1',
          name: 'Test NEO',
          nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=1',
          absolute_magnitude_h: 1,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 1,
              estimated_diameter_max: 1,
            },
          },
          is_potentially_hazardous_asteroid: false,
          close_approach_data: [
              {
                close_approach_date: '2021-06-01',
                miss_distance: {
                  kilometers: '1',
                },
                relative_velocity: {
                  kilometers_per_hour: '1',
                },
              },
          ],
          isFavorite: false,
        }
    ];

    render(<App />);
    await waitFor(() => expect(screen.getByText('Test NEO')).toBeInTheDocument());

    // When
    const favoriteButton = screen.getByTestId('favorite-button');
    userEvent.click(favoriteButton);

    // Then
    expect(nasaStore.toggleFavorite).toHaveBeenCalledWith('1');
  });
});
