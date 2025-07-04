import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/fetcher';

export interface Neo {
  name: string;
  estimated_diameter: { meters: { estimated_diameter_max: number } };
}

export interface NeoResponse {
  near_earth_objects: Record<string, Neo[]>;
}

export function useNeoFeed(start: string, end: string) {
  return useQuery<NeoResponse>({
    queryKey: ['neo', start, end],
    queryFn: () =>
      fetchJSON(`/api/neo?start_date=${start}&end_date=${end}`),
  });
}
