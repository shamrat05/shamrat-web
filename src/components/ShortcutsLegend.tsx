import React from 'react';
import { Command } from 'lucide-react';

export const ShortcutsLegend: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-center gap-6 mt-8 text-xs text-text-secondary opacity-60">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-mono">
          <Command size={10} /> K
        </span>
        <span>Command Palette</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-mono">
          ESC
        </span>
        <span>Close</span>
      </div>
    </div>
  );
};
