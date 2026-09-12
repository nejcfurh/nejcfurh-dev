import {
  AppEnvironment,
  type AnalyticsPostHogConfig,
} from '@/app/analytics/types';

const isAppEnvironment = (value: string | undefined): value is AppEnvironment =>
  Object.values(AppEnvironment).some(environment => environment === value);

const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogApiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export const appConfig = {
  env: isAppEnvironment(process.env.NEXT_PUBLIC_ENV)
    ? process.env.NEXT_PUBLIC_ENV
    : AppEnvironment.Development,
  version: process.env.NEXT_PUBLIC_VERSION ?? 'dev',
  serviceName: 'nejcfurh-dev',
};

// Undefined when the PostHog keys are absent, which leaves the provider inert instead of failing the render.
export const posthogConfig: AnalyticsPostHogConfig | undefined =
  posthogApiKey && posthogApiHost
    ? {
        apiKey: posthogApiKey,
        apiHost: posthogApiHost,
        superProperties: {
          environment: appConfig.env,
          serviceName: appConfig.serviceName,
          version: appConfig.version,
        },
      }
    : undefined;
