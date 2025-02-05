import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { APOD, NearEarthObject, NEOFeed } from '../types/nasa';
import { NASA_API_CONFIG, getApiUrl } from '../config/api';

export class NasaStore {
  apod: APOD | null = null;
  neoList: NearEarthObject[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAPOD() {
    try {
      this.loading = true;
      const response = await axios.get<APOD>(
        `${getApiUrl('APOD')}?api_key=${NASA_API_CONFIG.API_KEY}`
      );
      runInAction(() => {
        this.apod = response.data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch APOD';
        this.loading = false;
      });
    }
  }

  async fetchNEO(startDate: string, endDate: string) {
    try {
      this.loading = true;
      const response = await axios.get<NEOFeed>(
        `${getApiUrl(
          'NEO_FEED'
        )}?start_date=${startDate}&end_date=${endDate}&api_key=${
          NASA_API_CONFIG.API_KEY
        }`
      );
      runInAction(() => {
        this.neoList = Object.values(response.data.near_earth_objects).flat();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch NEO data';
        this.loading = false;
      });
    }
  }

  toggleFavorite(id: string) {
    const neo = this.neoList.find((item) => item.id === id);
    if (neo) {
      neo.isFavorite = !neo.isFavorite;
    }
  }
}

export const nasaStore = new NasaStore();
