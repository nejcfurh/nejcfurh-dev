'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import Image from 'next/image';
import { useMemo } from 'react';

import type { YearInReviewSpeciesVisit } from '../types/types';

type TopVisitedSpeciesProps = {
  topVisitedSpecies: YearInReviewSpeciesVisit;
  totalVisits: number;
};

const TopSingularSpeciesSlide = ({
  topVisitedSpecies,
  totalVisits
}: TopVisitedSpeciesProps): React.JSX.Element => {
  const percentageOfTotalVisits =
    (topVisitedSpecies.visitCount / totalVisits) * 100;
  // Create 6 rows with 6 images each, duplicated for seamless scrolling
  const imageRows = useMemo(() => {
    const mediasLength = topVisitedSpecies.medias?.length || 0;

    return Array.from({ length: 6 }, (_, rowIndex) => ({
      rowId: rowIndex,
      images: Array.from({ length: 6 }, (_, colIndex) => {
        const mediaIndex = (rowIndex * 6 + colIndex) % mediasLength;
        const media = topVisitedSpecies.medias?.[mediaIndex];

        return {
          id: `${rowIndex}-${colIndex}`,
          thumbnailUrl:
            media?.__typename === 'MediaImage' ? media.thumbnailUrl : ''
        };
      })
    }));
  }, [topVisitedSpecies.medias]);

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#A8B48C] pt-10 font-inter">
      {/* BACKGROUND GRID OF MOVING IMAGES */}
      <div className="absolute inset-0 flex flex-col gap-2 py-4">
        {imageRows.map((row, rowIndex) => {
          // Calculate smooth animation distance based on row content
          const slideDistance = 616;

          return (
            <AnimatedDiv
              key={row.rowId}
              className="flex shrink-0 gap-2 will-change-transform"
              initial={{
                x: rowIndex % 2 === 0 ? 0 : -slideDistance
              }}
              animate={{
                x: rowIndex % 2 === 0 ? -slideDistance : 0
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
              style={{
                backfaceVisibility: 'hidden',
                perspective: 1000
              }}
            >
              {/* ORIGINAL SET OF IMAGES */}
              {row.images.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-2xl"
                >
                  {item.thumbnailUrl !== '' && (
                    <Image
                      src={item.thumbnailUrl}
                      alt={topVisitedSpecies.species.name}
                      fill
                      className="object-cover"
                      unoptimized
                      loading="eager"
                      priority
                    />
                  )}
                </div>
              ))}
              {/* DUPLICATE SET FOR SEAMLESS LOOP */}
              {row.images.map((item) => (
                <div
                  key={`${item.id}-duplicate`}
                  className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-2xl"
                >
                  {item.thumbnailUrl !== '' && (
                    <Image
                      src={item.thumbnailUrl}
                      alt={topVisitedSpecies.species.name}
                      fill
                      className="object-cover"
                      unoptimized
                      loading="eager"
                      priority
                    />
                  )}
                </div>
              ))}
            </AnimatedDiv>
          );
        })}
      </div>

      {/* CONTENT OVERLAY */}
      <AnimatedDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-[80%] flex-col items-center justify-center gap-3 rounded-3xl bg-[#E8EED6]/70 px-5 py-5 text-center backdrop-blur-md"
      >
        <AnimatedText
          className="text-center font-inter text-2xl text-[#1E2412]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-bold">
            {percentageOfTotalVisits.toFixed(0)}%
          </span>{' '}
          of visits were by
        </AnimatedText>
        <AnimatedText
          className="mt-2 font-awesome-serif text-5xl text-[#1E2412]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {`${topVisitedSpecies.species.name}s`}
        </AnimatedText>
        <AnimatedText
          className="mt-4 text-lg font-light text-[#1E2412]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          They&apos;re clearly telling their friends.
        </AnimatedText>
      </AnimatedDiv>
    </section>
  );
};

export default TopSingularSpeciesSlide;
