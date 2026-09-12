import type { PostHogClientSession } from './posthog.client';

export enum AppEnvironment {
  Development = 'development',
  Staging = 'staging',
  Preview = 'preview',
  Production = 'production',
}

export interface AnalyticsPostHogConfig {
  debug?: boolean;
  apiKey: string;
  apiHost: string;
  superProperties: {
    environment: AppEnvironment;
    serviceName: string;
    version: string;
  };
}

export interface PostHogContextState {
  posthogSession: PostHogClientSession;
}

export interface AnalyticsClientPageEvent {
  pageName: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsClientEventProperties {
  eventName: string;
  properties?: Record<string, unknown>;
}
