'use client';

import { ButtonNameType } from '@/app/analytics/constants';
import { useButtonTap } from '@/app/analytics/useButtonTap';
import { X } from 'lucide-react';
import { JSX, lazy, Suspense, useEffect } from 'react';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';

const PersonalYearInReview = lazy(
  () => import('@/app/features/personal-year-in-review/YearInReview'),
);

const ProjectPreviewModal = ({
  onClose,
}: {
  onClose: () => void;
}): JSX.Element => {
  const trackButtonTap = useButtonTap();
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatedDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={event => {
        // The close button sits inside this overlay, so only count a tap that
        // landed on the backdrop itself.
        if (event.target === event.currentTarget) {
          trackButtonTap(ButtonNameType.PROJECT_PREVIEW_BACKDROP);
        }
        onClose();
      }}
    >
      <button
        onClick={() => {
          trackButtonTap(ButtonNameType.PROJECT_PREVIEW_CLOSE);
          onClose();
        }}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Close preview"
      >
        <X size={20} className="text-white" />
      </button>

      <AnimatedDiv
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative scale-[0.65] sm:scale-75 lg:scale-[0.85]"
      >
        <div
          className="relative rounded-[54px] bg-[#1a1a1a] p-[14px]"
          style={{
            boxShadow:
              '0 0 60px 15px var(--accent-glow), 0 0 120px 40px var(--accent-glow-soft)',
          }}
        >
          <div className="relative w-[370px] h-[750px] sm:h-[800px] rounded-[40px] overflow-hidden bg-black">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-[#FFF3DC]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
                </div>
              }
            >
              <PersonalYearInReview />
            </Suspense>
          </div>
        </div>
      </AnimatedDiv>
    </AnimatedDiv>
  );
};

export default ProjectPreviewModal;
