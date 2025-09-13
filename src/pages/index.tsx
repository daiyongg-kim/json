import dynamic from 'next/dynamic';
import SEO from '@/components/SEO';

const JSONParser = dynamic(() => import('@/components/JSONParser'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading JSON Parser...</div>
    </div>
  )
});

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Parser Pro",
    "url": "https://jsonparser.website/",
    "description": "Professional JSON parser, formatter, and validator tool for developers",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    },
    "featureList": [
      "JSON Parsing & Validation",
      "JSON Formatting & Beautification",
      "JSON Minification",
      "Tree View Visualization",
      "Syntax Highlighting",
      "Error Detection with Line Numbers",
      "File Upload Support (10MB)",
      "Dark/Light Theme",
      "Copy to Clipboard",
      "Real-time Validation"
    ],
    "screenshot": "https://jsonparser.website/screenshot.png"
  };

  return (
    <>
      <SEO
        title="JSON Parser & Formatter - Free Online JSON Validator"
        description="Free online JSON parser, formatter, and validator. Beautify, minify, and validate JSON data instantly. Tree view visualization with syntax highlighting. No signup required."
        keywords="json parser, json formatter, json validator, json beautifier, json minifier, online json tools, json tree view, json syntax checker, free json parser, json viewer"
        canonical="https://jsonparser.website/"
        ogTitle="JSON Parser & Formatter - Free Online JSON Tools"
        ogDescription="Parse, format, validate, and beautify JSON data online. Free JSON tools with instant results."
        ogUrl="https://jsonparser.website/"
        structuredData={structuredData}
      />
      <JSONParser />
    </>
  );
}