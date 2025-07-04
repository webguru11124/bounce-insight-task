import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/fetcher';

export interface EpicItem {
  image: string;
  caption: string;
  date: string;
}

export function useEpic() {
  return useQuery<EpicItem[]>({
    queryKey: ['epic'],
    queryFn: () => fetchJSON('/api/epic'),
  });
}
