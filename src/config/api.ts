export const NASA_API_CONFIG = {
  API_KEY:
    process.env.REACT_APP_NASA_API_KEY ||
    'dyriqiXka3OQwyFWl9Tf5KAONRskVMEaCtjFhSKl',
  BASE_URL: 'https://api.nasa.gov',
  ENDPOINTS: {
    APOD: '/planetary/apod',
    NEO_FEED: '/neo/rest/v1/feed',
  },
};

export const getApiUrl = (endpoint: keyof typeof NASA_API_CONFIG.ENDPOINTS) => {
  return `${NASA_API_CONFIG.BASE_URL}${NASA_API_CONFIG.ENDPOINTS[endpoint]}`;
};
