import axios from 'axios';

const NASA_BASE_URL = 'https://api.nasa.gov';
const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

const nasaApi = axios.create({
  baseURL: NASA_BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 15000,
});

// Add request interceptor for better error handling
nasaApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('NASA API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('NASA API Request Error:', error.message);
    } else {
      console.error('NASA API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

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

export const nasaService = {
  async getAPOD(date?: string): Promise<APODData> {
    const response = await nasaApi.get('/planetary/apod', {
      params: date ? { date } : {},
    });
    return response.data;
  },

  async getAPODRange(start_date: string, end_date: string): Promise<APODData[]> {
    const response = await nasaApi.get('/planetary/apod', {
      params: { start_date, end_date },
    });
    return response.data;
  },

  async getMarsRoverPhotos(rover: string = 'curiosity', sol: number = 1000): Promise<{ photos: MarsRoverPhoto[] }> {
    const response = await nasaApi.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: { sol },
    });
    return response.data;
  },

  async getMarsRoverPhotosByDate(rover: string = 'curiosity', earth_date: string): Promise<{ photos: MarsRoverPhoto[] }> {
    const response = await nasaApi.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: { earth_date },
    });
    return response.data;
  },

  async getNearEarthObjects(start_date: string, end_date: string): Promise<{ near_earth_objects: Record<string, NeoData[]> }> {
    const response = await nasaApi.get('/neo/rest/v1/feed', {
      params: { start_date, end_date },
    });
    return response.data;
  },

  async searchNASAImageLibrary(query: string): Promise<any> {
    const response = await axios.get('https://images-api.nasa.gov/search', {
      params: { q: query, media_type: 'image' },
    });
    return response.data;
  },

  async getEarthImagery(lat: number, lon: number, date: string): Promise<any> {
    const response = await nasaApi.get('/planetary/earth/imagery', {
      params: { lat, lon, date },
    });
    return response.data;
  },
};