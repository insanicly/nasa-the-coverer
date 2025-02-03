import { NASA_API_CONFIG, getApiUrl } from '../api';

describe('NASA API Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('NASA_API_CONFIG', () => {
    it('should use environment API key when available', () => {
      process.env.REACT_APP_NASA_API_KEY = 'test-api-key';
      // Re-import to get fresh config with new env
      const { NASA_API_CONFIG: freshConfig } = require('../api');
      expect(freshConfig.API_KEY).toBe('test-api-key');
    });

    it('should use fallback API key when environment variable is not set', () => {
      process.env.REACT_APP_NASA_API_KEY = undefined;
      // Re-import to get fresh config with new env
      const { NASA_API_CONFIG: freshConfig } = require('../api');
      expect(freshConfig.API_KEY).toBe(
        'dyriqiXka3OQwyFWl9Tf5KAONRskVMEaCtjFhSKl'
      );
    });

    it('should have correct base URL', () => {
      expect(NASA_API_CONFIG.BASE_URL).toBe('https://api.nasa.gov');
    });

    it('should have correct endpoints', () => {
      expect(NASA_API_CONFIG.ENDPOINTS).toEqual({
        APOD: '/planetary/apod',
        NEO_FEED: '/neo/rest/v1/feed',
      });
    });
  });

  describe('getApiUrl', () => {
    it('should generate correct APOD URL', () => {
      const url = getApiUrl('APOD');
      expect(url).toBe('https://api.nasa.gov/planetary/apod');
    });

    it('should generate correct NEO_FEED URL', () => {
      const url = getApiUrl('NEO_FEED');
      expect(url).toBe('https://api.nasa.gov/neo/rest/v1/feed');
    });

    it('should work with all endpoint keys', () => {
      // Test all endpoints defined in NASA_API_CONFIG.ENDPOINTS
      Object.keys(NASA_API_CONFIG.ENDPOINTS).forEach((endpoint) => {
        const url = getApiUrl(
          endpoint as keyof typeof NASA_API_CONFIG.ENDPOINTS
        );
        expect(url).toBe(
          `${NASA_API_CONFIG.BASE_URL}${
            NASA_API_CONFIG.ENDPOINTS[
              endpoint as keyof typeof NASA_API_CONFIG.ENDPOINTS
            ]
          }`
        );
      });
    });
  });
});
