import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';
import React from 'react';

import { YearInReviewForUserRareGuestRarityType } from '../types/types';

import type { YearInReviewRareGuestStats } from '../types/types';

const RareGuestSlide = ({
  rareGuest,
}: {
  rareGuest: YearInReviewRareGuestStats;
}): React.JSX.Element | null => {
  if (!rareGuest || !rareGuest.rareGuest) {
    return null;
  }

  const firstRareGuestMedia = rareGuest.rareGuest.medias?.[0];
  const thumbnailUrl =
    firstRareGuestMedia?.__typename === 'MediaImage'
      ? firstRareGuestMedia.thumbnailUrl
      : '';

  const isTopSpeciesContributor =
    rareGuest.rarityType ===
    YearInReviewForUserRareGuestRarityType.TopSpeciesContributor;
  const isRareSpecies =
    rareGuest.rarityType === YearInReviewForUserRareGuestRarityType.RareSpecies;
  const isRareForUser =
    rareGuest.rarityType === YearInReviewForUserRareGuestRarityType.RareForUser;

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#EBC8C8] px-4 sm:h-[912px] sm:w-[440px]">
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center gap-10 font-inter">
        <AnimatedTitle
          className="text-center font-awesome-serif text-4xl text-[#25212A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isTopSpeciesContributor ? 'The very best!' : 'A rare guest!'}
        </AnimatedTitle>
        <AnimatedDiv
          className="relative flex w-full items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {thumbnailUrl && (
            <React.Fragment>
              <Image
                src={thumbnailUrl}
                alt={rareGuest.rareGuest.species.name}
                width={300}
                height={300}
                className="rounded-b-2xl rounded-t-full object-cover"
                fetchPriority="high"
                unoptimized
                priority
              />
              {isRareSpecies && (
                <AnimatedDiv className="absolute -bottom-5 w-[85vw] rounded-2xl bg-[#DDA3A3] px-8 py-3 text-center text-lg text-white sm:w-[350px]">
                  <p>
                    You were one of only{' '}
                    <span className="font-bold">{rareGuest.rarityValue}%</span>{' '}
                    of feeders to host a<br />
                    <span className="font-bold">
                      {rareGuest.rareGuest.species.name}
                    </span>
                    .
                  </p>
                </AnimatedDiv>
              )}
              {isRareForUser && (
                <AnimatedDiv className="absolute -bottom-5 w-[85vw] rounded-2xl bg-[#DDA3A3] px-8 py-3 text-center text-lg text-white sm:w-[350px]">
                  <p>
                    Your feeder even attracted a <br />
                    <span className="font-bold">
                      {rareGuest.rareGuest.species.name} <br />
                    </span>
                    one of the rarest visitors in your backyard this year.
                  </p>
                </AnimatedDiv>
              )}
              {isTopSpeciesContributor && (
                <AnimatedDiv className="absolute -bottom-5 w-[85vw] rounded-2xl bg-[#DDA3A3] px-8 py-3 text-center text-lg text-white sm:w-[350px]">
                  <p>
                    You&apos;re in the{' '}
                    <span className="font-bold">
                      top {rareGuest.rarityValue}%
                    </span>{' '}
                    of feeders capturing visits from <br />
                    <span className="font-bold">
                      {rareGuest.rareGuest.species.name}. <br />
                    </span>
                    They clearly love stopping by!
                  </p>
                </AnimatedDiv>
              )}
            </React.Fragment>
          )}
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default RareGuestSlide;
