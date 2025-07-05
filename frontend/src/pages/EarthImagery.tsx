import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { GlobeAltIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EarthImagery = () => {
  const [lat, setLat] = useState('29.7604'); // Houston, TX
  const [lon, setLon] = useState('-95.3698');
  const [date, setDate] = useState('2022-01-01');
  const [searchParams, setSearchParams] = useState({ lat: '', lon: '', date: '' });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['earth-imagery', searchParams.lat, searchParams.lon, searchParams.date],
    queryFn: () => api.get('/nasa/earth-imagery', {
      params: { lat: searchParams.lat, lon: searchParams.lon, date: searchParams.date }
    }).then((res: any) => res.data),
    enabled: !!searchParams.lat && !!searchParams.lon && !!searchParams.date,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (lat && lon && date) {
      setSearchParams({ lat, lon, date });
    }
  };

  const presetLocations = [
    { name: 'New York City', lat: '40.7128', lon: '-74.0060' },
    { name: 'London', lat: '51.5074', lon: '-0.1278' },
    { name: 'Tokyo', lat: '35.6762', lon: '139.6503' },
    { name: 'Sydney', lat: '-33.8688', lon: '151.2093' },
    { name: 'Cairo', lat: '30.0444', lon: '31.2357' },
    { name: 'Rio de Janeiro', lat: '-22.9068', lon: '-43.1729' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Earth Imagery
        </h1>
        <p className="text-xl text-gray-300">
          View satellite images of Earth from specific locations and dates
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              <MapPinIcon className="inline h-4 w-4 mr-1" />
              Latitude
            </label>
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              step="0.0001"
              min="-90"
              max="90"
              placeholder="e.g., 40.7128"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              <MapPinIcon className="inline h-4 w-4 mr-1" />
              Longitude
            </label>
            <input
              type="number"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              step="0.0001"
              min="-180"
              max="180"
              placeholder="e.g., -74.0060"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              <CalendarIcon className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min="2014-01-01"
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Quick locations:</p>
          <div className="flex flex-wrap gap-2">
            {presetLocations.map((location) => (
              <button
                key={location.name}
                type="button"
                onClick={() => {
                  setLat(location.lat);
                  setLon(location.lon);
                }}
                className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-lg text-sm hover:bg-purple-600/30 transition-colors"
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
        >
          <GlobeAltIcon className="h-5 w-5 mr-2" />
          View Earth Imagery
        </button>
      </motion.form>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to load Earth imagery" onRetry={() => refetch()} />}

      {data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Earth at {searchParams.lat}°, {searchParams.lon}°
            </h2>
            <p className="text-gray-300 mb-2">
              Date: {searchParams.date}
            </p>
            
            {data.url ? (
              <div className="mt-4">
                <img
                  src={data.url}
                  alt={`Earth imagery at ${searchParams.lat}, ${searchParams.lon}`}
                  className="w-full h-auto rounded-lg"
                />
                
                {data.id && (
                  <div className="mt-4 text-sm text-gray-400">
                    <p>Image ID: {data.id}</p>
                    {data.dataset && <p>Dataset: {data.dataset}</p>}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <GlobeAltIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No imagery available for this location and date.
                  Try a different date or location.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-2">About Earth Imagery</h3>
        <p className="text-gray-300 text-sm">
          This data is collected by NASA's Earth Polychromatic Imaging Camera (EPIC) and Landsat satellites. 
          The imagery shows how Earth looks from space on specific dates. Note that cloud cover and data 
          availability may affect image quality for certain locations and dates.
        </p>
      </motion.div>
    </div>
  );
};

export default EarthImagery;