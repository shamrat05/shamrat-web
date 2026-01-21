import React, { useEffect, useRef } from 'react';
import { Application, Graphics } from 'pixi.js';

export const Particles: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create PIXI Application with performance optimizations
    const app = new Application({
      backgroundAlpha: 0,
      resizeTo: window,
      antialias: false, // Disable antialias for mobile performance (negligible difference for moving particles)
      autoDensity: true,
      // Cap resolution to 2 to avoid excessive processing on high-DPI (3x/4x) mobile screens
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      powerPreference: 'high-performance', // Request discrete GPU
    });

    // Append canvas to container
    containerRef.current.appendChild(app.view as unknown as Node);

    // Particle logic
    const particles: Graphics[] = [];
    // Adjust particle count based on screen size for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 40;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const graphics = new Graphics();
      graphics.beginFill(0x0A84FF); // Primary blue color
      // Random size between 1 and 3 (slightly smaller for sharpness without AA)
      const size = Math.random() * 2 + 1;
      graphics.drawCircle(0, 0, size);
      graphics.endFill();
      
      // Custom properties for animation
      (graphics as any).vx = Math.random() * 0.5 - 0.25;
      (graphics as any).vy = Math.random() * 0.5 - 0.25;
      graphics.x = Math.random() * app.screen.width;
      graphics.y = Math.random() * app.screen.height;
      // Lower alpha slightly for better blending
      graphics.alpha = Math.random() * 0.4 + 0.1;

      // Cache as bitmap to avoid re-rasterizing geometry every frame (Huge performance boost)
      graphics.cacheAsBitmap = true;

      app.stage.addChild(graphics);
      particles.push(graphics);
    }

    // Animation Loop
    app.ticker.add(() => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += (p as any).vx;
        p.y += (p as any).vy;

        // Wrap around screen
        if (p.x < -10) p.x = app.screen.width + 10;
        if (p.x > app.screen.width + 10) p.x = -10;
        if (p.y < -10) p.y = app.screen.height + 10;
        if (p.y > app.screen.height + 10) p.y = -10;
      }
    });

    // Handle resize
    const handleResize = () => {
       // PIXI resizeTo handles canvas sizing, we just let particles wrap naturally
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up PIXI application
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      aria-hidden="true"
      style={{
        // Hardware acceleration hint for the container
        transform: 'translateZ(0)',
        contain: 'paint layout'
      }}
    />
  );
});