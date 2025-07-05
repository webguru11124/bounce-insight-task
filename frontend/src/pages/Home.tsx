import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon, CameraIcon, GlobeAltIcon, MagnifyingGlassIcon, RocketLaunchIcon, MapIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      title: 'Astronomy Picture of the Day',
      description: 'Discover stunning daily images from NASA\'s APOD collection with detailed explanations.',
      icon: StarIcon,
      path: '/apod',
      color: 'from-blue-400 to-purple-500',
    },
    {
      title: 'Mars Rover Photos',
      description: 'Explore the Red Planet through the eyes of NASA\'s Mars rovers.',
      icon: CameraIcon,
      path: '/mars-rover',
      color: 'from-red-400 to-orange-500',
    },
    {
      title: 'Near Earth Objects',
      description: 'Track asteroids and comets approaching Earth with detailed orbital data.',
      icon: GlobeAltIcon,
      path: '/near-earth-objects',
      color: 'from-green-400 to-blue-500',
    },
    {
      title: 'Earth Imagery',
      description: 'View satellite images of Earth from specific locations and dates.',
      icon: MapIcon,
      path: '/earth-imagery',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Image Search',
      description: 'Search through NASA\'s vast image and video library.',
      icon: MagnifyingGlassIcon,
      path: '/image-search',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <RocketLaunchIcon className="h-20 w-20 mx-auto text-purple-400 mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            NASA Explorer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore the cosmos with NASA's incredible data and imagery. Journey through space from the comfort of your browser.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/apod"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Exploring
          </Link>
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            About NASA API
          </a>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Explore the Universe
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={feature.path} className="block">
                  <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Powered by NASA's Open Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
              <div className="text-gray-300">Years of APOD</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">1M+</div>
              <div className="text-gray-300">Mars Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">30k+</div>
              <div className="text-gray-300">Near Earth Objects</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;