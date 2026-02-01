import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useIsAiChatOpen, usePortfolioStore } from '../store/portfolioStore';
import { usePageContext } from '../hooks/usePageContext';
import ReactMarkdown from 'react-markdown';

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
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const context = usePageContext();
  const location = useLocation();

  const getSuggestions = () => {
    const path = location.pathname;
    if (path === '/') return ['Who is Md. Shamrat Hossain?', 'What are Samrat\'s top skills?', 'Contact info'];
    if (path.startsWith('/blog/')) return ['Summarize this post', 'Key takeaways', 'Who is the author?'];
    if (path.startsWith('/portfolio/')) return ['What technologies were used?', 'What was the main challenge?', 'Key results?'];
    if (path === '/resume') return ['Summarize experience', 'Education details', 'Download PDF'];
    return ['Tell me about Shamrat (Samrat)', 'Show me his portfolio', 'Contact details'];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeSuggestions]);

  // Update suggestions when page changes
  useEffect(() => {
    setActiveSuggestions(getSuggestions());
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideQuery || query;
    
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setQuery('');
    setActiveSuggestions([]); // Clear suggestions on submit
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: textToSend, 
            context: { page: location.pathname, data: context }, // Send explicit page context
            history: messages // Send chat history for continuity
        }),
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
          className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] flex flex-col bg-bg-surface/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel backdrop-blur-xl"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-primary-900/40 backdrop-blur-md">
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
              <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary">
                <Bot size={48} className="mb-4 text-primary-500 opacity-60" />
                <p className="text-sm mb-6">
                  {t('ai_search.placeholder')}
                </p>
                <div className="flex flex-col gap-2 w-full px-4">
                  <p className="text-xs text-text-secondary mb-1 uppercase tracking-wider opacity-70">Suggested Questions</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {activeSuggestions.map((s, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSubmit(undefined, s)} 
                        className="text-xs bg-white/10 hover:bg-primary-500/20 hover:text-primary-500 border border-white/10 px-3 py-2 rounded-lg transition-all text-left backdrop-blur-md"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
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
                <div className={`p-3 rounded-2xl max-w-[85%] text-sm overflow-hidden ${
                  msg.role === 'user' 
                    ? 'bg-primary-600/90 text-white rounded-tr-sm backdrop-blur-sm' 
                    : 'bg-black/60 text-text-primary rounded-tl-sm backdrop-blur-md border border-white/5'
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:p-2 prose-pre:rounded-lg">
                    <ReactMarkdown 
                      components={{
                          // Override standard elements for better chat styling
                          p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                          li: ({children}) => <li className="mb-1">{children}</li>,
                          code: ({children}) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono text-primary-300">{children}</code>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-white/5 p-3 rounded-2xl rounded-tl-sm text-sm text-text-secondary">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Inline Suggestions for ongoing chat */}
            {messages.length > 0 && activeSuggestions.length > 0 && !isLoading && (
              <div className="flex flex-wrap gap-2 justify-end mt-2 animate-fade-in">
                {activeSuggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSubmit(undefined, s)} 
                    className="text-xs bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white border border-primary-500/20 px-3 py-1.5 rounded-full transition-all text-right backdrop-blur-md"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={(e) => handleSubmit(e)} className="p-4 border-t border-white/10 bg-bg-surface/50 backdrop-blur-md">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('ai_search.placeholder')}
                className="w-full pl-4 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors placeholder-white/30 backdrop-blur-sm"
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
