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
  const siteTitle = title.includes('Shamrat') || title.includes('Samrat') 
    ? title 
    : `${title} | Md. Shamrat Hossain (Samrat Hossain)`;
  const API_URL = import.meta.env.VITE_API_URL || siteUrl;
  
  let ogImage = image || `${API_URL}/api/og?title=${encodeURIComponent(title)}`;
  if (ogImage && !ogImage.startsWith('http')) {
    ogImage = `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
  }

  const canonicalUrl = canonical || (url ? (url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`) : siteUrl);
  const finalFullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`) : siteUrl;
  const isHome = finalFullUrl === siteUrl || finalFullUrl === `${siteUrl}/`;

  const sameAs = [
    localData.contact.linkedin,
    localData.contact.github,
    localData.contact.facebook,
    localData.contact.twitter,
    siteUrl
  ].filter(Boolean);

  const coreNameKeywords = [
    "Shamrat", 
    "Samrat", 
    "Md. Shamrat Hossain", 
    "Md. Samrat Hossain", 
    "Shamrat Hossain", 
    "Samrat Hossain", 
    "Md Shamrat", 
    "Md Samrat", 
    "Shomrat Hossain",
    "Md Shamrat Hossain",
    "Md Samrat Hossain",
    "Shamrat Hossain Bangladesh",
    "Samrat Hossain Bangladesh",
    "Shamrat Bangladesh",
    "Samrat Bangladesh",
    "Marketing Professional Bangladesh",
    "Operations Expert Bangladesh",
    "Data Analytics Specialist",
    "Digital Strategy Bangladesh"
  ];

  const keywordList = [
    ...coreNameKeywords,
    ...(customKeywords || []),
    ...(tags || [])
  ];
  
  const keywordsString = Array.from(new Set(keywordList)).join(", ");

  const personSchema = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Md. Shamrat Hossain",
    "alternateName": [
      "Shamrat", 
      "Samrat", 
      "Shamrat Hossain", 
      "Samrat Hossain", 
      "Md. Samrat Hossain",
      "Md Samrat Hossain",
      "Md Shamrat Hossain",
      "Md Shamrat",
      "Md Samrat",
      "Shomrat",
      "Shomrat Hossain"
    ],
    "url": siteUrl,
    "image": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#personImage`,
      "url": `${siteUrl}/images/shamrat-profile.jpg`,
      "caption": "Md. Shamrat Hossain (Samrat Hossain)"
    },
    "description": localData.hero.description,
    "sameAs": sameAs,
    "jobTitle": "Marketing & Operations Professional | Data Analytics Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "DOER Services PLC",
      "url": "https://doerservices.com"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Islamic University",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Bangladesh"
      }
    },
    "knowsAbout": [
      "Marketing Strategy",
      "Data Analytics",
      "Banking Operations",
      "Business Development",
      "Process Optimization",
      "Power BI",
      "Digital Marketing",
      "CRM Systems"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "addressCountry": "Bangladesh"
    }
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Md. Shamrat Hossain (Samrat Hossain)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Md. Shamrat Hossain (also known as Samrat Hossain) is a results-driven Marketing & Operations Professional and Data Analytics Expert in Bangladesh, specializing in strategic business execution and process optimization."
        }
      },
      {
        "@type": "Question",
        "name": "What are the core skills of Md. Shamrat Hossain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Md. Shamrat Hossain specializes in Data Analytics (Power BI, Python, Excel), Marketing Strategy, Banking Operations management (overseeing 551+ outlets across 62 districts), CRM systems, and AI automation."
        }
      },
      {
        "@type": "Question",
        "name": "How to contact Md. Shamrat Hossain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach Md. Shamrat Hossain via email at shamrat.r.h@gmail.com, phone at +88 01727-805705, or via LinkedIn at https://linkedin.com/in/shamrat5."
        }
      }
    ]
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

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Md. Shamrat Hossain (Samrat Hossain) - Official Website",
    "alternateName": ["Shamrat", "Samrat", "Shamrat Hossain", "Samrat Hossain", "Md Shamrat", "Md Samrat"],
    "description": description,
    "publisher": { "@id": `${siteUrl}/#person` },
    "potentialAction": [{
      "@type": "SearchAction",
      "target": `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }]
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${finalFullUrl}#webpage`,
    "url": finalFullUrl,
    "name": siteTitle,
    "description": description,
    "isPartOf": { "@id": `${siteUrl}/#website` },
    "about": { "@id": `${siteUrl}/#person` },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "@id": `${finalFullUrl}#primaryimage`,
      "url": ogImage
    }
  };

  const profilePageSchema = isHome ? {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    "url": siteUrl,
    "name": "Md. Shamrat Hossain (Samrat Hossain)",
    "alternateName": ["Shamrat", "Samrat", "Shamrat Hossain", "Samrat Hossain", "Md Shamrat", "Md Samrat"],
    "mainEntity": { "@id": `${siteUrl}/#person` },
    "about": { "@id": `${siteUrl}/#person` },
    "isPartOf": { "@id": `${siteUrl}/#website` }
  } : null;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content="Md. Shamrat Hossain (Samrat Hossain)" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Md. Shamrat Hossain | Samrat Hossain" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Md. Shamrat Hossain - Marketing & Operations Expert" />
      <meta property="og:url" content={finalFullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shamrat5" />
      <meta name="twitter:creator" content="@shamrat5" />
      <meta name="twitter:title" content={siteTitle} />
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
            webSiteSchema,
            webPageSchema,
            breadcrumbSchema,
            ...(isHome ? [faqSchema] : []),
            ...(profilePageSchema ? [profilePageSchema] : []),
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
                "@id": finalFullUrl
              }
            }] : [])
          ]
        })}
      </script>
    </Helmet>
  );
};
