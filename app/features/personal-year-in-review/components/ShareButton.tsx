import { useAnalytics } from '@shared-analytics';
import { captureError } from '@shared-observability/service';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedSubTitle from '@/app/components/motion/AnimatedSubTitle';
import {
  AnalyticsClientEventType,
  ButtonNameType
} from 'app/features/analytics/constants';
import type { AnalyticsClientEvent } from 'app/features/analytics/types.client';
import { motion, useMotionValue, useTransform } from 'motion/react';
import type { PanInfo } from 'motion/react';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useSlideImageGenerator } from '../hooks/useSlideImageGenerator';
import PlatformButton, { Platform } from './PlatformButton';

export type MediaType = 'image' | 'video';

export interface ShareMedia {
  blob: Blob;
  type: MediaType;
  mimeType?: string;
}

interface ShareButtonProps {
  close?: () => void;
  action?: (type: 'play' | 'pause') => void;
  shareMedia?: ShareMedia[] | null;
  isGeneratingImage?: boolean;
  slideComponent?: React.ComponentType<unknown>;
  slideProps?: unknown;
  slideKey?: string;
  logoColor?: 'primary' | 'secondary';
}

const platformButtons = [
  {
    platform: Platform.INSTAGRAM,
    icon: '/icons/share-platforms/instagram.svg'
  },
  {
    platform: Platform.FACEBOOK,
    icon: '/icons/share-platforms/facebook.svg'
  },
  {
    platform: Platform.MESSENGER,
    icon: '/icons/share-platforms/messenger.svg'
  },
  {
    platform: Platform.WHATSAPP,
    icon: '/icons/share-platforms/whatsapp.svg'
  },
  {
    platform: Platform.SMS,
    icon: '/icons/share-platforms/sms.svg'
  },
  {
    platform: Platform.NATIVE,
    icon: '/icons/share-arrow.svg'
  }
];

