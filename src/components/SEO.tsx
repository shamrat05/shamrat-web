import React from 'react';
import { Helmet } from 'react-helmet-async';
import { localData } from '../data/localData';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  tags?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  tags
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://shamrat.vercel.app';
  const siteTitle = `${title} | Md. Shamrat Hossain`;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  // Use provided image or generate a dynamic one
  let ogImage = image || `${API_URL}/api/og?title=${encodeURIComponent(title)}`;
  if (ogImage && !ogImage.startsWith('http')) {
    ogImage = `${siteUrl}${ogImage}`;
  }

  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  // Social profiles for Structured Data
  const sameAs = [
    localData.contact.linkedin,
    // Add other social links here if available in localData or hardcoded
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article Specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags && tags.map(tag => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...(type === 'article' ? {
            "@type": "Article",
            "headline": title,
            "image": ogImage,
            "datePublished": publishedTime,
            "author": {
              "@type": "Person",
              "name": "Md. Shamrat Hossain",
              "url": siteUrl,
              "sameAs": sameAs,
              "jobTitle": localData.hero.title
            },
            "publisher": {
              "@type": "Organization",
              "name": "Md. Shamrat Hossain",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/images/shamrat-profile.jpg`
              }
            },
            "description": description,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            }
          } : {
            "@type": "WebSite",
            "name": "Md. Shamrat Hossain",
            "url": siteUrl,
            "description": description,
            "author": {
              "@type": "Person",
              "name": "Md. Shamrat Hossain",
              "url": siteUrl,
              "sameAs": sameAs,
              "jobTitle": localData.hero.title
            }
          })
        })}
      </script>
    </Helmet>
  );
};

