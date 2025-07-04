import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/fetcher';

export interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
}

export interface MarsApiResponse {
  photos: MarsPhoto[];
}

export function useMarsPhotos(rover: string, sol: string) {
  return useQuery<MarsApiResponse>({
    queryKey: ['mars-photos', rover, sol],
    queryFn: () => fetchJSON(`/api/mars-photos?rover=${rover}&sol=${sol}`),
  });
}
