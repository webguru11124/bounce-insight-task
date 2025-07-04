import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApod } from '../hooks/useApod';

export default function Apod() {
  const { data, error, isLoading, refetch } = useApod();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load APOD</p>;

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{data?.title}</h2>
        <Button variant="outline" onClick={() => refetch()}>Refresh</Button>
      </div>
      {data?.url && (
        <img src={data.url} alt={data.title} className="max-w-full rounded" />
      )}
      <p>{data?.explanation}</p>
    </Card>
  );
}
