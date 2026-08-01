import React, { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Info, Copy, Check } from 'lucide-react';
import { useInView } from '../hooks';
import { useCMS } from '../hooks/useCMS';
import { LocalTime } from './LocalTime';
import confetti from 'canvas-confetti';

export const Contact: React.FC = React.memo(() => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { data } = useCMS();
  const [copied, setCopied] = useState<string | null>(null);
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

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('Name') as string;
    const email = formData.get('Email') as string;
    const subject = formData.get('Subject') as string;
    const message = formData.get('Message') as string;
    const mailtoLink = `mailto:${data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-32 bg-bg-surface contain-layout"
    >
      <div className={`container transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss how we can work together</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Info */}
          <div className="p-8 card-glass h-full flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-6">Contact Information</h3>
              <LocalTime />
            </div>

            <div className="flex flex-col gap-6 flex-grow justify-center">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: data.contact.email,
                  href: `mailto:${data.contact.email}`,
                  copyValue: data.contact.email
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: data.contact.phone,
                  href: `tel:${data.contact.phone}`,
                  copyValue: data.contact.phone
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: data.contact.linkedin.replace('https://', ''),
                  href: data.contact.linkedin,
                  copyValue: data.contact.linkedin
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: data.contact.location,
                  href: null,
                  copyValue: data.contact.location
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 p-4 rounded-xl transition-colors border border-transparent group hover:border-border-default"
                  style={{ ['--hover-bg' as string]: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                >
                  <div className="w-12 h-12 bg-primary-900/50 rounded-xl flex items-center justify-center text-primary-500 shrink-0 border border-primary-500/20">
                    <contact.icon size={22} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-text-secondary mb-0.5">{contact.label}</h4>
                    {contact.href ? (
                      <a href={contact.href} className="text-base font-semibold text-text-primary hover:text-primary-500 transition-colors">
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-text-primary">{contact.value}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopy(contact.copyValue, contact.label)}
                    className="p-2 text-text-secondary hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all"
                    title="Copy to clipboard"
                  >
                    {copied === contact.label ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
                    <div className="p-8 card-glass h-full">
                      <h3 className="text-xl font-bold text-text-primary mb-6">Send a Message</h3>
                      <form 
                        onSubmit={handleSubmit}
                        action={`mailto:${data.contact.email}`}
                        method="post" 
                        encType="text/plain"
                        className="flex flex-col gap-6"
                      >
              <div className="space-y-6">
                {[
                  { type: 'text', name: 'Name', placeholder: 'Your Name' },
                  { type: 'email', name: 'Email', placeholder: 'Your Email' },
                  { type: 'text', name: 'Subject', placeholder: 'Subject' },
                ].map((field) => (
                  <div key={field.name}>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-all"
                      style={{
                        background: 'var(--input)',
                        border: '1px solid var(--border)',
                      }}
                    />
                  </div>
                ))}
                <div>
                  <textarea
                    name="Message"
                    rows={5}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-500 transition-all resize-y min-h-[120px]"
                    style={{
                      background: 'var(--input)',
                      border: '1px solid var(--border)',
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start gap-4">
                <button
                  type="submit"
                  className="btn btn-primary group"
                >
                  Send Message
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                <p className="text-sm text-text-secondary flex items-center gap-2">
                  <Info size={14} className="text-primary-500" />
                  Or email directly: <a href={`mailto:${data.contact.email}`} className="text-primary-500 hover:text-primary-400">{data.contact.email}</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});
