import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style = { display: 'block' },
  className = '',
  fullWidthResponsive = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
      try {
        // Push the ad to the AdSense queue
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-5941228464873656"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-ad-layout-key={adLayoutKey}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
};

export default AdSense;

// Specific ad components for different placements
export const HeaderBannerAd: React.FC = () => (
  <AdSense
    adSlot="1234567890" // Replace with your actual ad slot
    className="mb-4 text-center"
    style={{ display: 'block', textAlign: 'center' }}
  />
);

export const SidebarAd: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => (
  <div className={`hidden lg:block ml-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-2`}>
    <AdSense
      adSlot="2345678901" // Replace with your actual ad slot
      adFormat="vertical"
      style={{ display: 'block', width: '160px', height: '600px' }}
    />
  </div>
);

export const InContentAd: React.FC = () => (
  <div className="my-6 text-center" style={{ position: 'relative', width: '100%', minHeight: '280px' }}>
    <AdSense
      adSlot="2122694201" // Real AdSense slot ID
      adFormat="auto"
      adLayout="in-article"
      style={{ 
        display: 'block', 
        textAlign: 'center', 
        minHeight: '280px',
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    />
  </div>
);

export const MobileInlineAd: React.FC = () => (
  <div className="block md:hidden my-4 text-center">
    <AdSense
      adSlot="4567890123" // Replace with your actual ad slot
      style={{ display: 'block', textAlign: 'center', minHeight: '250px' }}
    />
  </div>
);

export const StickyBottomAd: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600 shadow-lg">
    <AdSense
      adSlot="5678901234" // Replace with your actual ad slot
      style={{ display: 'block', textAlign: 'center', minHeight: '50px' }}
      className="py-2"
    />
  </div>
);

// Type declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}