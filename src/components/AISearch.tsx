import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useIsAiChatOpen, usePortfolioStore } from '../store/portfolioStore';
import { usePageContext } from '../hooks/usePageContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CAT_GIFS = ['/cat-typing.gif', '/cat-thinking.gif', '/cat-hello.gif'];

export const AISearch: React.FC = () => {
  const isOpen = useIsAiChatOpen();
  const setAiChatOpen = usePortfolioStore((state) => state.setAiChatOpen);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const [loadingCat, setLoadingCat] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const context = usePageContext();
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved || systemDark;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  // Cycle cat GIF while loading
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => setLoadingCat(i => (i + 1) % CAT_GIFS.length), 2000);
    return () => clearInterval(interval);
  }, [isLoading]);

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

  useEffect(() => { scrollToBottom(); }, [messages, activeSuggestions]);
  useEffect(() => { setActiveSuggestions(getSuggestions()); }, [location.pathname]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  // Mouse tracking for spotlight on panel
  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleSubmit = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideQuery || query;
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setQuery('');
    setActiveSuggestions([]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: { page: location.pathname, data: context },
          history: messages,
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
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
          ref={panelRef}
          onMouseMove={handlePanelMouseMove}
          className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] flex flex-col rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            background: isDark ? 'rgba(10,10,12,0.75)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(24px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: isDark
              ? '0 0 0 1px rgba(255,255,255,0.03), 0 24px 80px -12px rgba(0,0,0,0.6), 0 0 40px -8px rgba(121,206,255,0.06)'
              : '0 0 0 1px rgba(0,0,0,0.03), 0 24px 80px -12px rgba(0,0,0,0.12), 0 0 40px -8px rgba(15,127,255,0.06)',
            isolation: 'isolate',
          }}
        >
          {/* Grain overlay on panel */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              filter: 'url(#grain-filter)',
              opacity: isDark ? 0.04 : 0.03,
              mixBlendMode: isDark ? 'soft-light' : 'overlay',
              borderRadius: 'inherit',
            }}
          />

          {/* Mouse spotlight effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-0 hover:opacity-100"
            style={{
              background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isDark ? 'rgba(121,206,255,0.06)' : 'rgba(15,127,255,0.04)'}, transparent 60%)`,
              borderRadius: 'inherit',
            }}
          />

          {/* Header */}
          <div
            className="relative z-20 flex items-center justify-between p-4"
            style={{
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={CAT_GIFS[loadingCat]}
                  alt=""
                  className="w-7 h-7 object-contain rounded-md"
                  style={{ opacity: isLoading ? 1 : 0.7, transition: 'opacity 0.3s' }}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-primary">Shamrat AI</h3>
                <p className="text-[10px] text-text-secondary">
                  {isLoading ? 'Thinking...' : 'Ask me anything'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAiChatOpen(false)}
              className="p-1.5 rounded-lg transition-all duration-200"
              style={{
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="relative z-20 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <img src={CAT_GIFS[2]} alt="" className="w-16 h-16 object-contain mb-4 opacity-80" />
                <p className="text-sm text-text-secondary mb-6 max-w-[250px] leading-relaxed">
                  {t('ai_search.placeholder')}
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-60 mb-1">Suggested</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {activeSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSubmit(undefined, s)}
                        className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(121,206,255,0.3)' : 'rgba(15,127,255,0.3)';
                          e.currentTarget.style.color = isDark ? '#79ceff' : '#0f7fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                          e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: msg.role === 'user'
                      ? isDark ? 'rgba(121,206,255,0.15)' : 'rgba(15,127,255,0.1)'
                      : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${msg.role === 'user'
                      ? isDark ? 'rgba(121,206,255,0.2)' : 'rgba(15,127,255,0.15)'
                      : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  {msg.role === 'user'
                    ? <User size={13} style={{ color: isDark ? '#79ceff' : '#0f7fff' }} />
                    : <Bot size={13} style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                  }
                </div>

                {/* Bubble */}
                <div
                  className="px-3.5 py-2.5 max-w-[80%] text-[13px] leading-relaxed overflow-hidden"
                  style={{
                    borderRadius: msg.role === 'user'
                      ? '14px 14px 4px 14px'
                      : '14px 14px 14px 4px',
                    background: msg.role === 'user'
                      ? isDark ? 'rgba(121,206,255,0.12)' : 'rgba(15,127,255,0.08)'
                      : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
                    border: `1px solid ${msg.role === 'user'
                      ? isDark ? 'rgba(121,206,255,0.15)' : 'rgba(15,127,255,0.12)'
                      : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                    color: isDark ? '#e5e5e5' : '#1f2937',
                  }}
                >
                  <div className={`prose prose-sm max-w-none prose-p:leading-relaxed ${
                    isDark ? 'prose-invert' : ''
                  } prose-pre:p-2 prose-pre:rounded-lg`}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 text-xs">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 text-xs">{children}</ol>,
                        li: ({ children }) => <li className="mb-0.5">{children}</li>,
                        code: ({ children }) => (
                          <code
                            className="px-1 py-0.5 rounded text-xs font-mono"
                            style={{
                              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                              color: isDark ? '#79ceff' : '#0f7fff',
                            }}
                          >{children}</code>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Loading indicator with cat GIF */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <Bot size={13} style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                </div>
                <div
                  className="px-3.5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <img
                    src={CAT_GIFS[loadingCat]}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: isDark ? '#79ceff' : '#0f7fff', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: isDark ? '#79ceff' : '#0f7fff', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: isDark ? '#79ceff' : '#0f7fff', animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Inline suggestions during chat */}
            {messages.length > 0 && activeSuggestions.length > 0 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 justify-end mt-2">
                {activeSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(undefined, s)}
                    className="text-[11px] px-2.5 py-1 rounded-full transition-all duration-200"
                    style={{
                      background: isDark ? 'rgba(121,206,255,0.08)' : 'rgba(15,127,255,0.06)',
                      border: `1px solid ${isDark ? 'rgba(121,206,255,0.15)' : 'rgba(15,127,255,0.12)'}`,
                      color: isDark ? '#79ceff' : '#0f7fff',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="relative z-20 p-3"
            style={{
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('ai_search.placeholder')}
                className="w-full pl-4 pr-11 py-2.5 rounded-xl text-sm text-text-primary placeholder-text-secondary focus:outline-none transition-all duration-200"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  color: isDark ? '#e5e5e5' : '#1f2937',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = isDark ? 'rgba(121,206,255,0.3)' : 'rgba(15,127,255,0.3)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')}
              />
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200 disabled:opacity-30"
                style={{ color: isDark ? '#79ceff' : '#0f7fff' }}
                onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = isDark ? 'rgba(121,206,255,0.1)' : 'rgba(15,127,255,0.08)'; }}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
