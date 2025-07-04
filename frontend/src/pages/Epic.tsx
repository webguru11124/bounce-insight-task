import React from 'react';
import { Card } from '../components/ui/card';
import { useEpic } from '../hooks/useEpic';

export default function Epic() {
  const { data, error, isLoading } = useEpic();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load EPIC images</p>;

  return (
    <Card>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data?.map((item) => {
          const [year, month, day] = item.date.split(' ')[0].split('-');
          const url = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;
          return <img key={item.image} src={url} alt={item.caption} className="rounded" />;
        })}
      </div>
    </Card>
  );
}
