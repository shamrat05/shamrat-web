import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const SESSION_KEY = 'ai-suggestion-seen';

export const AiSuggestionToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const isAiChatOpen = usePortfolioStore((state) => state.isAiChatOpen);

  useEffect(() => {
    if (isAiChatOpen) {
      setVisible(false);
      return;
    }
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;

    const timer = setTimeout(() => setVisible(true), 4000);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isAiChatOpen]);

  const handleOpen = useCallback(() => {
    setAiChatOpen(true);
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  }, [setAiChatOpen]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, '1');
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-20 right-6 z-40 cursor-pointer"
          onClick={handleOpen}
        >
          <div
            className="relative flex items-center gap-3 px-4 py-3 rounded-2xl overflow-hidden group"
            style={{
              background: 'rgba(10,10,12,0.85)',
              backdropFilter: 'blur(20px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px -4px rgba(0,0,0,0.5), 0 0 20px -4px rgba(121,206,255,0.15)',
            }}
          >
            {/* Animated gradient border glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(121,206,255,0.1), rgba(97,201,23,0.1), rgba(121,206,255,0.1))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
              }}
            />

            {/* Grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                filter: 'url(#grain-filter)',
                opacity: 0.04,
                mixBlendMode: 'soft-light',
              }}
            />

            {/* Cat GIF */}
            <div className="relative shrink-0">
              <img
                src="/cat-hello.gif"
                alt=""
                className="w-9 h-9 object-contain"
              />
              {/* Sparkle pulse ring */}
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  border: '1.5px solid rgba(121,206,255,0.4)',
                }}
              />
            </div>

            {/* Text */}
            <div className="relative flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white/90 leading-tight">
                Ask me anything
              </span>
              <span className="text-[10px] text-white/40 leading-tight mt-0.5">
                about Shamrat's work & skills
              </span>
            </div>

            {/* Sparkle icon */}
            <motion.div
              className="relative shrink-0 ml-1"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles size={14} className="text-[#79ceff]" />
            </motion.div>

            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="relative shrink-0 p-1 rounded-full transition-colors duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <X size={12} />
            </button>
          </div>

          {/* Connector line to nav AI button */}
          <div
            className="absolute -top-3 right-7 w-px h-3"
            style={{
              background: 'linear-gradient(to top, rgba(121,206,255,0.3), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
