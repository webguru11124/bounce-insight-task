import React from 'react';
import { Card } from '../components/ui/card';
import { useNeoFeed } from '../hooks/useNeoFeed';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function NeoFeed() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error, isLoading } = useNeoFeed(today, today);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load NEO data</p>;

  const neos = data?.near_earth_objects?.[today] || [];
  const chartData = {
    labels: neos.map((n) => n.name),
    datasets: [
      {
        label: 'Max diameter (m)',
        data: neos.map((n) => n.estimated_diameter.meters.estimated_diameter_max),
        backgroundColor: 'rgba(59,130,246,0.5)',
      },
    ],
  };

  return (
    <Card>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </Card>
  );
}
