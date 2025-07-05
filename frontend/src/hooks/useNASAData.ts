import { useQuery } from '@tanstack/react-query';
import { nasaApi, type APODData, type NeoData, type MarsRoverPhoto, type NASAImageSearchResult } from '../services/api';

export const useAPOD = (date?: string) => {
  return useQuery<APODData>({
    queryKey: ['apod', date],
    queryFn: () => nasaApi.getAPOD(date).then(res => res.data),
    enabled: !!date,
  });
};

export const useAPODRange = (startDate: string, endDate: string) => {
  return useQuery<APODData[]>({
    queryKey: ['apod-range', startDate, endDate],
    queryFn: () => nasaApi.getAPODRange(startDate, endDate).then(res => res.data),
    enabled: !!startDate && !!endDate,
  });
};

export const useMarsRoverPhotos = (rover: string, sol?: number, earthDate?: string) => {
  return useQuery<{ photos: MarsRoverPhoto[] }>({
    queryKey: ['mars-photos', rover, sol, earthDate],
    queryFn: () => nasaApi.getMarsRoverPhotos(rover, sol, earthDate).then(res => res.data),
    enabled: !!rover,
  });
};

export const useNearEarthObjects = (startDate: string, endDate: string) => {
  return useQuery<{ near_earth_objects: Record<string, NeoData[]> }>({
    queryKey: ['neo', startDate, endDate],
    queryFn: () => nasaApi.getNearEarthObjects(startDate, endDate).then(res => res.data),
    enabled: !!startDate && !!endDate,
  });
};

export const useNASAImageSearch = (query: string) => {
  return useQuery<NASAImageSearchResult>({
    queryKey: ['nasa-search', query],
    queryFn: () => nasaApi.searchNASAImages(query).then(res => res.data),
    enabled: !!query && query.length > 2,
  });
};