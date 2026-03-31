'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import { AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { YearInReviewNamedBirdStats } from '../types/types';

const NamedBirdsSlide = ({
  namedBirds
}: {
  namedBirds: YearInReviewNamedBirdStats;
}): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const namedBirdsArray = namedBirds?.namedBirds ?? [];

  useEffect(() => {
    if (currentIndex >= namedBirdsArray.length - 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < namedBirdsArray.length - 1) {
          return prevIndex + 1;
        }

        return prevIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, namedBirdsArray.length]);

  const currentBird = namedBirdsArray[currentIndex];

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 sm:h-[912px] sm:w-[440px]">
      <AnimatePresence initial={false}>
        <AnimatedDiv
          key={currentIndex}
          className="absolute inset-0"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={
              currentBird.namedBird.previewMedia?.[0]?.__typename ===
              'MediaImage'
                ? currentBird.namedBird.previewMedia[0].thumbnailUrl
                : ''
            }
            alt={currentBird.namedBird.species.name}
            fill
            className="object-cover"
            loading="eager"
            priority
            fetchPriority="high"
            unoptimized
          />
        </AnimatedDiv>
      </AnimatePresence>
      <div className="relative z-10 flex h-[80vh] flex-col items-center justify-between font-inter text-xl text-[#322716] sm:h-[775px] sm:w-full">
        <AnimatedDiv
          className="mt-24 flex w-full flex-col items-center justify-center rounded-xl bg-[#FAC370] px-5 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: currentIndex <= 1 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText>You didn&apos;t just have visitors. </AnimatedText>
          <AnimatedText>
            You had
            <span className="font-bold">
              {' '}
              {namedBirdsArray.length}{' '}
              {namedBirdsArray.length > 1 ? 'regulars.' : 'regular.'}
            </span>
          </AnimatedText>
        </AnimatedDiv>

        <AnimatePresence mode="wait">
          <AnimatedDiv
            key={currentBird.namedBird.species.name}
            className="flex flex-col items-center justify-center rounded-xl bg-[#FAC370] px-5 py-3 font-awesome-serif text-4xl text-[#322716]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {currentBird.namedBird.name}
          </AnimatedDiv>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NamedBirdsSlide;
