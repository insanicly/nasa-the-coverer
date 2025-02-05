import { NasaStore } from "./NasaStore";
import axios from "axios";

import { APOD } from "../types/nasa";
import { runInAction } from "mobx";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("NasaStore", () => {
    let store;
    beforeEach(() => {
        store = new NasaStore();
    });

    test("should initialize with default values", () => {
        expect(store.apod).toBeNull();
        expect(store.neoList).toEqual([]);
        expect(store.loading).toBeFalsy();
        expect(store.error).toBeNull();
    });

    test("fetchAPOD should update state on success", async () => {
        // Given
        const mockApod: APOD = {
            date: "2025-02-03",
            explanation: "Some stars explode in slow motion.",
            hdurl: "https://example.com/example-image.jpg",
            media_type: "image",
            service_version: "v1",
            title: "Star 124",
            url: "https://example.com/example-image.jpg"
        };

        // When
        (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockApod });
        await store.fetchAPOD();

        // Then
        runInAction(() => {
            expect(store.apod).toEqual(mockApod);
            expect(store.loading).toBe(false);
            expect(store.error).toBeNull();
        });
    });

    test('fetchAPOD should set error on failure', async () => {
        // Given
        (mockedAxios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        // When
        await store.fetchAPOD();

        // Then
        runInAction(() => {
            expect(store.apod).toBeNull();
            expect(store.loading).toBe(false);
            expect(store.error).toBe('Failed to fetch APOD');
        });
    });

    test('fetchNEO should update state on success', async () => {
        // Given
        const mockNeoFeed = {
            near_earth_objects: {
                '2025-02-05': [
                    {
                        id: '1',
                        name: 'Test NEO',
                        estimated_diameter: {
                            kilometers: {
                                estimated_diameter_min: 0.1,
                                estimated_diameter_max: 0.2
                            }
                        },
                        is_potentially_hazardous_asteroid: false,
                        is_sentry_object: false,
                        close_approach_data: [],
                        isFavorite: false,
                    }
                ]
            }
        };

        (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockNeoFeed });

        // When
        await store.fetchNEO('2025-02-05', '2025-02-06');

        // Then
        runInAction(() => {
            expect(store.neoList).toEqual(mockNeoFeed.near_earth_objects['2025-02-05']);
            expect(store.neoList[0].id).toBe('1');
            expect(store.neoList[0].name).toBe('Test NEO');
            expect(store.neoList[0].estimated_diameter.kilometers.estimated_diameter_min).toBe(0.1);
            expect(store.neoList[0].estimated_diameter.kilometers.estimated_diameter_max).toBe(0.2);
            expect(store.neoList[0].is_potentially_hazardous_asteroid).toBe(false);
            expect(store.neoList[0].is_sentry_object).toBe(false);
            expect(store.neoList[0].close_approach_data).toEqual([]);
            expect(store.neoList[0].isFavorite).toBe(false);
            expect(store.loading).toBe(false);
            expect(store.error).toBeNull();
        });
    });

    test('fetchNEO should set error on failure', async () => {
        // Given
        (mockedAxios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        // When
        await store.fetchNEO('2025-02-05', '2025-02-06');

        // Then
        runInAction(() => {
            expect(store.neoList).toEqual([]);
            expect(store.loading).toBe(false);
            expect(store.error).toBe('Failed to fetch NEO data');
        });
    });

    test('toggleFavorite should update isFavorite state', () => {
        // Given
        store.neoList = [
            {
                id: '1',
                name: 'Test NEO',
                estimated_diameter: {
                    kilometers: {
                        estimated_diameter_min: 0.1,
                        estimated_diameter_max: 0.2
                    }
                },
                is_potentially_hazardous_asteroid: false,
                is_sentry_object: false,
                close_approach_data: [],
                isFavorite: false,
            }
        ];

        // When
        store.toggleFavorite('1');

        // Then
        expect(store.neoList[0].isFavorite).toBe(true);

        // When
        store.toggleFavorite('1');

        // Then
        expect(store.neoList[0].isFavorite).toBe(false);
    });

    test('toggleFavorite should not update state if id is not found', () => {
        // Given
        store.neoList = [
            {
                id: '1',
                name: 'Test NEO',
                estimated_diameter: {
                    kilometers: {
                        estimated_diameter_min: 0.1,
                        estimated_diameter_max: 0.2
                    }
                },
                is_potentially_hazardous_asteroid: false,
                is_sentry_object: false,
                close_approach_data: [],
                isFavorite: false,
            }
        ];

        // When
        store.toggleFavorite('2');

        // Then
        expect(store.neoList[0].isFavorite).toBe(false);
    });
});
