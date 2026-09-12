import type {
  AnalyticsClientEventType,
  ButtonNameType,
} from './constants';
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

export interface ButtonTapProperties {
  ButtonName: ButtonNameType;
  // Set only where one button name covers several targets, so the event still
  // says which project or social network was tapped.
  ProjectName?: string;
  SocialName?: string;
}

export interface ButtonTapEvent {
  eventName: AnalyticsClientEventType.BUTTON_TAP;
  properties: ButtonTapProperties;
}

export type AnalyticsClientEvent = ButtonTapEvent;
