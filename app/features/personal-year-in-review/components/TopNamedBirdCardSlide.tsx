'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import type { YearInReviewNamedBirdStats } from '../types/types';

/* eslint-disable react/jsx-max-depth */

const TopNamedBirdCardSlide = ({
  topNamedBird
}: {
  topNamedBird: YearInReviewNamedBirdStats;
}): React.JSX.Element => {
  const [isMorphed, setIsMorphed] = useState(false);

  // Helper function to get ordinal suffix for day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';

    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Format date to "Month DDth, YYYY" format (e.g., "November 27th, 2024")
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if parsing fails
    }

    const month = date.toLocaleString('en-US', {
      month: 'short',
      timeZone: 'UTC'
    });
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const ordinal = getOrdinalSuffix(day);

    return `${month} ${day}${ordinal}, ${year}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMorphed(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const bird = topNamedBird?.namedBirds?.[topNamedBird?.namedBirds?.length - 1];

  return (
    <React.Fragment>
      {/* MOBILE VIEW */}
      <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#ADCFCF] px-4 sm:hidden">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <AnimatedDiv
            className="relative flex flex-col items-center"
            animate={{
              y: 0,
              marginTop: isMorphed ? '80px' : '0px'
            }}
            initial={false}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* CARDS BEHIND THE MAIN CARD */}
            <AnimatedDiv
              className="absolute h-[65vh] w-[80vw] rounded-3xl bg-[#BAA7D1]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? -8 : 0,
                scale: isMorphed ? 0.95 : 0.9
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.1 : 0 }}
              style={{ zIndex: 1, pointerEvents: 'none' }}
            />
            <AnimatedDiv
              className="absolute h-[65vh] w-[80vw] rounded-3xl bg-[#76AFAF]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? 5 : 0,
                scale: isMorphed ? 0.98 : 0.95
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.15 : 0 }}
              style={{ zIndex: 2, pointerEvents: 'none' }}
            />
            <AnimatedDiv
              className="absolute h-[65vh] w-[80vw] rounded-3xl bg-[#FBCF8D]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? -3 : 0,
                scale: isMorphed ? 0.99 : 0.96
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.2 : 0 }}
              style={{ zIndex: 3, pointerEvents: 'none' }}
            />

            <AnimatedDiv
              className="relative overflow-hidden bg-white"
              animate={{
                width: isMorphed ? '80vw' : '100vw',
                height: isMorphed ? '65vh' : '100vh',
                borderRadius: isMorphed ? '24px' : '0px',
                boxShadow: isMorphed
                  ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
                  : '0 0 0 0 rgb(0 0 0 / 0)'
              }}
              initial={false}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{ zIndex: 4 }}
            >
              {/* BIRD CARD */}
              <AnimatedDiv
                style={{
                  borderWidth: isMorphed ? '10px' : '0px',
                  borderColor: isMorphed ? '#FFF9F1' : 'transparent'
                }}
                className="relative"
                animate={{
                  height: isMorphed ? '65vh' : '100vh'
                }}
                initial={false}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                {/* TOP BIRD INFO */}
                <AnimatedDiv
                  animate={{
                    opacity: isMorphed ? 1 : 0,
                    y: isMorphed ? 0 : 20
                  }}
                  initial={false}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-3 z-50 w-full px-3"
                >
                  <div className="mx-auto flex w-full gap-3 rounded-full bg-[#FFF9F1] px-2 py-1">
                    <Image
                      src={bird?.namedBird.species.iconUrl ?? ''}
                      alt={bird?.namedBird.name ?? ''}
                      width={40}
                      height={40}
                      className="rounded-full bg-[#E8EED6] object-cover"
                      fetchPriority="high"
                      loading="eager"
                      unoptimized
                      priority
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-inter text-sm font-bold text-[#322716]">
                        {' '}
                        {bird?.namedBird.name ?? ''}
                      </p>
                      <p className="font-inter text-xs text-[#322716]">
                        {' '}
                        {bird?.namedBird.species.name ?? ''}
                      </p>
                    </div>
                  </div>
                </AnimatedDiv>
                {/* BIRD IMAGE CARD */}
                <Image
                  src={
                    bird?.namedBird.previewMedia?.[0]?.__typename ===
                    'MediaImage'
                      ? bird.namedBird.previewMedia[0].thumbnailUrl
                      : ''
                  }
                  alt={bird?.namedBird.species.name ?? ''}
                  fill
                  className="object-cover"
                  unoptimized
                  fetchPriority="high"
                  priority
                  style={{ borderRadius: isMorphed ? '16px' : '0px' }}
                />
                {/* BIRD CONTENT CARD */}
                <AnimatedDiv
                  className="absolute bottom-3 left-0 w-full px-3"
                  animate={{
                    opacity: isMorphed ? 1 : 0,
                    y: isMorphed ? 0 : 20
                  }}
                  initial={false}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mx-auto flex w-full flex-col gap-3 rounded-3xl bg-[#FFF9F1] px-5 py-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-start">
                        <p className="font-inter text-xs font-light text-[#2F4646]/60">
                          First seen
                        </p>
                        <p className="font-inter text-sm text-[#182323]">
                          {bird?.namedBird.createdAt
                            ? formatDate(bird.namedBird.createdAt)
                            : ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-start pl-3">
                        <p className="font-inter text-xs font-light text-[#2F4646]/60">
                          Total visits
                        </p>
                        <p className="font-inter text-sm  text-[#182323]">
                          {bird?.identificationCount}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-inter text-xs font-light text-[#2F4646]/60">
                        Favorite snack
                      </p>
                      <p className="font-inter text-sm text-[#182323]">
                        {(
                          bird?.namedBird.species as {
                            favoriteFoods?: Array<{ name: string }>;
                          }
                        ).favoriteFoods?.[0]?.name ?? 'Seeds'}
                      </p>
                    </div>
                  </div>
                </AnimatedDiv>
              </AnimatedDiv>
            </AnimatedDiv>
          </AnimatedDiv>

          {/* NAME BADGE - Shows on initial screen, fades out when morphing */}
          <AnimatedDiv
            className="absolute bottom-[10vh] z-50 flex flex-col items-center justify-center rounded-xl bg-[#FAC370] px-5 py-3 font-awesome-serif text-4xl text-[#322716]"
            animate={{
              opacity: isMorphed ? 0 : 1,
              y: isMorphed ? 20 : 0
            }}
            initial={false}
            transition={{ duration: 0.4 }}
          >
            {bird?.namedBird.name ?? ''}
          </AnimatedDiv>
        </div>
      </section>
      {/* DESKTOP VIEW */}
      <section className="relative hidden h-[912px] w-[440px] flex-col items-center justify-center overflow-hidden bg-[#ADCFCF] md:flex">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <AnimatedDiv
            className="relative flex h-full w-full flex-col items-center"
            animate={{
              y: 0,
              marginTop: isMorphed ? '200px' : '0px'
            }}
            initial={false}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* CARDS BEHIND THE MAIN CARD */}
            <AnimatedDiv
              className="absolute h-[75%] w-[80%] rounded-3xl bg-[#BAA7D1]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? -8 : 0,
                scale: isMorphed ? 0.95 : 0.9
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.1 : 0 }}
              style={{ zIndex: 1, pointerEvents: 'none' }}
            />
            <AnimatedDiv
              className="absolute h-[75%] w-[80%] rounded-3xl bg-[#76AFAF]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? 5 : 0,
                scale: isMorphed ? 0.98 : 0.95
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.15 : 0 }}
              style={{ zIndex: 2, pointerEvents: 'none' }}
            />
            <AnimatedDiv
              className="absolute h-[75%] w-[80%] rounded-3xl bg-[#FBCF8D]"
              animate={{
                opacity: isMorphed ? 1 : 0,
                rotate: isMorphed ? -3 : 0,
                scale: isMorphed ? 0.99 : 0.96
              }}
              initial={false}
              transition={{ duration: 0.6, delay: isMorphed ? 0.2 : 0 }}
              style={{ zIndex: 3, pointerEvents: 'none' }}
            />

            <AnimatedDiv
              className="relative overflow-hidden bg-white"
              animate={{
                width: isMorphed ? '80%' : '100%',
                height: isMorphed ? '75%' : '100%',
                borderRadius: isMorphed ? '24px' : '0px',
                boxShadow: isMorphed
                  ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
                  : '0 0 0 0 rgb(0 0 0 / 0)'
              }}
              initial={false}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{ zIndex: 4 }}
            >
              {/* BIRD CARD */}
              <AnimatedDiv
                style={{
                  borderWidth: isMorphed ? '10px' : '0px',
                  borderColor: isMorphed ? '#FFF9F1' : 'transparent'
                }}
                className="relative h-full w-full"
                animate={{
                  height: isMorphed ? '100%' : '100%'
                }}
                initial={false}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                {/* TOP BIRD INFO */}
                <AnimatedDiv
                  animate={{
                    opacity: isMorphed ? 1 : 0,
                    y: isMorphed ? 0 : 20
                  }}
                  initial={false}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-3 z-50 w-full px-3"
                >
                  <div className="mx-auto flex w-full gap-3 rounded-full bg-[#FFF9F1] px-2 py-1">
                    <Image
                      src={bird?.namedBird.species.iconUrl ?? ''}
                      alt={bird?.namedBird.name ?? ''}
                      width={40}
                      height={40}
                      className="rounded-full bg-[#E8EED6] object-cover"
                      fetchPriority="high"
                      loading="eager"
                      unoptimized
                      priority
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-inter text-sm font-bold text-[#322716]">
                        {' '}
                        {bird?.namedBird.name ?? ''}
                      </p>
                      <p className="font-inter text-xs text-[#322716]">
                        {' '}
                        {bird?.namedBird.species.name ?? ''}
                      </p>
                    </div>
                  </div>
                </AnimatedDiv>
                {/* BIRD IMAGE CARD */}
                <Image
                  src={
                    bird?.namedBird.previewMedia?.[0]?.__typename ===
                    'MediaImage'
                      ? bird.namedBird.previewMedia[0].thumbnailUrl
                      : ''
                  }
                  alt={bird?.namedBird.species.name ?? ''}
                  fill
                  className="object-cover"
                  unoptimized
                  fetchPriority="high"
                  priority
                  style={{ borderRadius: isMorphed ? '16px' : '0px' }}
                />
                {/* BIRD CONTENT CARD */}
                <AnimatedDiv
                  className="absolute bottom-3 left-0 w-full px-3"
                  animate={{
                    opacity: isMorphed ? 1 : 0,
                    y: isMorphed ? 0 : 20
                  }}
                  initial={false}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mx-auto flex w-full flex-col gap-3 rounded-3xl bg-[#FFF9F1] px-5 py-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col items-start">
                        <p className="font-inter text-xs font-light text-[#2F4646]/60">
                          First seen
                        </p>
                        <p className="font-inter text-sm text-[#182323]">
                          {bird?.namedBird.createdAt
                            ? formatDate(bird.namedBird.createdAt)
                            : ''}
                        </p>
                      </div>
                      <div className="flex flex-col items-start pl-3">
                        <p className="font-inter text-xs font-light text-[#2F4646]/60">
                          Total visits
                        </p>
                        <p className="font-inter text-sm  text-[#182323]">
                          {bird?.identificationCount}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-inter text-xs font-light text-[#2F4646]/60">
                        Favorite snack
                      </p>
                      <p className="font-inter text-sm text-[#182323]">
                        {(
                          bird?.namedBird.species as {
                            favoriteFoods?: Array<{ name: string }>;
                          }
                        ).favoriteFoods?.[0]?.name ?? 'Seeds'}
                      </p>
                    </div>
                  </div>
                </AnimatedDiv>
              </AnimatedDiv>
            </AnimatedDiv>
          </AnimatedDiv>

          {/* NAME BADGE - Shows on initial screen, fades out when morphing */}
          <AnimatedDiv
            className="absolute bottom-[10%] z-50 flex flex-col items-center justify-center rounded-xl bg-[#FAC370] px-5 py-3 font-awesome-serif text-4xl text-[#322716] sm:bottom-[7.5%]"
            animate={{
              opacity: isMorphed ? 0 : 1,
              y: isMorphed ? 20 : 0
            }}
            initial={false}
            transition={{ duration: 0.4 }}
          >
            {bird?.namedBird.name ?? ''}
          </AnimatedDiv>
        </div>
      </section>
    </React.Fragment>
  );
};

export default TopNamedBirdCardSlide;
