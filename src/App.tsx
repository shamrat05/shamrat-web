import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { useAnalytics } from './hooks/useAnalytics';
import { SectionLoader } from './components/SectionLoader';
import { AISearch } from './components/AISearch';
import { CommandPalette } from './components/CommandPalette';
import { usePageTitle } from './hooks/usePageTitle';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import { BackgroundEffect } from './components/ui/BackgroundEffect';
import './index.css';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));

// Component to handle analytics hooks inside Router
const AppContent = () => {
  useAnalytics(); // Initialize smart tracking
  usePageTitle(); // Handle dynamic page titles
  useDynamicFavicon(); // Handle dynamic favicon

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-transparent text-text-primary overflow-hidden font-sans flex flex-col relative"
      >
        <BackgroundEffect />
        <Navigation />

        <main className="flex-grow pt-0">
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><SectionLoader /></div>}>
            <Routes>
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
      </motion.div>
    </AnimatePresence>
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