export const createMockStore = (overrides = {}) => ({
  loading: false,
  error: null,
  apod: {
    date: '2024-01-01',
    explanation: 'Test explanation',
    title: 'Test APOD',
    url: 'https://example.com/image.jpg',
    media_type: 'image',
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
  ...overrides,
});
