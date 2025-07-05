import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

export interface APODData {
  date: string;
  explanation: string;
  media_type: string;
  title: string;
  url: string;
  hdurl?: string;
  thumbnail_url?: string;
  copyright?: string;
}

export interface MarsRoverPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  sol: number;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    status: string;
    max_sol: number;
    max_date: string;
  };
}

export interface NeoData {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

export interface NASAImageSearchResult {
  collection: {
    items: Array<{
      href: string;
      data: Array<{
        nasa_id: string;
        title: string;
        description: string;
        date_created: string;
        keywords: string[];
      }>;
      links: Array<{
        href: string;
        rel: string;
        render: string;
      }>;
    }>;
  };
}

export const nasaApi = {
  getAPOD: (date?: string) => api.get<APODData>('/nasa/apod', { params: date ? { date } : {} }),
  getAPODRange: (start_date: string, end_date: string) => 
    api.get<APODData[]>('/nasa/apod/range', { params: { start_date, end_date } }),
  getMarsRoverPhotos: (rover: string = 'curiosity', sol?: number, earth_date?: string) =>
    api.get<{ photos: MarsRoverPhoto[] }>(`/nasa/mars-photos/${rover}`, {
      params: { ...(sol && { sol }), ...(earth_date && { earth_date }) },
    }),
  getNearEarthObjects: (start_date: string, end_date: string) =>
    api.get<{ near_earth_objects: Record<string, NeoData[]> }>('/nasa/neo', {
      params: { start_date, end_date },
    }),
  searchNASAImages: (query: string) =>
    api.get<NASAImageSearchResult>('/nasa/search', { params: { q: query } }),
};