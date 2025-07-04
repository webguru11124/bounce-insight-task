import { useQuery } from '@tanstack/react-query';
import { fetchJSON } from '../lib/fetcher';

export interface SearchItem {
  data: { nasa_id: string; title: string }[];
  links?: { href: string }[];
}

export interface SearchResponse {
  collection: { items: SearchItem[] };
}

export function useImageSearch(query: string, enabled: boolean) {
  return useQuery<SearchResponse>({
    enabled,
    queryKey: ['search', query],
    queryFn: () =>
      fetchJSON(`/api/search-images?q=${encodeURIComponent(query)}`),
  });
}