const ShareButton = ({
  close,
  action,
  shareMedia: externalShareMedia,
  isGeneratingImage: externalIsGenerating = false,
  slideComponent,
  slideProps,
  slideKey,
  logoColor = 'primary'
}: ShareButtonProps): React.JSX.Element => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideImageUrl, setSlideImageUrl] = useState<string | null>(null);
  const [slideImageBlob, setSlideImageBlob] = useState<Blob | null>(null);
  const [externalMediaUrls, setExternalMediaUrls] = useState<string[]>([]);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 150], [1, 0.3]);
  const hasGeneratedRef = useRef(false);

  const { generateImage, isGenerating: isGeneratingSlide } =
    useSlideImageGenerator();
  const { trackEvent } = useAnalytics<AnalyticsClientEvent>();

  const isGeneratingImage = externalIsGenerating || isGeneratingSlide;

  // USE SLIDE IMAGE IF AVAILABLE, OTHERWISE USE EXTERNAL SHARE MEDIA (COLLAGE)
  const shareMedia = useMemo(() => {
    // IF WE HAVE A SLIDE-SPECIFIC IMAGE, ONLY USE THAT (DON'T INCLUDE COLLAGE)
    if (slideImageBlob) {
      return [
        {
          blob: slideImageBlob,
          type: 'image' as MediaType,
          mimeType: 'image/png'
        }
      ];
    }

    // OTHERWISE, FALL BACK TO EXTERNAL SHARE MEDIA (COLLAGE FOR FINAL SLIDE)
    return externalShareMedia && externalShareMedia.length > 0
      ? externalShareMedia
      : null;
  }, [externalShareMedia, slideImageBlob]);

  // GENERATE SLIDE IMAGE WHEN COMPONENT MOUNTS AND SLIDE COMPONENT IS PROVIDED
  useEffect(() => {
    if (slideComponent && slideProps && !hasGeneratedRef.current) {
      hasGeneratedRef.current = true;

      // DEFER HEAVY WORK TO NEXT TICK TO ALLOW UI TO RENDER FIRST
      setTimeout(() => {
        generateImage(slideComponent, slideProps, slideKey, logoColor)
          .then((blob) => {
            setSlideImageBlob(blob);
            const url = URL.createObjectURL(blob);

            setSlideImageUrl(url);
          })
          .catch((error) => {
            captureError(error);
            hasGeneratedRef.current = false;
          });
      }, 0);
    }
  }, [slideComponent, slideProps, slideKey, generateImage, logoColor]);

  // CREATE PREVIEW URLS FOR EXTERNAL SHARE MEDIA (FINAL SLIDE WITH MULTIPLE IMAGES)
  useEffect(() => {
    if (
      externalShareMedia &&
      externalShareMedia.length > 0 &&
      !slideImageBlob
    ) {
      const urls = externalShareMedia
        .filter((media) => media.type === 'image')
        .map((media) => URL.createObjectURL(media.blob));

      setExternalMediaUrls(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setExternalMediaUrls([]);
    }
  }, [externalShareMedia, slideImageBlob]);

  // CLEAN UP THE URL OBJECT ON UNMOUNT
  useEffect(() => {
    return () => {
      if (slideImageUrl) {
        URL.revokeObjectURL(slideImageUrl);
      }
    };
  }, [slideImageUrl]);

  const handleClose = (): void => {
    setIsClosing(true);
    trackEvent({
      eventName: AnalyticsClientEventType.BUTTON_TAP,
      properties: {
        ButtonName: ButtonNameType.CANCEL_SHARE_BUTTON
      }
    });
    // WAIT FOR ANIMATION TO COMPLETE BEFORE ACTUALLY CLOSING
    setTimeout(() => {
      close?.();
    }, 300);
  };

  const handleDownload = (): void => {
    if (!shareMedia || shareMedia.length === 0) return;

    shareMedia.forEach((media, index) => {
      const url = URL.createObjectURL(media.blob);
      const link = document.createElement('a');

      const extension = media.type === 'video' ? 'mp4' : 'png';
      const mediaLabel = media.type === 'video' ? 'video' : 'image';

      link.href = url;
      link.download = `birdbuddy-year-in-review-2025-${mediaLabel}-${
        index + 1
      }.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // CLEAN UP THE URL OBJECT
      URL.revokeObjectURL(url);
    });
  };

  const handleNativeShare = async (platform: Platform): Promise<void> => {
    action?.('pause');

    trackEvent({
      eventName: AnalyticsClientEventType.BUTTON_TAP,
      properties: {
        ButtonName: platform,
        SharePlatform: platform
      }
    });

    // CHECK IF SHARE API IS AVAILABLE (REQUIRES HTTPS)
    if (!navigator.share) {
      // FALLBACK IF SHARE API IS NOT AVAILABLE
      if (shareMedia && shareMedia.length > 0) {
        handleDownload();
      }

      return;
    }

    try {
      if (shareMedia && shareMedia.length > 0 && navigator.canShare) {
        const files = shareMedia.map((media, index) => {
          const extension = media.type === 'video' ? 'mp4' : 'png';
          const mediaLabel = media.type === 'video' ? 'video' : 'image';

          // USE PROVIDED MIME TYPE OR DEFAULT BASED ON MEDIA TYPE
          const mimeType =
            media.mimeType ||
            (media.type === 'video' ? 'video/mp4' : 'image/png');

          const fileName = `birdbuddy-year-in-review-2025-${mediaLabel}-${
            index + 1
          }.${extension}`;

          return new File([media.blob], fileName, {
            type: mimeType,
            lastModified: Date.now()
          });
        });

        if (navigator.canShare({ files })) {
          await navigator.share({
            title: 'My Birdbuddy Year in Review',
            text: '2025 was a year filled with many of my feathered friends. Check out my Birdbuddy year in review! 🐦',
            files
          });

          handleClose();

          return;
        }
      }
    } catch (error) {
      captureError(error);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    // CLOSE IF DRAGGED DOWN
    if (info.offset.y > 100 || info.velocity.y > 500) {
      close?.();
    }
  };

  return (
    <AnimatedDiv
      className="fixed inset-0 z-50 flex items-end justify-center font-inter sm:items-center sm:justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* BACKDROP IN ACTION SHEET */}
      <AnimatedDiv
        onClick={handleClose}
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* ACTION SHEET */}
      <AnimatedDiv
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={handleDragEnd}
        style={{ y, opacity }}
        initial={{ y: '100%', scale: 1 }}
        animate={{
          y: isClosing ? '100%' : 0,
          scale: isClosing ? 0.95 : 1
        }}
        exit={{ y: '100%', scale: 0.95 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          duration: 0.3
        }}
        className="relative w-full max-w-lg rounded-t-3xl bg-white p-6 pb-8 shadow-2xl sm:h-[912px] sm:w-[440px] sm:max-w-[440px] sm:origin-center sm:overflow-y-auto sm:rounded-3xl lg:scale-[0.8]"
      >
        {/* HANDLE BAR IN ACTION SHEET */}
        <div className="mb-6 flex cursor-grab justify-center active:cursor-grabbing">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* CONTENT IN ACTION SHEET */}
        <div className="flex flex-col items-center gap-5">
          <AnimatedSubTitle className="text-center text-xl font-bold text-[#070707]">
            Share Your Year in Birds <br />
            {!isGeneratingImage && externalMediaUrls.length > 0 && (
              <span className="text-sm font-light text-[#070707]">
                Here&apos;s a quick preview.
              </span>
            )}
          </AnimatedSubTitle>

          {isGeneratingImage ? (
            <div className="flex items-center justify-center gap-3 py-4 text-[#070707]">
              <svg
                className="h-6 w-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-base font-medium">
                Preparing your story ...
              </span>
            </div>
          ) : (
            <React.Fragment>
              {/* IMAGE PREVIEW - Single image (from specific slide) */}
              {slideImageUrl && (
                <AnimatedDiv
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto flex aspect-[9/16] h-auto w-[34vw] sm:w-[200px]"
                >
                  <Image
                    src={slideImageUrl}
                    alt="Preview of your Year in Review slide"
                    className="rounded-2xl border-2 object-cover shadow-md"
                    width={1000}
                    height={1000}
                    unoptimized
                    loading="eager"
                    priority
                  />
                </AnimatedDiv>
              )}

              {/* IMAGE PREVIEWS - Multiple images (from final slide) */}
              {!slideImageUrl && externalMediaUrls.length > 0 && (
                <AnimatedDiv
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto w-full"
                >
                  <div className="relative -mx-6 overflow-hidden">
                    <div
                      className="flex gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pl-6 pr-6 scrollbar-hide [-webkit-overflow-scrolling:touch]"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}
                    >
                      {externalMediaUrls.map((url, index) => (
                        <div
                          key={url}
                          className="flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
                          style={{ width: 'calc(60% - 8px)' }}
                        >
                          <Image
                            src={url}
                            alt={`Preview ${index + 1} of your Year in Review`}
                            className="h-auto w-full"
                            width={1000}
                            height={1000}
                            unoptimized
                            loading="eager"
                            priority
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedDiv>
              )}

              {/* SOCIAL SHARE BUTTONS IN ACTION SHEET */}
              <AnimatedDiv
                className="grid w-full grid-cols-3 gap-4 no-tap-highlight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {platformButtons.map((button) => (
                  <PlatformButton
                    key={button.platform}
                    platform={button.platform as Platform}
                    icon={button.icon}
                    handleShare={handleNativeShare}
                  />
                ))}
              </AnimatedDiv>
            </React.Fragment>
          )}

          {close && (
            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-2/3 rounded-full border-2 border-[#070707] bg-gray-100 px-4 py-3 text-base font-semibold text-[#070707] transition-colors no-tap-highlight"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </AnimatedDiv>
    </AnimatedDiv>
  );
};

export default ShareButton;
