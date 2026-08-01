import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  abbr: string;
  color: string;
  category?: string;
}

interface GridMotionProps {
  items: TechItem[];
  className?: string;
}

export const GridMotion: React.FC<GridMotionProps> = ({ items, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Split items into 2 continuous motion rows
  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-10 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Row 1 - Left to Right */}
      <div className="flex w-max gap-4 mb-4 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
        <motion.div
          className="flex gap-4"
          style={{ willChange: 'transform' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...row1, ...row1].map((item, idx) => (
            <motion.div
              key={`r1-${idx}`}
              whileHover={{ scale: 1.06, y: -4 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer group ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-primary-500/40'
                  : 'bg-black/[0.04] border-black/10 hover:bg-black/[0.08] hover:border-primary-500/40'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner transition-transform group-hover:scale-110"
                style={{
                  background: isDark ? `${item.color}25` : `${item.color}18`,
                  color: item.color,
                  border: `1px solid ${item.color}44`,
                }}
              >
                {item.abbr}
              </div>
              <span className={`font-semibold text-sm whitespace-nowrap transition-colors ${
                isDark ? 'text-text-primary group-hover:text-white' : 'text-[#0a0a0a] group-hover:text-black font-bold'
              }`}>
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex w-max gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
        <motion.div
          className="flex gap-4"
          style={{ willChange: 'transform' }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...row2, ...row2].map((item, idx) => (
            <motion.div
              key={`r2-${idx}`}
              whileHover={{ scale: 1.06, y: -4 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-md cursor-pointer group ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-primary-500/40'
                  : 'bg-black/[0.04] border-black/10 hover:bg-black/[0.08] hover:border-primary-500/40'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner transition-transform group-hover:scale-110"
                style={{
                  background: isDark ? `${item.color}25` : `${item.color}18`,
                  color: item.color,
                  border: `1px solid ${item.color}44`,
                }}
              >
                {item.abbr}
              </div>
              <span className={`font-semibold text-sm whitespace-nowrap transition-colors ${
                isDark ? 'text-text-primary group-hover:text-white' : 'text-[#0a0a0a] group-hover:text-black font-bold'
              }`}>
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
