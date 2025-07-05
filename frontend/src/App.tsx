import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import APOD from './pages/APOD';
import MarsRover from './pages/MarsRover';
import NearEarthObjects from './pages/NearEarthObjects';
import ImageSearch from './pages/ImageSearch';
import EarthImagery from './pages/EarthImagery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APOD />} />
              <Route path="/mars-rover" element={<MarsRover />} />
              <Route path="/near-earth-objects" element={<NearEarthObjects />} />
              <Route path="/image-search" element={<ImageSearch />} />
              <Route path="/earth-imagery" element={<EarthImagery />} />
            </Routes>
          </main>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
}

export default App
