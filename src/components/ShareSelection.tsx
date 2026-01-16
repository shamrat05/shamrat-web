import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin, Copy } from 'lucide-react';

export const ShareSelection: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelect = () => {
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) {
        setPosition(null);
        return;
      }

      const text = selection.toString();
      setSelectedText(text);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10 + window.scrollY, // Offset above text
      });
    };

    document.addEventListener('selectionchange', handleSelect);
    return () => document.removeEventListener('selectionchange', handleSelect);
  }, []);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const text = `"${selectedText}"`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      // LinkedIn doesn't support text pre-fill well via URL, but we can share the URL
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} - ${url}`);
      alert('Quote copied!');
    }
    setPosition(null);
  };

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="fixed z-50 flex items-center gap-1 p-1 rounded-lg bg-gray-900 text-white shadow-xl pointer-events-auto border border-white/10"
          style={{
            left: position.x,
            top: position.y - 50, // Position above using fixed coord needs calculating viewport relative
            transform: 'translateX(-50%)',
          }}
        >
          <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-white/20 rounded transition-colors"><Twitter size={16} /></button>
          <button onClick={() => handleShare('linkedin')} className="p-2 hover:bg-white/20 rounded transition-colors"><Linkedin size={16} /></button>
          <div className="w-[1px] h-4 bg-white/20 mx-1" />
          <button onClick={() => handleShare('copy')} className="p-2 hover:bg-white/20 rounded transition-colors"><Copy size={16} /></button>
          
          {/* Arrow */}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 border-b border-r border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
