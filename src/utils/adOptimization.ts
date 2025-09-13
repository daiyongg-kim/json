// Advanced AdSense optimization utilities for JSON Parser Pro

import { ADSENSE_CONFIG } from '@/config/adsenseConfig';

export class AdOptimizer {
  private static instance: AdOptimizer;
  private adPerformance: Map<string, AdMetrics> = new Map();
  private viewabilityObserver?: IntersectionObserver;

  static getInstance(): AdOptimizer {
    if (!AdOptimizer.instance) {
      AdOptimizer.instance = new AdOptimizer();
    }
    return AdOptimizer.instance;
  }

  // Initialize viewability tracking
  initializeViewabilityTracking() {
    if (!this.viewabilityObserver) {
      this.viewabilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const adSlot = entry.target.getAttribute('data-ad-slot');
            if (adSlot) {
              this.trackViewability(adSlot, entry.intersectionRatio);
            }
          });
        },
        { 
          threshold: [0, 0.5, 1.0],
          rootMargin: '0px'
        }
      );
    }
  }

  // Track ad metrics
  trackViewability(adSlot: string, ratio: number) {
    const metrics = this.adPerformance.get(adSlot) || {
      impressions: 0,
      clicks: 0,
      viewabilityScore: 0,
      revenue: 0,
      lastViewed: Date.now()
    };

    metrics.viewabilityScore = ratio;
    metrics.lastViewed = Date.now();
    this.adPerformance.set(adSlot, metrics);

    // Send viewability data to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_viewability', {
        ad_slot: adSlot,
        viewability_score: ratio,
        event_category: 'ads'
      });
    }
  }

  // Optimize ad loading based on user behavior
  shouldLoadAd(adSlot: string, userBehavior: UserBehavior): boolean {
    // Don't load ads if user is highly engaged with tool
    if (userBehavior.jsonParseCount > 5 && userBehavior.sessionDuration < 30000) {
      return false;
    }

    // Prioritize high-performing ad slots
    const performance = this.adPerformance.get(adSlot);
    if (performance && performance.viewabilityScore < 0.3) {
      return false;
    }

    // Check ad density rules
    const visibleAds = this.getVisibleAdsCount();
    if (visibleAds >= ADSENSE_CONFIG.rules.maxAdsPerPage) {
      return false;
    }

    return true;
  }

  // Get current visible ads count
  private getVisibleAdsCount(): number {
    return document.querySelectorAll('.adsbygoogle[data-ad-status="filled"]').length;
  }

  // Refresh ads based on user interaction
  refreshAdsOnInteraction(interactionType: 'json_parsed' | 'format_clicked' | 'copy_clicked') {
    const refreshThreshold = {
      json_parsed: 3,
      format_clicked: 5,
      copy_clicked: 7
    };

    // Only refresh if user has high engagement
    if (this.getUserInteractionCount(interactionType) >= refreshThreshold[interactionType]) {
      this.refreshHighPerformingAds();
    }
  }

  private getUserInteractionCount(type: string): number {
    const stored = sessionStorage.getItem(`interaction_${type}`);
    return stored ? parseInt(stored, 10) : 0;
  }

  private refreshHighPerformingAds() {
    // Find ads with high viewability but low click-through
    this.adPerformance.forEach((metrics, adSlot) => {
      if (metrics.viewabilityScore > 0.7 && Date.now() - metrics.lastViewed > 60000) {
        this.refreshAd(adSlot);
      }
    });
  }

  private refreshAd(adSlot: string) {
    const adElement = document.querySelector(`[data-ad-slot="${adSlot}"]`);
    if (adElement && window.adsbygoogle) {
      // Clear and reload the ad
      (adElement as HTMLElement).innerHTML = '';
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('Ad refresh failed:', error);
      }
    }
  }

  // Generate performance report
  getPerformanceReport(): AdPerformanceReport {
    const totalImpressions = Array.from(this.adPerformance.values())
      .reduce((sum, metrics) => sum + metrics.impressions, 0);
    
    const totalClicks = Array.from(this.adPerformance.values())
      .reduce((sum, metrics) => sum + metrics.clicks, 0);

    const avgViewability = Array.from(this.adPerformance.values())
      .reduce((sum, metrics) => sum + metrics.viewabilityScore, 0) / this.adPerformance.size;

    return {
      totalImpressions,
      totalClicks,
      ctr: totalClicks / totalImpressions,
      avgViewability,
      adSlotPerformance: Object.fromEntries(this.adPerformance)
    };
  }
}

// User behavior tracking
export class UserBehaviorTracker {
  private interactions: UserInteraction[] = [];
  
  trackInteraction(type: string, data?: any) {
    this.interactions.push({
      type,
      timestamp: Date.now(),
      data
    });

    // Update session storage
    const key = `interaction_${type}`;
    const count = sessionStorage.getItem(key);
    sessionStorage.setItem(key, String(count ? parseInt(count, 10) + 1 : 1));

    // Trigger ad optimization
    const optimizer = AdOptimizer.getInstance();
    if (type === 'json_parsed' || type === 'format_clicked' || type === 'copy_clicked') {
      optimizer.refreshAdsOnInteraction(type as any);
    }
  }

  getBehaviorProfile(): UserBehavior {
    const now = Date.now();
    const sessionStart = this.interactions[0]?.timestamp || now;
    
    return {
      sessionDuration: now - sessionStart,
      jsonParseCount: this.interactions.filter(i => i.type === 'json_parsed').length,
      formatCount: this.interactions.filter(i => i.type === 'format_clicked').length,
      copyCount: this.interactions.filter(i => i.type === 'copy_clicked').length,
      errorCount: this.interactions.filter(i => i.type === 'json_error').length,
      isActiveUser: this.interactions.length > 3,
      averageInteractionInterval: this.calculateAverageInterval()
    };
  }

  private calculateAverageInterval(): number {
    if (this.interactions.length < 2) return 0;
    
    const intervals = this.interactions.slice(1).map((interaction, index) => 
      interaction.timestamp - this.interactions[index].timestamp
    );
    
    return intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
  }
}

// Types
interface AdMetrics {
  impressions: number;
  clicks: number;
  viewabilityScore: number;
  revenue: number;
  lastViewed: number;
}

interface UserBehavior {
  sessionDuration: number;
  jsonParseCount: number;
  formatCount: number;
  copyCount: number;
  errorCount: number;
  isActiveUser: boolean;
  averageInteractionInterval: number;
}

interface UserInteraction {
  type: string;
  timestamp: number;
  data?: any;
}

interface AdPerformanceReport {
  totalImpressions: number;
  totalClicks: number;
  ctr: number;
  avgViewability: number;
  adSlotPerformance: Record<string, AdMetrics>;
}

// Initialize global instances
export const adOptimizer = AdOptimizer.getInstance();
export const userTracker = new UserBehaviorTracker();

// Auto-initialize on client side
if (typeof window !== 'undefined') {
  adOptimizer.initializeViewabilityTracking();
}