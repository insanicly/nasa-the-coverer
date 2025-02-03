import { nasaStore } from '../NasaStore';
import axios from 'axios';
import { NASA_API_CONFIG } from '../../config/api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NasaStore', () => {
  beforeEach(() => {
    // Clear all mocks and reset store state
    jest.clearAllMocks();
    nasaStore.apod = null;
    nasaStore.neoList = [];
    nasaStore.loading = false;
    nasaStore.error = null;
  });

  describe('fetchAPOD', () => {
    const mockAPODResponse = {
      date: '2024-01-01',
      explanation: 'Test explanation',
      title: 'Test APOD',
      url: 'https://example.com/image.jpg',
      media_type: 'image' as const,
      service_version: 'v1',
    };

    it('should fetch APOD successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockAPODResponse });

      await nasaStore.fetchAPOD();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS.APOD}?api_key=${NASA_API_CONFIG.API_KEY}`
      );
      expect(nasaStore.apod).toEqual(mockAPODResponse);
      expect(nasaStore.loading).toBe(false);
      expect(nasaStore.error).toBeNull();
    });

    it('should handle APOD fetch error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await nasaStore.fetchAPOD();

      expect(nasaStore.error).toBe('Failed to fetch APOD');
      expect(nasaStore.loading).toBe(false);
      expect(nasaStore.apod).toBeNull();
    });
  });

  describe('fetchNEO', () => {
    const mockNEOResponse = {
      element_count: 1,
      near_earth_objects: {
        '2024-01-01': [
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
            neo_reference_id: '123',
            nasa_jpl_url: 'https://example.com',
            absolute_magnitude_h: 20.5,
            close_approach_data: [],
          },
        ],
      },
    };

    it('should fetch NEO data successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockNEOResponse });
      const startDate = '2024-01-01';
      const endDate = '2024-01-01';

      await nasaStore.fetchNEO(startDate, endDate);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS.NEO_FEED}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_CONFIG.API_KEY}`
      );
      expect(nasaStore.neoList).toHaveLength(1);
      expect(nasaStore.loading).toBe(false);
      expect(nasaStore.error).toBeNull();
    });

    it('should handle NEO fetch error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await nasaStore.fetchNEO('2024-01-01', '2024-01-01');

      expect(nasaStore.error).toBe('Failed to fetch NEO data');
      expect(nasaStore.loading).toBe(false);
      expect(nasaStore.neoList).toHaveLength(0);
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle favorite status of NEO', () => {
      const mockNEO = {
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
        neo_reference_id: '123',
        nasa_jpl_url: 'https://example.com',
        absolute_magnitude_h: 20.5,
        close_approach_data: [],
      };

      nasaStore.neoList = [mockNEO];
      nasaStore.toggleFavorite('1');
      expect(nasaStore.neoList[0].isFavorite).toBe(true);

      nasaStore.toggleFavorite('1');
      expect(nasaStore.neoList[0].isFavorite).toBe(false);
    });

    it('should handle non-existent NEO ID', () => {
      nasaStore.neoList = [];
      nasaStore.toggleFavorite('non-existent');
      // Should not throw error and state should remain unchanged
      expect(nasaStore.neoList).toHaveLength(0);
    });
  });
});
