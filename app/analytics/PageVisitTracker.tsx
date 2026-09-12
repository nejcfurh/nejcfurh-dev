'use client';

import type { AnalyticsClientPageEvent } from './types';
import { useAnalytics } from './useAnalytics';
import { useMount } from './useMount';

interface PageVisitTrackerProps {
  pageEvent: AnalyticsClientPageEvent;
}

export const PageVisitTracker = ({
  pageEvent: { pageName, properties },
}: PageVisitTrackerProps): null => {
  const { trackPageVisit } = useAnalytics();

  useMount(() => {
    trackPageVisit({ pageName, properties });
  });

  return null;
};
