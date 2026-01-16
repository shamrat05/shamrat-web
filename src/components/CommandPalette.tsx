import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Home, User, Briefcase, Code, FileText, Mail, Terminal } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);

  // Actions definition
  const actions = [
    { id: 'home', label: 'Go to Home', icon: Home, action: () => handleNav('/', 'home') },
    { id: 'about', label: 'Go to About', icon: User, action: () => handleNav('/#about', 'about') },
    { id: 'projects', label: 'View Portfolio', icon: Briefcase, action: () => handleNav('/portfolio', 'projects') },
    { id: 'skills', label: 'View Skills', icon: Code, action: () => handleNav('/#skills', 'skills') },
    { id: 'blog', label: 'Read Blog', icon: FileText, action: () => handleNav('/blog', 'blog') },
    { id: 'contact', label: 'Contact Me', icon: Mail, action: () => handleNav('/#contact', 'contact') },
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNav = (path: string, sectionId: string) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(path.replace('/#', ''));
            element?.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }, 100);
    } else {
        navigate(path);
        setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset selected index when query changes
  useEffect(() => setSelectedIndex(0), [query]);

  // Keyboard navigation within the list
  useEffect(() => {
    if (!isOpen) return;
    const handleListNav = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredActions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            filteredActions[selectedIndex]?.action();
        }
    };
    window.addEventListener('keydown', handleListNav);
    return () => window.removeEventListener('keydown', handleListNav);
  }, [isOpen, filteredActions, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden glass-panel"
          >
            {/* Input */}
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-text-secondary mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-secondary h-6"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-text-secondary font-mono border border-white/10 px-1.5 py-0.5 rounded">
                <span>ESC</span>
              </div>
            </div>

            {/* Results */}
            <div className="py-2 max-h-[300px] overflow-y-auto">
              {filteredActions.length === 0 ? (
                <div className="px-4 py-8 text-center text-text-secondary text-sm">
                  No results found.
                </div>
              ) : (
                filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                      index === selectedIndex ? 'bg-primary-500/10 text-primary-500' : 'text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon size={18} />
                      <span>{action.label}</span>
                    </div>
                    {index === selectedIndex && <ArrowRight size={14} />}
                  </button>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/20 text-[10px] text-text-secondary flex justify-between">
                <span><Terminal size={10} className="inline mr-1"/> Command Mode</span>
                <span className="font-mono">Use ↑↓ to navigate, ↵ to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
