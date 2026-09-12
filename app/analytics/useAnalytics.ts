'use client';

import type {
  AnalyticsClientEventProperties,
  AnalyticsClientPageEvent,
} from './types';
import { usePostHog } from './usePostHog';

export const useAnalytics = (): {
  identify: (params: { userId: string }) => void;
  trackEvent: (params: AnalyticsClientEventProperties) => void;
  trackPageVisit: (params: AnalyticsClientPageEvent) => void;
} => {
  const { posthogSession } = usePostHog();

  const identify = (params: { userId: string }): void => {
    posthogSession?.identify(params.userId);
  };

  const trackEvent = (params: AnalyticsClientEventProperties): void => {
    const { eventName, properties } = params;

    posthogSession?.capture(eventName, properties);
  };

  const trackPageVisit = (params: AnalyticsClientPageEvent): void => {
    const { pageName, properties = {} } = params;

    if (posthogSession) {
      posthogSession.trackPageView(pageName, {
        ...properties,
        $current_url: window.location.href,
      });
    }
  };

  return {
    identify,
    trackEvent,
    trackPageVisit,
  };
};
