import React from 'react';
import SEO from '@/components/SEO';
import XMLParser from '../components/XMLParser';

const XMLPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "XML Parser & Formatter",
    "url": "https://jsonparser.website/xml",
    "description": "Free online XML parser, formatter, and validator tool",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "XML Parsing",
      "XML Formatting",
      "XML Validation",
      "XML Minification",
      "Tree View Display",
      "Syntax Highlighting",
      "File Upload Support",
      "Dark/Light Theme"
    ]
  };

  return (
    <>
      <SEO
        title="XML Parser & Formatter - Free Online XML Validator"
        description="Free online XML parser, formatter, and validator. Beautify, minify, and validate XML data instantly. Convert XML to tree view with syntax highlighting. No signup required."
        keywords="xml parser, xml formatter, xml validator, xml beautifier, xml minifier, online xml tools, xml tree view, xml syntax checker, free xml parser"
        canonical="https://jsonparser.website/xml"
        ogTitle="XML Parser & Formatter - Free Online XML Tools"
        ogDescription="Parse, format, validate, and beautify XML data online. Free XML tools with instant results."
        ogUrl="https://jsonparser.website/xml"
        structuredData={structuredData}
      />
      <XMLParser />
    </>
  );
};

export default XMLPage;