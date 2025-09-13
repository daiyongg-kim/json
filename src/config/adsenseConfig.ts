// Google AdSense Configuration for JSON Parser Pro
// Replace placeholder ad slot IDs with your actual AdSense slot IDs

export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-5941228464873656', // Your existing publisher ID
  adSlots: {
    headerBanner: {
      id: '1234567890', // Replace with actual slot ID
      format: 'auto',
      responsive: true,
      sizes: {
        desktop: '728x90',
        mobile: '320x50'
      }
    },
    inContent: {
      id: '2122694201', // Real AdSense slot ID for In-Content ad
      format: 'auto',
      layout: 'in-article',
      responsive: true
    },
    sidebar: {
      id: '2345678901', // Replace with actual slot ID
      format: 'vertical',
      sizes: {
        desktop: '160x600'
      }
    },
    mobileInline: {
      id: '4567890123', // Replace with actual slot ID
      format: 'auto',
      responsive: true,
      sizes: {
        mobile: '300x250'
      }
    },
    stickyBottom: {
      id: '5678901234', // Replace with actual slot ID
      format: 'auto', 
      responsive: true,
      sizes: {
        desktop: '728x90',
        mobile: '320x50'
      }
    }
  },
  // Performance optimization settings
  performance: {
    lazyLoad: true,
    refreshInterval: 30000, // 30 seconds
    viewabilityThreshold: 0.5
  },
  // Placement rules
  rules: {
    maxAdsPerPage: 5,
    minContentLength: 100, // Minimum content length before showing ads
    adDensity: 0.3, // Max 30% of viewport can be ads
    excludeFromPaths: ['/admin', '/api'], // Paths to exclude ads
  }
};

// Ad slot priority for progressive enhancement
export const AD_PRIORITY = {
  high: ['headerBanner', 'inContent'],
  medium: ['stickyBottom', 'mobileInline'],
  low: ['sidebar']
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
};

// Analytics integration
export const AD_ANALYTICS = {
  trackClicks: true,
  trackImpressions: true,
  trackViewability: true,
  customEvents: {
    jsonParsed: 'json_parsed',
    toolUsed: 'tool_interaction',
    errorEncountered: 'json_error'
  }
};