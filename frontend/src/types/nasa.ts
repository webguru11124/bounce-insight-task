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

export interface EarthImageryData {
  id?: string;
  url?: string;
  dataset?: string;
  cloud_score?: number;
  sun_elevation?: number;
}

export type RoverName = 'curiosity' | 'opportunity' | 'spirit' | 'perseverance';