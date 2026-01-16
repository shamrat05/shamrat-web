import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export const Particles: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create PIXI Application
    const app = new PIXI.Application({
      backgroundAlpha: 0,
      resizeTo: window,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });

    // Append canvas to container
    containerRef.current.appendChild(app.view as unknown as Node);

    // Particle logic
    const particles: PIXI.Graphics[] = [];
    const particleCount = window.innerWidth < 768 ? 10 : 30;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0x0A84FF); // Primary blue color
      // Random size between 1 and 4
      const size = Math.random() * 3 + 1;
      graphics.drawCircle(0, 0, size);
      graphics.endFill();
      
      // Custom properties for animation
      (graphics as any).vx = Math.random() * 0.5 - 0.25;
      (graphics as any).vy = Math.random() * 0.5 - 0.25;
      graphics.x = Math.random() * app.screen.width;
      graphics.y = Math.random() * app.screen.height;
      graphics.alpha = Math.random() * 0.5 + 0.1;

      app.stage.addChild(graphics);
      particles.push(graphics);
    }

    // Animation Loop
    app.ticker.add(() => {
      particles.forEach((p) => {
        p.x += (p as any).vx;
        p.y += (p as any).vy;

        // Wrap around screen
        if (p.x < 0) p.x = app.screen.width;
        if (p.x > app.screen.width) p.x = 0;
        if (p.y < 0) p.y = app.screen.height;
        if (p.y > app.screen.height) p.y = 0;
      });
    });

    // Handle resize specifically for particle regeneration or bounds
    // (PIXI handles canvas resize via resizeTo, but we might want to adjust particles if screen changes drastically)
    const handleResize = () => {
       // Optional: adjust particle count or positions if needed
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
    />
  );
});
