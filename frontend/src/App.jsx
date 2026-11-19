import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Results from './pages/Results';
import About from './pages/About';

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.('change', handleMotionPreference);
    mediaQuery.addListener?.(handleMotionPreference);
    return () => {
      mediaQuery.removeEventListener?.('change', handleMotionPreference);
      mediaQuery.removeListener?.(handleMotionPreference);
    };
  }, []);

  return (
    <div className={`relative isolate min-h-screen text-[#F4F7FC] ${isDashboard ? 'bg-transparent' : 'bg-[#03191a]'}`}>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px]">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} dashboardBackground={isDashboard} />

          <div className="flex-1 min-h-screen">
            <Navbar onMenuClick={() => setSidebarOpen(true)} dashboardBackground={isDashboard} />
            <main className="relative isolate px-4 pb-10 pt-2 sm:px-6 lg:px-8">
              {isDashboard && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/forest-background.jpg')" }}
                  />
                  {!reducedMotion && !videoUnavailable && (
                    <video
                      className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
                      src="/videos/4116786355-preview.mp4"
                      poster="/forest-background.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      tabIndex={-1}
                      onCanPlay={(event) => {
                        event.currentTarget.play().catch(() => setVideoUnavailable(true));
                      }}
                      onError={() => setVideoUnavailable(true)}
                    />
                  )}
                  <div className="absolute inset-0 z-[2] bg-[#07111F]/[0.16]" />
                </div>
              )}
              <div className="relative z-10 mx-auto max-w-[1600px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/prediction" element={<Prediction />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
            </main>
          </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
