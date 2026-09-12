'use client';

import { createContext, useMemo, type JSX, type ReactNode } from 'react';

import { PostHogClientSession } from './posthog.client';
import type { AnalyticsPostHogConfig, PostHogContextState } from './types';

export const PostHogContext = createContext<PostHogContextState | null>(null);

interface PostHogProviderProps {
  children: ReactNode;
  config: AnalyticsPostHogConfig | undefined;
}

export const PostHogProvider = ({
  children,
  config,
}: PostHogProviderProps): JSX.Element => {
  const posthogContextState = useMemo<PostHogContextState | null>(() => {
    if (!config) {
      return null;
    }

    return {
      posthogSession: new PostHogClientSession(config),
    };
  }, [config]);

  return (
    <PostHogContext.Provider value={posthogContextState}>
      {children}
    </PostHogContext.Provider>
  );
};
