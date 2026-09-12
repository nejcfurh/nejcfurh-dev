'use client';

import { useContext } from 'react';

import type { PostHogClientSession } from './posthog.client';
import { PostHogContext } from './PostHogProvider';

export const usePostHog = (): {
  posthogSession?: PostHogClientSession;
} => {
  const posthogContext = useContext(PostHogContext);

  return {
    posthogSession: posthogContext?.posthogSession,
  };
};
