'use client';

import { AnalyticsClientEventType, type ButtonNameType } from './constants';
import type { ButtonTapProperties } from './types';
import { useAnalytics } from './useAnalytics';

type ButtonTapDetails = Omit<ButtonTapProperties, 'ButtonName'>;

export const useButtonTap = (): ((
  buttonName: ButtonNameType,
  details?: ButtonTapDetails,
) => void) => {
  const { trackEvent } = useAnalytics();

  return (buttonName, details) => {
    trackEvent({
      eventName: AnalyticsClientEventType.BUTTON_TAP,
      properties: { ButtonName: buttonName, ...details },
    });
  };
};
