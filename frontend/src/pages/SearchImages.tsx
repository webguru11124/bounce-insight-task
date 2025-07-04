import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useImageSearch } from '../hooks/useImageSearch';

export default function SearchImages() {
  const [query, setQuery] = useState('');

  const { data, error, isLoading, refetch } = useImageSearch(
    query,
    false
  );

  const results = data?.collection?.items || [];

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    refetch();
  };

  return (
    <Card>
      <form onSubmit={search} className="mb-4 flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images"
        />
        <Button type="submit">Search</Button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Search failed</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {results.map((item) => {
          const img = item.links?.[0];
          return img ? (
            <img key={item.data[0].nasa_id} src={img.href} alt={item.data[0].title} className="rounded" />
          ) : null;
        })}
      </div>
    </Card>
  );
}
