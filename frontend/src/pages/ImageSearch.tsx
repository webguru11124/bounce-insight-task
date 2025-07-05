import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { nasaApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['nasa-search', searchTerm],
    queryFn: () => nasaApi.searchNASAImages(searchTerm).then(res => res.data),
    enabled: !!searchTerm,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">NASA Image Search</h1>
        <p className="text-xl text-gray-300">
          Search through NASA's vast image and video library
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for space images... (e.g., mars, galaxy, nebula)"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </motion.form>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to search NASA images" />}

      {data && data.collection.items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.collection.items.slice(0, 24).map((item, index) => {
            const itemData = item.data[0];
            const imageLink = item.links?.[0];

            return (
              <motion.div
                key={itemData.nasa_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all duration-300"
              >
                {imageLink && (
                  <img
                    src={imageLink.href}
                    alt={itemData.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">
                    {itemData.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-2">
                    {itemData.description}
                  </p>
                  <div className="text-xs text-purple-400">
                    {new Date(itemData.date_created).toLocaleDateString()}
                  </div>
                  {itemData.keywords && itemData.keywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {itemData.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {data && data.collection.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No images found for "{searchTerm}". Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;