'use client';

import { MOCK_YEAR_IN_REVIEW_DATA } from './constants/constants';
import { calculateBirderProfile, createNavigationHandler } from './utils/utils';
import Image from 'next/image';
import React, { useCallback, useMemo, useRef } from 'react';
import Stories, { WithSeeMore } from 'react-insta-stories';
import type { Action, Story } from 'react-insta-stories/dist/interfaces';

import HeroSlide from './components/HeroSlide';
import HeroContinuationSlide from './components/HeroContinuationSlide';
import TotalVisitsSlide from './components/TotalVisitsSlide';
import SeedConsumptionSlide from './components/SeedConsumptionSlide';
import BusiestMonthSlide from './components/BusiestMonthSlide';
import TotalSpeciesSlide from './components/TotalSpeciesSlide';
import TopVisitedSpeciesSlide from './components/TopVisitedSpeciesSlide';
import TopSingularSpeciesSlide from './components/TopSingularSpeciesSlide';
import NonBirdSpeciesSlide from './components/NonBirdSpeciesSlide';
import FeederIsAFortSlide from './components/FeederIsAFortSlide';
import NamedBirdsSlide from './components/NamedBirdsSlide';
import TopNamedBirdCardSlide from './components/TopNamedBirdCardSlide';
import RareGuestSlide from './components/RareGuestSlide';
import GlobalStatsSlide from './components/GlobalStatsSlide';
import WhatDoesItMeanSlide from './components/WhatDoesItMeanSlide';
import BirderProfileSlide from './components/BirderProfileSlide';
import ThankYouSlide from './components/ThankYouSlide';
import FinalSlide from './components/FinalSlide';
import NavigationButton from './components/NavigationButton';

type PersonalYearStories = React.ComponentProps<typeof Stories>['stories'];
type SeeMoreContentProps = { action: Action; story: Story };

