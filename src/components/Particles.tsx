import React, { useEffect, useRef } from 'react';

export const Particles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Increase particle count for better visibility
    const particleCount = window.innerWidth < 768 ? 15 : 40;

    container.innerHTML = '';

    const createParticle = () => {
      const particle = document.createElement('div');
      
      const size = Math.random() * 6 + 2; // Slightly larger
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // Increased opacity
      const opacity = Math.random() * 0.6 + 0.2; 
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #0A84FF; /* Hardcoded primary-500 to ensure visibility */
        border-radius: 50%;
        opacity: ${opacity};
        left: ${x}%;
        top: ${y}%;
        animation: float ${duration}s linear infinite;
        animation-delay: -${delay}s; /* Start immediately at random point */
        pointer-events: none;
        box-shadow: 0 0 10px rgba(10, 132, 255, 0.3); /* Glow effect */
      `;
      
      container.appendChild(particle);
    };

    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none" 
      aria-hidden="true" 
    />
  );
};