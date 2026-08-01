import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  colors = ['#3B9EFF', '#79CEFF', '#34D399', '#8B5CF6', '#3B9EFF'],
  animationSpeed = 8,
  showBorder = false,
}) => {
  const gradientString = colors.join(', ');

  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent transition-all duration-300 ${
        showBorder ? 'border border-white/10 px-3 py-1 rounded-full' : ''
      } ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientString})`,
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        animation: `gradient-sweep ${animationSpeed}s ease infinite`,
      }}
    >
      {children}
    </span>
  );
};
