import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

const Apod = lazy(() => import('./pages/Apod'));
const MarsPhotos = lazy(() => import('./pages/MarsPhotos'));
const SearchImages = lazy(() => import('./pages/SearchImages'));
const NeoFeed = lazy(() => import('./pages/NeoFeed'));
const Epic = lazy(() => import('./pages/Epic'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Apod />} />
            <Route path="/mars" element={<MarsPhotos />} />
            <Route path="/search" element={<SearchImages />} />
            <Route path="/neo" element={<NeoFeed />} />
            <Route path="/epic" element={<Epic />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
