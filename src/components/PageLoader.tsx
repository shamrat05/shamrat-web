import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-bg-page text-text-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      <div className="h-2 w-40 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-primary-500 animate-pulse" />
      </div>
      <span className="text-sm text-text-secondary">Loading content...</span>
    </div>
  </div>
);
