import { useAnalytics } from '@shared-analytics/hooks/useAnalytics';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import {
  AnalyticsClientEventType,
  ButtonNameType
} from 'app/features/analytics/constants';
import type { AnalyticsClientEvent } from 'app/features/analytics/types.client';
import Image from 'next/image';
import clsx from 'clsx';

import { shareArrowIcon } from '@public/icons';

interface ShareButtonCollapsedProps {
  toggleMore: (show: boolean) => void;
  action: (type: 'play' | 'pause') => void;
  className: string;
}

const DEFAULT_ICON_SIZE = 24;

const ShareButtonCollapsed = ({
  toggleMore,
  action,
  className = ''
}: ShareButtonCollapsedProps): React.JSX.Element => {
  const { trackEvent } = useAnalytics<AnalyticsClientEvent>();
  const handleClick = (): void => {
    action('pause');
    trackEvent({
      eventName: AnalyticsClientEventType.BUTTON_TAP,
      properties: {
        ButtonName: ButtonNameType.SHARE_BUTTON
      }
    });
    toggleMore(true);
  };

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.5, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
          'flex w-full items-center justify-center gap-1 !bg-gradient-to-t to-transparent px-6 py-5 pb-8 text-[#070707] no-tap-highlight',
          className
        )}
      >
        <Image
          src={shareArrowIcon}
          alt="Share"
          width={DEFAULT_ICON_SIZE}
          height={DEFAULT_ICON_SIZE}
        />
        <span className="font-inter text-sm font-semibold">
          Share this story
        </span>
      </button>
    </AnimatedDiv>
  );
};

export default ShareButtonCollapsed;
