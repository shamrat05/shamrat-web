import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useIsAiChatOpen, usePortfolioStore } from '../store/portfolioStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AISearch: React.FC = () => {
  const isOpen = useIsAiChatOpen();
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = query.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setQuery('');
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error connecting to the AI service. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] flex flex-col bg-bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-primary-900/20 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-primary-500" />
              <h3 className="font-bold text-text-primary">{t('ai_search.ask')}</h3>
            </div>
            <button 
              onClick={() => setAiChatOpen(false)}
              className="text-text-secondary hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary opacity-60">
                <Bot size={48} className="mb-4 text-primary-500" />
                <p className="text-sm">
                  {t('ai_search.placeholder')}
                </p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-primary-600' : 'bg-gray-700'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-sm' 
                    : 'bg-white/10 text-text-primary rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-sm text-text-secondary">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-bg-surface/50">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('ai_search.placeholder')}
                className="w-full pl-4 pr-12 py-3 bg-black/20 border border-white/10 rounded-xl text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button 
                type="submit"
                disabled={!query.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
