import React from 'react';
import SEO from '@/components/SEO';
import Converters from '../components/Converters';

const ConvertersPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Data Format Converters",
    "url": "https://jsonparser.website/converters",
    "description": "Free online tool to convert between JSON, XML, YAML, CSV, and other data formats",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON to XML Conversion",
      "XML to JSON Conversion",
      "YAML to JSON Conversion",
      "CSV to JSON Conversion",
      "JSON to CSV Conversion",
      "JSON to YAML Conversion",
      "CSV to HTML Table",
      "RSS to JSON Conversion",
      "String to JSON Conversion",
      "18+ Format Conversions",
      "Syntax Highlighting",
      "Error Validation",
      "Instant Results",
      "Dark/Light Theme"
    ]
  };

  return (
    <>
      <SEO
        title="Data Converters - JSON, XML, YAML, CSV Online Converter"
        description="Free online data converter tool. Convert between JSON, XML, YAML, CSV, TSV, and HTML formats instantly. Support for 18+ conversion types with syntax highlighting. No signup required."
        keywords="json to xml, xml to json, yaml converter, csv to json, json to csv, data converter, online converter, json to yaml, xml to csv, string to json, rss to json, free converter tools"
        canonical="https://jsonparser.website/converters"
        ogTitle="Data Converters - Free Online Format Conversion Tools"
        ogDescription="Convert between JSON, XML, YAML, CSV, and more. 18+ data format conversions with instant results."
        ogUrl="https://jsonparser.website/converters"
        structuredData={structuredData}
      />
      <Converters />
    </>
  );
};

export default ConvertersPage;