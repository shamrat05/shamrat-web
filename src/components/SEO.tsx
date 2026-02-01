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
  canonical?: string;
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  tags,
  canonical,
  keywords: customKeywords
}) => {
  const siteUrl = 'https://shamrat.vercel.app';
  const siteTitle = title.includes('Shamrat') ? title : `${title} | Md. Shamrat Hossain`;
  const API_URL = import.meta.env.VITE_API_URL || siteUrl;
  
  // Use provided image or generate a dynamic one
  let ogImage = image || `${API_URL}/api/og?title=${encodeURIComponent(title)}`;
  if (ogImage && !ogImage.startsWith('http')) {
    ogImage = `${siteUrl}${ogImage}`;
  }

  const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const canonicalUrl = canonical || fullUrl;

  // Social profiles for Structured Data
  const sameAs = [
    localData.contact.linkedin,
    localData.contact.github,
    localData.contact.facebook,
    localData.contact.twitter
  ].filter(Boolean);

  const keywordList = [
    "Shamrat", "Samrat", "Md. Shamrat Hossain", "Shamrat Hossain", 
    "Marketing Professional", "Operations Professional", "Data Analytics", 
    "Bangladesh", "Dhaka", "Digital Marketing", "Banking Operations",
    ...(customKeywords || []),
    ...(tags || [])
  ];
  
  // Remove duplicates and join
  const keywordsString = Array.from(new Set(keywordList)).join(", ");

  const personSchema = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Md. Shamrat Hossain",
    "alternateName": [
      "Samrat", 
      "Shamrat", 
      "Shamrat Hossain", 
      "Samrat Hossain", 
      "Md. Samrat Hossain",
      "Md Samrat Hossain",
      "Md Shamrat Hossain"
    ],
    "url": siteUrl,
    "image": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#personImage`,
      "url": `${siteUrl}/images/shamrat-profile.jpg`,
      "caption": "Md. Shamrat Hossain"
    },
    "description": localData.hero.description,
    "sameAs": sameAs,
    "jobTitle": localData.hero.title,
    "worksFor": {
      "@type": "Organization",
      "name": "DOER Services PLC"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "Bangladesh"
    }
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      ...(type === 'article' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      }] : [])
    ]
  };

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content="Md. Shamrat Hossain" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Md. Shamrat Hossain" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shamrat5" />
      <meta name="twitter:creator" content="@shamrat5" />
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
          "@graph": [
            personSchema,
            {
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              "url": siteUrl,
              "name": "Md. Shamrat Hossain",
              "description": description,
              "publisher": { "@id": `${siteUrl}/#person` },
              "potentialAction": [{
                "@type": "SearchAction",
                "target": `${siteUrl}/?s={search_term_string}`,
                "query-input": "required name=search_term_string"
              }]
            },
            breadcrumbSchema,
            ...(type === 'article' ? [{
              "@type": "Article",
              "headline": title,
              "image": ogImage,
              "datePublished": publishedTime,
              "author": { "@id": `${siteUrl}/#person` },
              "publisher": { "@id": `${siteUrl}/#person` },
              "description": description,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": fullUrl
              }
            }] : [])
          ]
        })}
      </script>
    </Helmet>
  );
};

