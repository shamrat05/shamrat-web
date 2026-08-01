import React, { useEffect, useRef } from 'react';

interface HyperspeedOptions {
  onSpeedUp?: () => void;
  onSlowDown?: () => void;
  distortion?: 'turbulentDistortion' | 'turbulentDistortion2' | 'deepDistortion' | 'none';
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoad?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: [number, number];
  lightStickHeight?: [number, number];
  movingAwaySpeed?: [number, number];
  movingCloserSpeed?: [number, number];
  carLightsLength?: [number, number];
  carLightsRadius?: [number, number];
  carWidthPercentage?: [number, number];
  carShiftX?: [number, number];
  carFloorSeparation?: number;
  colors?: {
    roadColor?: number;
    islandColor?: number;
    background?: number;
    shoulderLines?: number;
    brokenLines?: number;
    leftCars?: number[];
    rightCars?: number[];
    sticks?: number;
  };
}

interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
  className?: string;
}

export const Hyperspeed: React.FC<HyperspeedProps> = ({
  effectOptions = {},
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create 3D high-speed multi-color light streaks
    const numStreaks = 80;
    const streaks: {
      x: number;
      y: number;
      z: number;
      length: number;
      speed: number;
      color: string;
      width: number;
    }[] = [];

    const palette = ['#3B9EFF', '#79CEFF', '#34D399', '#8B5CF6', '#FF6B35'];

    for (let i = 0; i < numStreaks; i++) {
      streaks.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 10,
        color: palette[Math.floor(Math.random() * palette.length)],
        width: Math.random() * 2.5 + 1,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(2, 2, 2, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.z -= s.speed;

        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = (Math.random() - 0.5) * canvas.width * 2;
          s.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const k = 300 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        const prevK = 300 / (s.z + s.length);
        const prevX = s.x * prevK + cx;
        const prevY = s.y * prevK + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.beginPath();
          ctx.lineWidth = s.width * k * 0.8;

          const grad = ctx.createLinearGradient(prevX, prevY, px, py);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, s.color);

          ctx.strokeStyle = grad;
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectOptions]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-80 ${className}`}
    />
  );
};
