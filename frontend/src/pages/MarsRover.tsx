import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { nasaApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MarsRover = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);

  const { data, isLoading, error } = useQuery({
    queryKey: ['mars-photos', rover, sol],
    queryFn: () => nasaApi.getMarsRoverPhotos(rover, sol).then(res => res.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load Mars rover photos" />;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Mars Rover Photos</h1>
        <p className="text-xl text-gray-300">
          Explore Mars through the eyes of NASA's rovers
        </p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={rover}
            onChange={(e) => setRover(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
            <option value="perseverance">Perseverance</option>
          </select>
          
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(Number(e.target.value))}
            placeholder="Sol (Mars day)"
            min="0"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.photos.slice(0, 24).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all duration-300"
            >
              <img
                src={photo.img_src}
                alt={`Mars photo by ${photo.rover.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-2">
                  Sol {photo.sol} • {photo.earth_date}
                </div>
                <div className="text-white font-medium">{photo.camera.full_name}</div>
                <div className="text-purple-400 text-sm">{photo.rover.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarsRover;