import { posthog } from 'posthog-js';

import { AppEnvironment, type AnalyticsPostHogConfig } from './types';

export class PostHogClientSession {
  private readonly debug: boolean;

  private readonly environment: AppEnvironment;

  constructor(params: AnalyticsPostHogConfig) {
    const { debug = false, apiKey, apiHost, superProperties } = params;

    this.environment = superProperties.environment;
    this.debug = debug;

    // posthog-js reaches for the File API on import, which breaks the server build on Node versions that lack it.
    if (typeof window !== 'undefined') {
      posthog.init(apiKey, {
        api_host: apiHost,
        debug,
        // Pageviews are sent by PageVisitTracker so every event carries our own page name.
        capture_pageview: false,
      });

      posthog.register({
        Environment: superProperties.environment,
        Source: superProperties.serviceName,
        Version: superProperties.version,
      });
    }
  }

  public get isEnabled(): boolean {
    return this.environment !== AppEnvironment.Development || this.debug;
  }

  public identify(userId: string, properties?: Record<string, unknown>): void {
    if (this.isEnabled) {
      posthog.identify(userId, properties);
    }
  }

  public capture(event: string, properties?: Record<string, unknown>): void {
    if (this.isEnabled) {
      posthog.capture(event, properties);
    }
  }

  public trackPageView(pageName: string, additionalProperties = {}): void {
    this.capture('$pageview', {
      Page: pageName,
      ...additionalProperties,
    });
  }
}
