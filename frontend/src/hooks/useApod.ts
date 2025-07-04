import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/fetcher';

export interface ApodData {
  title: string;
  url: string;
  explanation: string;
}

export function useApod() {
  return useQuery<ApodData>({
    queryKey: ['apod'],
    queryFn: () => fetchJSON('/api/apod'),
  });
}
