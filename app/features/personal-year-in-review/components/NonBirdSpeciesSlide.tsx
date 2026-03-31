'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';
import { useMemo } from 'react';
import clsx from 'clsx';

import type { YearInReviewOtherAnimalStats } from '../types/types';

const NonBirdSpeciesSlide = ({
  nonBirdSpecies,
  totalVisits
}: {
  nonBirdSpecies: YearInReviewOtherAnimalStats;
  totalVisits: number;
}): React.JSX.Element => {
  // Filter out animals with empty or missing thumbnailUrls
  const validAnimals = useMemo(() => {
    return (
      nonBirdSpecies?.otherAnimals?.filter((animal: { medias?: Array<{ __typename?: string; thumbnailUrl?: string }>; visitCount: number }) => {
        const firstMedia = animal.medias?.[0];

        return (
          firstMedia?.__typename === 'MediaImage' &&
          firstMedia.thumbnailUrl !== ''
        );
      }) ?? []
    );
  }, [nonBirdSpecies]);

  const nonBirdSpeciesLength = validAnimals.length;
  const hasNoUgcMedia = nonBirdSpeciesLength === 0;

  const nonBirdSpeciesVisits = nonBirdSpeciesLength
    ? validAnimals
        .map((otherAnimal: { visitCount: number }) => otherAnimal.visitCount)
        .reduce((acc: number, visitCount: number) => acc + visitCount, 0)
    : 0;

  const percentageOfTotalVisits =
    (nonBirdSpeciesVisits / totalVisits) * 100 < 1
      ? 1
      : (nonBirdSpeciesVisits / totalVisits) * 100;

  // Create 2 rows with 12 images each, cycling through validAnimals for variety
  const imageRows = useMemo(() => {
    if (hasNoUgcMedia) return [];

    return Array.from({ length: 2 }, (_, rowIndex) => ({
      rowId: rowIndex,
      images: Array.from({ length: 12 }, (_, colIndex) => {
        const speciesIndex = (rowIndex * 12 + colIndex) % nonBirdSpeciesLength;
        const species = validAnimals[speciesIndex];
        const mediaIndex = colIndex % (species?.medias?.length ?? 1);
        const media = species?.medias?.[mediaIndex];

        return {
          id: `${rowIndex}-${colIndex}`,
          thumbnailUrl:
            media?.__typename === 'MediaImage' ? media.thumbnailUrl : '',
          name: species?.species.name ?? ''
        };
      })
    }));
  }, [validAnimals, nonBirdSpeciesLength, hasNoUgcMedia]);

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden bg-[#C8B9DA] px-10 font-inter">
      {/* IN CASE OF NO UGC */}
      {hasNoUgcMedia && (
        <div className="absolute bottom-0 right-0 h-full w-full">
          {/* TREE IMAGE */}
          <AnimatedDiv
            initial={{ x: 70 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute -right-6 bottom-0"
          >
            <Image
              src="/images/projects/personal-year-in-review/slides/tree-non-bird-slide.png"
              alt="Other animals visited"
              width={1000}
              height={1000}
              className="z-30 object-contain"
              unoptimized
              loading="eager"
              priority
            />
          </AnimatedDiv>
          {/* GRASS IMAGE */}
          <AnimatedDiv
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 z-40 w-full"
          >
            <Image
              src="/images/projects/personal-year-in-review/slides/grass-non-bird-slide.png"
              alt="Other animals visited"
              width={500}
              height={500}
              className="object-contain"
              unoptimized
              loading="eager"
              priority
            />
          </AnimatedDiv>
          {/* SQUIRREL IMAGE */}
          <AnimatedDiv
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 right-0 z-50 w-full"
          >
            <Image
              src="/images/projects/personal-year-in-review/slides/squirrel-non-bird-slide.png"
              alt="Other animals visited"
              width={500}
              height={500}
              className="object-contain"
              unoptimized
              loading="eager"
              priority
            />
          </AnimatedDiv>
          {/* RACCOON IMAGE */}
          <AnimatedDiv
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute -bottom-2 right-5 z-30 w-4/5"
          >
            <Image
              src="/images/projects/personal-year-in-review/slides/racoon-non-bird-slide.png"
              alt="Other animals visited"
              width={500}
              height={500}
              className="object-contain"
              unoptimized
              loading="eager"
              priority
            />
          </AnimatedDiv>
        </div>
      )}
      <div
        className={clsx(
          'mt-24 grid w-full grid-cols-2 items-center gap-4',
          hasNoUgcMedia && 'mt-0 flex flex-col items-start justify-start pb-52'
        )}
      >
        <AnimatedText
          className={clsx(
            'pb-2 text-center font-awesome-serif text-8xl text-[#25212A]',
            Number(percentageOfTotalVisits.toFixed(0)) > 10 && 'text-[5.2rem]'
          )} // prevent text from being too large when percentage is more than 10%
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {percentageOfTotalVisits.toFixed(0)}%
        </AnimatedText>
        <AnimatedTitle
          className={clsx(
            'text-left text-lg font-light text-[#25212A]',
            hasNoUgcMedia && 'max-w-[50%]'
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          of all your visits were not by feathered friends.
        </AnimatedTitle>
      </div>
      {!hasNoUgcMedia && (
        <div className="relative flex flex-col justify-center gap-2 py-4">
          {imageRows.map((row, rowIndex) => (
            <AnimatedDiv
              key={row.rowId}
              className="flex gap-2"
              initial={{
                x: rowIndex % 2 === 0 ? 0 : -600
              }}
              animate={{
                x: rowIndex % 2 === 0 ? -600 : 0
              }}
              transition={{
                duration: 100,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
            >
              {/* ORIGINAL SET OF IMAGES */}
              {row.images.map((item) => (
                <div
                  key={item.id}
                  className="relative !aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    fetchPriority="high"
                    loading="eager"
                    priority
                  />
                </div>
              ))}
              {/* DUPLICATE SET FOR SEAMLESS LOOP */}
              {row.images.map((item) => (
                <div
                  key={`${item.id}-duplicate`}
                  className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                    loading="eager"
                    priority
                  />
                </div>
              ))}
            </AnimatedDiv>
          ))}
        </div>
      )}
    </section>
  );
};

export default NonBirdSpeciesSlide;
