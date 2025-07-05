import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { nasaApi, type NeoData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import NEOChart from '../components/NEOChart';

const NearEarthObjects = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const { data, isLoading, error } = useQuery<{ near_earth_objects: Record<string, NeoData[]> }>({
    queryKey: ['neo', startDate, endDate],
    queryFn: () => nasaApi.getNearEarthObjects(startDate, endDate).then(res => res.data),
    enabled: !!startDate && !!endDate,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load Near Earth Objects data" />;

  const allNeos = data ? Object.values(data.near_earth_objects).flat() : [];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Near Earth Objects</h1>
        <p className="text-xl text-gray-300">
          Track asteroids and comets approaching Earth
        </p>
      </motion.div>

      <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {allNeos.length > 0 && (
        <>
          <NEOChart neos={allNeos} />
          <div className="space-y-4">
          {allNeos.map((neo, index) => (
            <motion.div
              key={neo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className={`bg-black/40 backdrop-blur-sm border rounded-xl p-6 ${
                neo.is_potentially_hazardous_asteroid
                  ? 'border-red-500/30 hover:border-red-500/60'
                  : 'border-purple-500/30 hover:border-purple-500/60'
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{neo.name}</h3>
                  {neo.is_potentially_hazardous_asteroid && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                      Potentially Hazardous
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Diameter (meters)</div>
                  <div className="text-white">
                    {Math.round(neo.estimated_diameter.meters.estimated_diameter_min)} - {Math.round(neo.estimated_diameter.meters.estimated_diameter_max)}
                  </div>
                </div>
              </div>

              {neo.close_approach_data.map((approach, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800/50 rounded-lg p-4">
                  <div>
                    <div className="text-gray-400 text-sm">Close Approach Date</div>
                    <div className="text-white">{approach.close_approach_date}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Velocity (km/h)</div>
                    <div className="text-white">{Math.round(Number(approach.relative_velocity.kilometers_per_hour)).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Miss Distance (km)</div>
                    <div className="text-white">{Math.round(Number(approach.miss_distance.kilometers)).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NearEarthObjects;