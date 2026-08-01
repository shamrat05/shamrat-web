import React from 'react';
import { motion } from 'framer-motion';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  className?: string;
  speed?: number;
}

export const Aurora: React.FC<AuroraProps> = ({
  colorStops = ['#3B9EFF', '#14b8a6', '#8B5CF6', '#10B981', '#3B9EFF'],
  className = '',
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Aurora Layer 1 - Azure/Teal */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-10%', '-20%'],
          y: ['-10%', '15%', '-20%', '-10%'],
          scale: [1, 1.25, 0.95, 1],
          rotate: [0, 45, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-1/3 -left-1/4 w-[75vw] h-[75vh] rounded-full blur-[120px] opacity-40"
        style={{
          background: `radial-gradient(circle, ${colorStops[0]} 0%, ${colorStops[1]} 60%, transparent 100%)`,
        }}
      />

      {/* Aurora Layer 2 - Violet/Emerald */}
      <motion.div
        animate={{
          x: ['20%', '-15%', '15%', '20%'],
          y: ['15%', '-20%', '10%', '15%'],
          scale: [1.1, 0.9, 1.2, 1.1],
          rotate: [0, -40, 35, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vh] rounded-full blur-[130px] opacity-35"
        style={{
          background: `radial-gradient(circle, ${colorStops[2]} 0%, ${colorStops[3]} 65%, transparent 100%)`,
        }}
      />

      {/* Aurora Layer 3 - Center Ambient Mesh */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-5%', '-10%'],
          y: ['10%', '-10%', '15%', '10%'],
          scale: [0.95, 1.15, 1, 0.95],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/4 w-[60vw] h-[60vh] rounded-full blur-[140px] opacity-30"
        style={{
          background: `radial-gradient(circle, ${colorStops[1]} 0%, ${colorStops[4]} 70%, transparent 100%)`,
        }}
      />
    </div>
  );
};
