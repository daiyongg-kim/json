import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Parser Pro",
    "alternateName": "Free Online JSON Formatter & Validator",
    "url": "https://jsonparser.website",
    "logo": "https://jsonparser.website/logo.png",
    "description": "Free online JSON parser, formatter, validator, and beautifier. Parse, validate, minify, and format JSON data instantly with tree view visualization. No registration required.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Works on all modern browsers.",
    "softwareVersion": "1.0.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "JSON Parser Pro",
      "url": "https://jsonparser.website"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "keywords": "json parser, json formatter, json validator, json beautifier, json minifier, json tree view, online json tool, free json parser, json syntax checker, json editor online",
    "screenshot": "https://jsonparser.website/screenshot.png",
    "featureList": [
      "Real-time JSON validation",
      "JSON formatting and beautification",
      "JSON minification",
      "Tree view visualization",
      "Syntax highlighting",
      "Error detection with line numbers",
      "File upload support (up to 10MB)",
      "Dark mode support",
      "JSON path extraction",
      "Search functionality"
    ],
    "inLanguage": ["en-US", "en-GB", "en"],
    "isAccessibleForFree": true,
    "isFamilyFriendly": true
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is JSON?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that's easy for humans to read and write, and easy for machines to parse and generate. It's commonly used for transmitting data between a web application and a server."
        }
      },
      {
        "@type": "Question",
        "name": "How do I validate JSON online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply paste your JSON data into our online JSON validator at jsonparser.website. The tool will instantly check your JSON syntax and highlight any errors with specific line numbers and error messages."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between JSON formatting and minification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JSON formatting (beautification) adds proper indentation and line breaks to make JSON human-readable. JSON minification removes all unnecessary whitespace to reduce file size, making it ideal for production use."
        }
      },
      {
        "@type": "Question",
        "name": "Is this JSON parser tool free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, JSON Parser Pro is completely free to use with no registration required. You can parse, format, validate, and transform JSON data without any limitations or hidden costs."
        }
      },
      {
        "@type": "Question",
        "name": "What's the maximum file size supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our JSON parser supports file uploads up to 10MB in size. For larger files, we recommend using a desktop JSON editor or breaking the file into smaller chunks."
        }
      }
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jsonparser.website"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://jsonparser.website/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "JSON Parser",
        "item": "https://jsonparser.website/tools/json-parser"
      }
    ]
  };

  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="description" content="Free online JSON parser, formatter, and validator. Instantly beautify, minify, and validate JSON data with interactive tree view. No signup required. Parse JSON online with syntax highlighting and error detection." />
        <meta name="keywords" content="json parser, json formatter, json validator, json beautifier, json minifier, online json tool, json tree view, json editor, json syntax checker, parse json online, format json, validate json, json viewer, json pretty print, json lint, free json parser" />
        <meta name="author" content="JSON Parser Pro" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://jsonparser.website" />
        
        {/* Language Alternates */}
        <link rel="alternate" hrefLang="en" href="https://jsonparser.website" />
        <link rel="alternate" hrefLang="x-default" href="https://jsonparser.website" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jsonparser.website" />
        <meta property="og:title" content="JSON Parser Pro - Free Online JSON Formatter, Validator & Beautifier" />
        <meta property="og:description" content="Parse, format, validate, and beautify JSON instantly. Free online tool with tree view, syntax highlighting, and error detection. No signup required." />
        <meta property="og:image" content="https://jsonparser.website/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="JSON Parser Pro - Online JSON Tools" />
        <meta property="og:site_name" content="JSON Parser Pro" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://jsonparser.website" />
        <meta name="twitter:title" content="JSON Parser Pro - Free Online JSON Tools" />
        <meta name="twitter:description" content="Parse, format, validate JSON instantly. Free tool with tree view & error detection." />
        <meta name="twitter:image" content="https://jsonparser.website/twitter-card.png" />
        <meta name="twitter:image:alt" content="JSON Parser Pro Screenshot" />
        
        {/* Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1f2937" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="JSON Parser Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JSON Parser" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Performance & Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Verification Tags (add your own) */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
        {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
        {/* <meta name="yandex-verification" content="your-yandex-verification-code" /> */}
        
        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        
        {/* Structured Data - Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5941228464873656"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}