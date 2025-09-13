import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = 'website',
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData
}) => {
  const baseUrl = 'https://jsonparser.website';
  const fullTitle = `${title} | JSON Parser Pro`;
  
  // Use provided values or fallback to default values
  const metaOgTitle = ogTitle || title;
  const metaOgDescription = ogDescription || description;
  const metaOgUrl = ogUrl || canonical || baseUrl;
  const metaTwitterTitle = twitterTitle || metaOgTitle;
  const metaTwitterDescription = twitterDescription || metaOgDescription;
  
  // Default structured data for the application
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Parser Pro",
    "url": baseUrl,
    "description": "Professional JSON parser, formatter, and validator tool for developers",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Viewport and charset */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      <meta property="og:url" content={metaOgUrl} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="JSON Parser Pro" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTwitterTitle} />
      <meta name="twitter:description" content={metaTwitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="JSON Parser Pro" />
      <meta name="language" content="English" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </Head>
  );
};

export default SEO;