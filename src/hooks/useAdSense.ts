import { useEffect, useState } from 'react';
import { ADSENSE_CONFIG } from '@/config/adsenseConfig';

interface UseAdSenseProps {
  adSlot: string;
  lazy?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export const useAdSense = ({ 
  adSlot, 
  lazy = true, 
  priority = 'medium' 
}: UseAdSenseProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(!lazy);

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.publisherId}`;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        setLoaded(true);
      };
      
      script.onerror = () => {
        setError('Failed to load AdSense script');
      };
      
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!lazy) {
      setVisible(true);
      return;
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe the ad container
    const adContainer = document.querySelector(`[data-ad-slot="${adSlot}"]`);
    if (adContainer) {
      observer.observe(adContainer);
    }

    return () => observer.disconnect();
  }, [adSlot, lazy]);

  const pushAd = () => {
    if (loaded && visible && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        setError('Failed to initialize ad');
        console.error('AdSense error:', err);
      }
    }
  };

  return {
    loaded,
    error,
    visible,
    pushAd,
    canShow: loaded && visible && !error
  };
};

// Hook for tracking ad performance
export const useAdPerformance = () => {
  const [metrics, setMetrics] = useState({
    impressions: 0,
    clicks: 0,
    viewability: 0,
    revenue: 0
  });

  const trackImpression = (adSlot: string) => {
    setMetrics(prev => ({ 
      ...prev, 
      impressions: prev.impressions + 1 
    }));
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_slot: adSlot,
        event_category: 'ads'
      });
    }
  };

  const trackClick = (adSlot: string) => {
    setMetrics(prev => ({ 
      ...prev, 
      clicks: prev.clicks + 1 
    }));
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        ad_slot: adSlot,
        event_category: 'ads'
      });
    }
  };

  const trackViewability = (adSlot: string, viewabilityScore: number) => {
    setMetrics(prev => ({ 
      ...prev, 
      viewability: viewabilityScore 
    }));
  };

  return {
    metrics,
    trackImpression,
    trackClick,
    trackViewability
  };
};

// Ad blocker detection
export const useAdBlockDetection = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-10000px';
    document.body.appendChild(testAd);

    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        setAdBlockDetected(true);
      }
      document.body.removeChild(testAd);
    }, 100);
  }, []);

  return { adBlockDetected };
};

declare global {
  interface Window {
    adsbygoogle: any[];
    gtag?: (...args: any[]) => void;
  }
}