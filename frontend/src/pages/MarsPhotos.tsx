import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useMarsPhotos } from '../hooks/useMarsPhotos';

export default function MarsPhotos() {
  const [rover, setRover] = useState('perseverance');
  const [sol, setSol] = useState('100');

  const { data, error, isLoading, refetch } = useMarsPhotos(rover, sol);

  const photos = data?.photos || [];

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
        className="mb-4 flex gap-2"
      >
        <Input value={rover} onChange={(e) => setRover(e.target.value)} placeholder="rover" />
        <Input value={sol} onChange={(e) => setSol(e.target.value)} placeholder="sol" />
        <Button type="submit">Load</Button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load photos</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((p) => (
          <img key={p.id} src={p.img_src} alt={p.earth_date} className="rounded" />
        ))}
      </div>
    </Card>
  );
}
