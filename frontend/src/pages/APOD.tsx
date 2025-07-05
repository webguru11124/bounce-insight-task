import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CalendarIcon, ArrowLeftIcon, ArrowRightIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { nasaApi, type APODData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const APOD = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'single' | 'range'>('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: apodData, isLoading, error } = useQuery<APODData>({
    queryKey: ['apod', selectedDate],
    queryFn: () => nasaApi.getAPOD(selectedDate).then(res => res.data),
    enabled: viewMode === 'single',
  });

  const { data: apodRangeData, isLoading: isLoadingRange, error: rangeError } = useQuery<APODData[]>({
    queryKey: ['apod-range', startDate, endDate],
    queryFn: () => nasaApi.getAPODRange(startDate, endDate).then(res => res.data),
    enabled: viewMode === 'range' && !!startDate && !!endDate,
  });

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const today = new Date().toISOString().split('T')[0];

  if (isLoading || isLoadingRange) return <LoadingSpinner />;
  if (error || rangeError) return <ErrorMessage message="Failed to load APOD data" />;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Astronomy Picture of the Day
        </h1>
        <p className="text-xl text-gray-300">
          Discover the cosmos through NASA's daily featured images
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'single'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Single Day
            </button>
            <button
              onClick={() => setViewMode('range')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'range'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Date Range
            </button>
          </div>

          {viewMode === 'single' ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={today}
                  min="1995-06-16"
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => navigateDate('next')}
                disabled={selectedDate >= today}
                className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={today}
                min="1995-06-16"
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Start Date"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                max={today}
                min={startDate || "1995-06-16"}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="End Date"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      {viewMode === 'single' && apodData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{apodData.title}</h2>
              <span className="text-purple-400 font-medium">{apodData.date}</span>
            </div>
            
            {apodData.copyright && (
              <p className="text-gray-400 text-sm mb-4">© {apodData.copyright}</p>
            )}
          </div>

          <div className="relative">
            {apodData.media_type === 'image' ? (
              <img
                src={apodData.url}
                alt={apodData.title}
                className="w-full h-auto max-h-96 object-contain bg-black"
              />
            ) : (
              <div className="aspect-video bg-black flex items-center justify-center">
                <iframe
                  src={apodData.url}
                  className="w-full h-full"
                  allowFullScreen
                  title={apodData.title}
                />
              </div>
            )}
            
            {apodData.hdurl && (
              <a
                href={apodData.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
              >
                <EyeIcon className="h-5 w-5" />
              </a>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center mb-3">
              <DocumentTextIcon className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Explanation</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{apodData.explanation}</p>
          </div>
        </motion.div>
      )}

      {viewMode === 'range' && apodRangeData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {apodRangeData.map((item, index) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all duration-300"
            >
              <div className="aspect-video bg-black">
                {item.media_type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-400">
                    <EyeIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm truncate">{item.title}</h3>
                  <span className="text-xs text-purple-400">{item.date}</span>
                </div>
                <p className="text-gray-400 text-xs line-clamp-3">{item.explanation}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default APOD;