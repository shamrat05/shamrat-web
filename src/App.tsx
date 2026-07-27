import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { useAnalytics } from './hooks/useAnalytics';
import { AISearch } from './components/AISearch';
import { CommandPalette } from './components/CommandPalette';
import { usePageTitle } from './hooks/usePageTitle';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import { BackgroundEffect } from './components/ui/BackgroundEffect';
import { PageTransition } from './components/PageTransition';
import { PageLoader } from './components/PageLoader';
import { CursorFollower } from './components/CursorFollower';
import { useIdlePrefetch } from './hooks/useIdlePrefetch';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import './index.css';

// Lazy loaded components with proper loading states
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));

const prefetchTasks = [
  () => import('./pages/BlogPage'),
  () => import('./pages/BlogPostPage'),
  () => import('./pages/PortfolioPage'),
  () => import('./pages/ProjectPage'),
  () => import('./pages/ResumePage'),
];

// Component to handle analytics hooks inside Router
const AppContent = () => {
  useAnalytics();
  usePageTitle();
  useDynamicFavicon();
  usePerformanceMode();
  useIdlePrefetch(prefetchTasks);
  const location = useLocation();

  return (
    <PageTransition location={location}>
      {/* SVG Grain Filter - defined once, referenced everywhere */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <CursorFollower />
      <div className="min-h-screen bg-transparent text-text-primary overflow-hidden font-sans flex flex-col relative">
        <BackgroundEffect />
        <Navigation />

        <main className="flex-grow pt-0">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectPage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <CookieConsent />
        <AISearch />
        <CommandPalette />
      </div>
    </PageTransition>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
        <Analytics />
        <SpeedInsights />
      </Router>
    </HelmetProvider>
  );
}

export default App;
