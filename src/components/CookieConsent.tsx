import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not overwhelm user immediately
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Here you would trigger analytics initialization if it wasn't already
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 p-6 card-glass bg-bg-surface/95 backdrop-blur-xl border-primary-500/20 shadow-2xl"
        >
          <h4 className="text-lg font-bold text-text-primary mb-2">We value your privacy</h4>
          <p className="text-sm text-text-secondary mb-4">
            We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
