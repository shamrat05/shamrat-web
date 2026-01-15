import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProjectPage } from './pages/ProjectPage';
import { CookieConsent } from './components/CookieConsent';
import { useAnalytics } from './hooks/useAnalytics';
import './index.css';

// Component to handle analytics hooks inside Router
const AppContent = () => {
  useAnalytics(); // Initialize smart tracking
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-bg-page text-text-primary overflow-hidden font-sans flex flex-col"
      >
        <Navigation />

        <main className="flex-grow pt-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectPage />} />
          </Routes>
        </main>

        <Footer />
        <CookieConsent />
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