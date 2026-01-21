import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const Particles: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 20 : 50;
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Normalize coordinate system to use css pixels.
      ctx.scale(dpr, dpr);
      
      // Set visible size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear utilizing the scaled width/height implicitly? No, clearRect uses transformed coords if scaled.
      // Actually, clearRect needs to cover the whole canvas. 
      // Since we scaled the context, canvas.width/dpr is the logical width.
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = (canvas.width / dpr) + 10;
        if (p.x > (canvas.width / dpr) + 10) p.x = -10;
        if (p.y < -10) p.y = (canvas.height / dpr) + 10;
        if (p.y > (canvas.height / dpr) + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 132, 255, ${p.alpha})`; // Primary Blue
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    />
  );
});