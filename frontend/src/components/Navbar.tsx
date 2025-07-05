import { Link, useLocation } from 'react-router-dom';
import { RocketLaunchIcon, StarIcon, GlobeAltIcon, CameraIcon, MagnifyingGlassIcon, MapIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: RocketLaunchIcon },
    { path: '/apod', label: 'APOD', icon: StarIcon },
    { path: '/mars-rover', label: 'Mars Rover', icon: CameraIcon },
    { path: '/near-earth-objects', label: 'NEO', icon: GlobeAltIcon },
    { path: '/earth-imagery', label: 'Earth', icon: MapIcon },
    { path: '/image-search', label: 'Search', icon: MagnifyingGlassIcon },
  ];

  return (
    <nav className="bg-black/50 backdrop-blur-lg border-b border-purple-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <RocketLaunchIcon className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">NASA Explorer</span>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;