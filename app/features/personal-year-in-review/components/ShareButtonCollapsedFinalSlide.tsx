import { useAnalytics } from '@shared-analytics/hooks/useAnalytics';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import {
  AnalyticsClientEventType,
  ButtonNameType
} from 'app/features/analytics/constants';
import type { AnalyticsClientEvent } from 'app/features/analytics/types.client';
import Image from 'next/image';

import { shareArrowIconWhite } from '@public/icons';

interface ShareButtonCollapsedFinalSlideProps {
  toggleMore: (show: boolean) => void;
  action: (type: 'play' | 'pause') => void;
}

const DEFAULT_ICON_SIZE = 24;

const ShareButtonCollapsedFinalSlide = ({
  toggleMore,
  action
}: ShareButtonCollapsedFinalSlideProps): React.JSX.Element => {
  const { trackEvent } = useAnalytics<AnalyticsClientEvent>();
  const handleClick = (): void => {
    action('pause');
    trackEvent({
      eventName: AnalyticsClientEventType.BUTTON_TAP,
      properties: {
        ButtonName: ButtonNameType.SHARE_BUTTON_FINAL_SLIDE
      }
    });
    toggleMore(true);
  };

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1, ease: 'easeOut' }}
      className="mb-28 px-8"
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center justify-center gap-4 rounded-full !bg-primary !bg-gradient-to-t to-transparent px-6 py-3 text-white no-tap-highlight"
      >
        <Image
          src={shareArrowIconWhite}
          alt="Share"
          width={DEFAULT_ICON_SIZE}
          height={DEFAULT_ICON_SIZE}
        />
        <span className="font-inter text-sm font-semibold">
          Share your highlights!
        </span>
      </button>
    </AnimatedDiv>
  );
};

export default ShareButtonCollapsedFinalSlide;