const PersonalYearInReview = (): React.ReactNode => {
  const desktopStoriesContainerRef = useRef<HTMLDivElement>(null);

  const birderProfile = calculateBirderProfile({
    totalVisits: MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits,
    distinctSpeciesCount:
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.length,
    namedBirdsCount:
      MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds?.length || 0,
    otherAnimalVisitsCount:
      MOCK_YEAR_IN_REVIEW_DATA.otherAnimalVisitStats?.otherAnimals?.reduce(
        (acc: number, animal: { visitCount: number }) =>
          acc + animal.visitCount,
        0,
      ) || 0,
  });

  const stories = useMemo<PersonalYearStories>(() => {
    return [
      {
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <HeroSlide key="hero" />
          </WithSeeMore>
        ),
      },
      {
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <HeroContinuationSlide key="hero-continuation" />
          </WithSeeMore>
        ),
      },
      ...(MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'total-visits',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TotalVisitsSlide
                    totalVisits={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits
                    }
                    totalVisitsPercentile={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats
                        .totalVisitsPercentile
                    }
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats
        .hasFeederHousingTypeClassicVisits &&
      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits > 50
        ? [
            {
              key: 'seed-consumption',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <SeedConsumptionSlide
                    totalVisits={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits
                    }
                    totalVisitsPercentile={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats
                        .totalVisitsPercentile
                    }
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats?.distinctSpecies &&
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.length > 0 &&
      MOCK_YEAR_IN_REVIEW_DATA.monthlyVisitStats?.monthlyVisits &&
      MOCK_YEAR_IN_REVIEW_DATA.monthlyVisitStats.monthlyVisits.length > 0 &&
      MOCK_YEAR_IN_REVIEW_DATA.dailyVisitStats?.topDays &&
      MOCK_YEAR_IN_REVIEW_DATA.dailyVisitStats.topDays.length > 0
        ? [
            {
              key: 'busiest-month',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <BusiestMonthSlide
                    dailyVisitStats={MOCK_YEAR_IN_REVIEW_DATA.dailyVisitStats}
                    monthlyVisitStats={
                      MOCK_YEAR_IN_REVIEW_DATA.monthlyVisitStats
                    }
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats?.distinctSpecies &&
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.length > 0
        ? [
            {
              key: 'total-species',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TotalSpeciesSlide
                    totalSpeciesVisited={
                      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies
                        .length
                    }
                    totalSpeciesVisitedPercentile={
                      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats
                        .distinctSpeciesPercentile
                    }
                    speciesVisitedIcons={MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies
                      .slice(0, 3)
                      .map(
                        (species: { species: { iconUrl: string } }) =>
                          species.species.iconUrl,
                      )}
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats?.distinctSpecies &&
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.length > 2
        ? [
            {
              key: 'top-visited-species',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopVisitedSpeciesSlide
                    topSpeciesVisited={MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.slice(
                      0,
                      3,
                    )}
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats?.distinctSpecies &&
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats.distinctSpecies.length > 0 &&
      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'top-singular-species',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopSingularSpeciesSlide
                    topVisitedSpecies={
                      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats
                        .distinctSpecies[0]
                    }
                    totalVisits={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits
                    }
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.otherAnimalVisitStats?.otherAnimals !==
        null &&
      MOCK_YEAR_IN_REVIEW_DATA.otherAnimalVisitStats?.otherAnimals !==
        undefined &&
      MOCK_YEAR_IN_REVIEW_DATA.otherAnimalVisitStats?.otherAnimals?.length >
        0 &&
      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'non-bird-species',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <NonBirdSpeciesSlide
                    nonBirdSpecies={
                      MOCK_YEAR_IN_REVIEW_DATA.otherAnimalVisitStats
                    }
                    totalVisits={
                      MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats.totalVisits
                    }
                  />
                </WithSeeMore>
              ),
            },
          ]
        : [
            {
              key: 'feeder-is-a-fort',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <FeederIsAFortSlide />
                </WithSeeMore>
              ),
            },
          ]),
      ...(MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds !== null &&
      MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds !== undefined &&
      MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds?.length > 0
        ? [
            {
              key: 'named-birds',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <NamedBirdsSlide
                    namedBirds={MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats}
                  />
                </WithSeeMore>
              ),
              duration:
                ((MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds
                  ?.length ?? 0) +
                  1) *
                2000,
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds !== null &&
      MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds !== undefined &&
      MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats?.namedBirds?.length > 0
        ? [
            {
              key: 'top-named-bird-card',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopNamedBirdCardSlide
                    topNamedBird={MOCK_YEAR_IN_REVIEW_DATA.namedBirdVisitStats}
                  />
                </WithSeeMore>
              ),
              duration: 8000,
            },
          ]
        : []),
      ...(MOCK_YEAR_IN_REVIEW_DATA.rareGuestVisitStats?.rareGuest !== null &&
      MOCK_YEAR_IN_REVIEW_DATA.rareGuestVisitStats?.rareGuest !== undefined
        ? [
            {
              key: 'rare-guest',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <RareGuestSlide
                    rareGuest={MOCK_YEAR_IN_REVIEW_DATA.rareGuestVisitStats}
                  />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      {
        key: 'global-stats',
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <GlobalStatsSlide />
          </WithSeeMore>
        ),
      },
      {
        key: 'what-does-it-mean',
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <WhatDoesItMeanSlide />
          </WithSeeMore>
        ),
      },
      ...(MOCK_YEAR_IN_REVIEW_DATA.generalVisitStats?.totalVisits !==
        undefined &&
      MOCK_YEAR_IN_REVIEW_DATA.speciesVisitStats?.distinctSpecies !==
        undefined &&
      MOCK_YEAR_IN_REVIEW_DATA.monthlyVisitStats?.monthlyVisits !== undefined
        ? [
            {
              key: 'birder-profile',
              content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <BirderProfileSlide birderProfile={birderProfile} />
                </WithSeeMore>
              ),
            },
          ]
        : []),
      {
        key: 'thank-you',
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <ThankYouSlide />
          </WithSeeMore>
        ),
      },
      {
        key: 'final',
        content: ({ action, story }: SeeMoreContentProps): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <FinalSlide />
          </WithSeeMore>
        ),
        duration: 10000000,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviousSlide = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      createNavigationHandler(desktopStoriesContainerRef, 0.25)(e);
    },
    [],
  );

  const handleNextSlide = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      createNavigationHandler(desktopStoriesContainerRef, 0.75)(e);
    },
    [],
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FFF3DC]">
      <NavigationButton direction="prev" onClick={handlePreviousSlide} />

      <div
        ref={desktopStoriesContainerRef}
        className="relative h-full w-full overflow-hidden"
      >
        <div className="absolute left-1/2 top-16 z-50 -translate-x-1/2">
          <Image
            src="/images/projects/personal-year-in-review/slides/year-in-review-logo.svg"
            alt="Year in Review logo"
            width={30}
            height={30}
            priority
          />
        </div>
        <Stories
          loop={false}
          storyContainerStyles={{
            backgroundColor: 'transparent',
          }}
          width="100%"
          defaultInterval={10000}
          height="100%"
          progressContainerStyles={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75%',
          }}
          preloadCount={3}
          stories={stories}
        />
      </div>

      <NavigationButton direction="next" onClick={handleNextSlide} />
    </div>
  );
};

export default PersonalYearInReview;
