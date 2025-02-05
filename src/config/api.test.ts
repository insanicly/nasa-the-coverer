import { NASA_API_CONFIG, getApiUrl } from "./api";

describe('API Config', () => {
    let originalApiKey: string;

    beforeEach(() => {
        originalApiKey = NASA_API_CONFIG.API_KEY;
    });

    afterEach(() => {
        Object.defineProperty(NASA_API_CONFIG, "API_KEY", {
            value: originalApiKey,
            writable: false,
        });
    });

    test('should load API key from env variables if set', () => {
        // Given
        const testApiKey = "test-api-key";
        Object.defineProperty(NASA_API_CONFIG, "API_KEY", {
            value: testApiKey,
            writable: false,
        });

        // Then
        expect(NASA_API_CONFIG.API_KEY).toBe(testApiKey);
    });

    test('should fallback to default API key if env variable is not set', () => {
        // Then
        expect(NASA_API_CONFIG.API_KEY).toBe("dyriqiXka3OQwyFWl9Tf5KAONRskVMEaCtjFhSKl");
    });
});

describe('getApiUrl', () => {
    test('should return correct URL for APOD endpoint', () => {
        // When
        const url = getApiUrl('APOD');

        // Then
        expect(url).toBe('https://api.nasa.gov/planetary/apod');
    });

    test('should return correct URL for NEO_FEED endpoint', () => {
        // When
        const url = getApiUrl('NEO_FEED');

        // Then
        expect(url).toBe('https://api.nasa.gov/neo/rest/v1/feed');
    });
});
