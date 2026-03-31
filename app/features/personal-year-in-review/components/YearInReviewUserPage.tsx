'use client';

import { PageVisitTracker, useAnalytics } from '@shared-analytics';
import { AnalyticsClientEventType } from 'app/features/analytics/constants';
import type { AnalyticsClientEvent } from 'app/features/analytics/types.client';
import BirderProfileSlide from 'app/features/year-in-review/components/BirderProfileSlide';
import BusiestMonthSlide from 'app/features/year-in-review/components/BusiestMonthSlide';
import DesktopPreview from 'app/features/year-in-review/components/DesktopPreview';
import FeederIsAFortSlide from 'app/features/year-in-review/components/FeederIsAFortSlide';
import FinalSlide from 'app/features/year-in-review/components/FinalSlide';
import GlobalStatsSlide from 'app/features/year-in-review/components/GlobalStatsSlide';
import HeroContinuationSlide from 'app/features/year-in-review/components/HeroContinuationSlide';
import HeroSlide from 'app/features/year-in-review/components/HeroSlide';
import NamedBirdsSlide from 'app/features/year-in-review/components/NamedBirdsSlide';
import NavigationButton from 'app/features/year-in-review/components/NavigationButton';
import NonBirdSpeciesSlide from 'app/features/year-in-review/components/NonBirdSpeciesSlide';
import RareGuestSlide from 'app/features/year-in-review/components/RareGuestSlide';
import SeedConsumptionSlide from 'app/features/year-in-review/components/SeedConsumptionSlide';
import ShareButton from 'app/features/year-in-review/components/ShareButton';
import ShareButtonCollapsed from 'app/features/year-in-review/components/ShareButtonCollapsed';
import ShareButtonCollapsedFinalSlide from 'app/features/year-in-review/components/ShareButtonCollapsedFinalSlide';
import ThankYouSlide from 'app/features/year-in-review/components/ThankYouSlide';
import TopNamedBirdCardSlide from 'app/features/year-in-review/components/TopNamedBirdCardSlide';
import TopSingularSpeciesSlide from 'app/features/year-in-review/components/TopSingularSpeciesSlide';
import TopVisitedSpeciesSlide from 'app/features/year-in-review/components/TopVisitedSpeciesSlide';
import TotalSpeciesSlide from 'app/features/year-in-review/components/TotalSpeciesSlide';
import TotalVisitsSlide from 'app/features/year-in-review/components/TotalVisitsSlide';
import WhatDoesItMeanSlide from 'app/features/year-in-review/components/WhatDoesItMeanSlide';
import { useImageCollage } from 'app/features/year-in-review/hooks/useImageCollage';
import { useNamedBirdImagePreload } from 'app/features/year-in-review/hooks/useNamedBirdImagePreload';
import { useShareMedia } from 'app/features/year-in-review/hooks/useShareMedia';
import { useTopSpeciesImagePreload } from 'app/features/year-in-review/hooks/useTopSpeciesImagePreload';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Stories, { WithSeeMore } from 'react-insta-stories';
import clsx from 'clsx';

import { PageName } from '@utils/constants/page.data';

import { useIsAndroid } from '@hooks/effect.hooks';

import logoImage from '@/public/images/projects/personal-year-in-review/slides/year-in-review-logo.svg';

import type { YearInReviewQueryData } from '../types/types';
import { calculateBirderProfile, createNavigationHandler } from '../utils';

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-negated-condition */

interface YearInReviewUserPageProps {
  yearInReviewData: YearInReviewQueryData;
}

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const YearInReviewUserPage = ({
  yearInReviewData
}: YearInReviewUserPageProps): React.JSX.Element => {
  const { trackEvent } = useAnalytics<AnalyticsClientEvent>();

  const isAndroid = useIsAndroid();
  const desktopStoriesContainerRef = useRef<HTMLDivElement>(null);

  const {
    generalVisitStats,
    speciesVisitStats,
    dailyVisitStats,
    monthlyVisitStats,
    namedBirdVisitStats,
    otherAnimalVisitStats,
    rareGuestVisitStats
  } = yearInReviewData;

  const { imageBlobs, imageUrls, isGenerating } = useImageCollage({
    generalVisitStats,
    speciesVisitStats,
    namedBirdVisitStats,
    rareGuestVisitStats,
    otherAnimalVisitStats,
    monthlyVisitStats
  });

  const { shareMedia } = useShareMedia({
    imageBlobs
  });

  // PRELOADING NAMED BIRD IMAGES FOR CAROUSEL AND TOP BIRD CARD
  useNamedBirdImagePreload({
    namedBirdVisitStats
  });

  // PRELOADING TOP SPECIES IMAGES FOR SCROLLING GRID
  useTopSpeciesImagePreload({
    topSpecies: speciesVisitStats?.distinctSpecies?.[0]
  });

  // Use refs to avoid stories array recomputing when shareMedia/isGenerating changes
  const shareMediaRef = useRef(shareMedia);
  const isGeneratingRef = useRef(isGenerating);

  useEffect(() => {
    shareMediaRef.current = shareMedia;
    isGeneratingRef.current = isGenerating;
  }, [shareMedia, isGenerating]);

  // THE ENTIRE STORIES ARRAY
  const stories = useMemo(() => {
    return [
      {
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <HeroSlide key="hero" />
          </WithSeeMore>
        )
        // duration: 10000
      },
      {
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <HeroContinuationSlide key="hero-continuation" />
          </WithSeeMore>
        )
      },
      ...(generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'total-visits',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TotalVisitsSlide
                    totalVisits={generalVisitStats.totalVisits}
                    totalVisitsPercentile={
                      generalVisitStats.totalVisitsPercentile
                    }
                  />
                </WithSeeMore>
              ),
              // duration: 8000,
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={TotalVisitsSlide}
                  slideProps={{
                    totalVisits: generalVisitStats.totalVisits,
                    totalVisitsPercentile:
                      generalVisitStats.totalVisitsPercentile
                  }}
                  slideKey="TotalVisitsSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#DC7E7E]"
                />
              )
            }
          ]
        : []),
      // Only include SeedConsumptionSlide if user has classic housing type visits
      ...(generalVisitStats?.hasFeederHousingTypeClassicVisits &&
      generalVisitStats?.totalVisits > 50
        ? [
            {
              key: 'seed-consumption',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <SeedConsumptionSlide
                    totalVisits={generalVisitStats.totalVisits}
                    totalVisitsPercentile={
                      generalVisitStats.totalVisitsPercentile
                    }
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={SeedConsumptionSlide}
                  slideProps={{
                    totalVisits: generalVisitStats.totalVisits,
                    totalVisitsPercentile:
                      generalVisitStats.totalVisitsPercentile
                  }}
                  slideKey="SeedConsumptionSlide"
                  logoColor="secondary"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#FBCF8D]"
                />
              )
            }
          ]
        : []),
      ...(speciesVisitStats?.distinctSpecies &&
      speciesVisitStats.distinctSpecies.length > 0 &&
      monthlyVisitStats?.monthlyVisits &&
      monthlyVisitStats.monthlyVisits.length > 0 &&
      dailyVisitStats?.topDays &&
      dailyVisitStats.topDays.length > 0
        ? [
            {
              key: 'busiest-month',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <BusiestMonthSlide
                    monthlyVisitStats={monthlyVisitStats}
                    dailyVisitStats={dailyVisitStats}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={BusiestMonthSlide}
                  slideProps={{
                    monthlyVisitStats,
                    dailyVisitStats
                  }}
                  slideKey="BusiestMonthSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[##C8B9DA]"
                />
              )
            }
          ]
        : []),
      ...(speciesVisitStats?.distinctSpecies &&
      speciesVisitStats.distinctSpecies.length > 0
        ? [
            {
              key: 'total-species',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TotalSpeciesSlide
                    totalSpeciesVisited={
                      speciesVisitStats.distinctSpecies.length
                    }
                    totalSpeciesVisitedPercentile={
                      speciesVisitStats.distinctSpeciesPercentile
                    }
                    speciesVisitedIcons={speciesVisitStats.distinctSpecies.map(
                      (species) => species.species.iconUrl
                    )}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={TotalSpeciesSlide}
                  slideProps={{
                    totalSpeciesVisited:
                      speciesVisitStats.distinctSpecies.length,
                    totalSpeciesVisitedPercentile:
                      speciesVisitStats.distinctSpeciesPercentile,
                    speciesVisitedIcons: speciesVisitStats.distinctSpecies.map(
                      (species) => species.species.iconUrl
                    )
                  }}
                  slideKey="TotalSpeciesSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#95CBDC]"
                />
              )
            }
          ]
        : []),
      ...(speciesVisitStats?.distinctSpecies &&
      speciesVisitStats.distinctSpecies.length > 2
        ? [
            {
              key: 'top-visited-species',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopVisitedSpeciesSlide
                    topSpeciesVisited={speciesVisitStats.distinctSpecies.slice(
                      0,
                      3
                    )}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={TopVisitedSpeciesSlide}
                  slideProps={{
                    topSpeciesVisited: speciesVisitStats.distinctSpecies.slice(
                      0,
                      3
                    )
                  }}
                  slideKey="TopVisitedSpeciesSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#E0A78F]"
                />
              )
            }
          ]
        : []),
      ...(speciesVisitStats?.distinctSpecies &&
      speciesVisitStats.distinctSpecies.length > 0 &&
      generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'top-singular-species',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopSingularSpeciesSlide
                    topVisitedSpecies={speciesVisitStats.distinctSpecies[0]}
                    totalVisits={generalVisitStats.totalVisits}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={TopSingularSpeciesSlide}
                  slideProps={{
                    topVisitedSpecies: speciesVisitStats.distinctSpecies[0],
                    totalVisits: generalVisitStats.totalVisits
                  }}
                  slideKey="TopSingularSpeciesSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#A8B48C]"
                />
              )
            }
          ]
        : []),
      ...(otherAnimalVisitStats?.otherAnimals !== null &&
      otherAnimalVisitStats?.otherAnimals !== undefined &&
      otherAnimalVisitStats?.otherAnimals?.length > 0 &&
      generalVisitStats?.totalVisits !== undefined
        ? [
            {
              key: 'non-bird-species',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <NonBirdSpeciesSlide
                    nonBirdSpecies={otherAnimalVisitStats}
                    totalVisits={generalVisitStats.totalVisits}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={NonBirdSpeciesSlide}
                  slideProps={{
                    nonBirdSpecies: otherAnimalVisitStats,
                    totalVisits: generalVisitStats.totalVisits
                  }}
                  slideKey="NonBirdSpeciesSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#C8B9DA]"
                />
              )
            }
          ]
        : [
            {
              key: 'feeder-is-a-fort',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <FeederIsAFortSlide />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={FeederIsAFortSlide}
                  slideProps={{}}
                  slideKey="FeederIsAFortSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#C8B9DA]"
                />
              )
            }
          ]),
      ...(namedBirdVisitStats?.namedBirds !== null &&
      namedBirdVisitStats?.namedBirds !== undefined &&
      namedBirdVisitStats?.namedBirds?.length > 0
        ? [
            {
              key: 'named-birds',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <NamedBirdsSlide namedBirds={namedBirdVisitStats} />
                </WithSeeMore>
              ),
              duration: (namedBirdVisitStats.namedBirds.length + 1) * 2000
            }
          ]
        : []),
      ...(namedBirdVisitStats?.namedBirds !== null &&
      namedBirdVisitStats?.namedBirds !== undefined &&
      namedBirdVisitStats?.namedBirds?.length > 0
        ? [
            {
              key: 'top-named-bird-card',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <TopNamedBirdCardSlide topNamedBird={namedBirdVisitStats} />
                </WithSeeMore>
              ),
              duration: 8000,
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={TopNamedBirdCardSlide}
                  slideProps={{
                    topNamedBird: namedBirdVisitStats
                  }}
                  slideKey="TopNamedBirdCardSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#ADCFCF]"
                />
              )
            }
          ]
        : []),
      ...(rareGuestVisitStats?.rareGuest !== null &&
      rareGuestVisitStats?.rareGuest !== undefined
        ? [
            {
              key: 'rare-guest',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <RareGuestSlide rareGuest={rareGuestVisitStats} />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={RareGuestSlide}
                  slideProps={{
                    rareGuest: rareGuestVisitStats
                  }}
                  slideKey="RareGuestSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#EBC8C8]"
                />
              )
            }
          ]
        : []),
      {
        key: 'global-stats',
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <GlobalStatsSlide />
          </WithSeeMore>
        ),
        seeMore: ({ close, action }): React.JSX.Element => (
          <ShareButton
            close={close}
            action={action}
            shareMedia={shareMedia}
            isGeneratingImage={isGenerating}
            slideComponent={GlobalStatsSlide}
            slideProps={{}}
            slideKey="GlobalStatsSlide"
            logoColor="secondary"
          />
        ),
        seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
          <ShareButtonCollapsed
            toggleMore={toggleMore}
            action={action}
            className="from-[#A3C8D8]"
          />
        )
      },
      {
        key: 'what-does-it-mean',
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <WhatDoesItMeanSlide />
          </WithSeeMore>
        )
      },
      ...(generalVisitStats?.totalVisits !== undefined &&
      speciesVisitStats?.distinctSpecies !== undefined &&
      monthlyVisitStats?.monthlyVisits !== undefined
        ? [
            {
              key: 'birder-profile',
              content: ({ action, story }): React.JSX.Element => (
                <WithSeeMore story={story} action={action}>
                  <BirderProfileSlide
                    birderProfile={calculateBirderProfile({
                      totalVisits: generalVisitStats.totalVisits,
                      distinctSpeciesCount:
                        speciesVisitStats.distinctSpecies.length,
                      namedBirdsCount:
                        namedBirdVisitStats?.namedBirds?.length || 0,
                      otherAnimalVisitsCount:
                        otherAnimalVisitStats?.otherAnimals?.reduce(
                          (acc, animal) => acc + animal.visitCount,
                          0
                        ) || 0
                    })}
                  />
                </WithSeeMore>
              ),
              seeMore: ({ close, action }): React.JSX.Element => (
                <ShareButton
                  close={close}
                  action={action}
                  shareMedia={shareMediaRef.current}
                  isGeneratingImage={isGeneratingRef.current}
                  slideComponent={BirderProfileSlide}
                  slideProps={{
                    birderProfile: calculateBirderProfile({
                      totalVisits: generalVisitStats.totalVisits,
                      distinctSpeciesCount:
                        speciesVisitStats.distinctSpecies.length,
                      namedBirdsCount:
                        namedBirdVisitStats?.namedBirds?.length || 0,
                      otherAnimalVisitsCount:
                        otherAnimalVisitStats?.otherAnimals?.reduce(
                          (acc, animal) => acc + animal.visitCount,
                          0
                        ) || 0
                    })
                  }}
                  slideKey="BirderProfileSlide"
                />
              ),
              seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
                <ShareButtonCollapsed
                  toggleMore={toggleMore}
                  action={action}
                  className="from-[#F7E9E3]"
                />
              )
            }
          ]
        : []),
      {
        key: 'thank-you',
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <ThankYouSlide />
          </WithSeeMore>
        )
      },
      {
        key: 'final',
        content: ({ action, story }): React.JSX.Element => (
          <WithSeeMore story={story} action={action}>
            <FinalSlide />
          </WithSeeMore>
        ),
        seeMore: ({ close, action }): React.JSX.Element => (
          <ShareButton
            close={close}
            action={action}
            shareMedia={shareMediaRef.current}
            isGeneratingImage={isGeneratingRef.current}
          />
        ),
        seeMoreCollapsed: ({ toggleMore, action }): React.JSX.Element => (
          <ShareButtonCollapsedFinalSlide
            toggleMore={toggleMore}
            action={action}
          />
        ),
        duration: 10000000
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // shareMedia accessed via ref, isGenerating only affects ShareButton props
    generalVisitStats,
    speciesVisitStats,
    namedBirdVisitStats,
    otherAnimalVisitStats,
    monthlyVisitStats,
    rareGuestVisitStats,
    dailyVisitStats
  ]);

  // TRACKING
  const trackStoryViewed = (storyIndex: number): void => {
    const story = stories[storyIndex];

    if (story?.key) {
      trackEvent({
        eventName: AnalyticsClientEventType.STORY_VIEWED,
        properties: {
          StoryName: story.key
        }
      });
    }
  };

  const trackAllStoriesViewed = (): void => {
    trackEvent({
      eventName: AnalyticsClientEventType.ALL_STORIES_VIEWED,
      properties: {
        numberOfStories: stories.length
      }
    });
  };

  const handlePreviousSlide = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      createNavigationHandler(desktopStoriesContainerRef, 0.25)(e);
    },
    []
  );

  const handleNextSlide = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      createNavigationHandler(desktopStoriesContainerRef, 0.75)(e);
    },
    []
  );

  return (
    <React.Fragment>
      {/* MOBILE VIEW - Stories */}
      <div
        className={clsx(
          'relative block min-h-screen sm:hidden',
          isAndroid && 'min-h-full overscroll-none'
        )}
      >
        {/* FIXED LOGO - APPEARS ABOVE ALL STORIES */}
        <div
          className={clsx(
            'absolute left-1/2 top-28 z-50 -translate-x-1/2',
            isAndroid && 'top-20'
          )}
        >
          <Image
            src={logoImage}
            alt="Birdbuddy logo"
            width={35}
            height={35}
            priority
          />
        </div>
        <Stories
          loop={false}
          storyContainerStyles={{
            backgroundColor: 'transparent'
          }}
          width="100vw"
          defaultInterval={10000}
          height={isAndroid ? '95vh' : '100vh'}
          progressContainerStyles={{
            position: 'fixed',
            top: isAndroid ? '5%' : '8.5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75%'
          }}
          preloadCount={3}
          onStoryStart={trackStoryViewed}
          onAllStoriesEnd={trackAllStoriesViewed}
          stories={stories}
        />
      </div>

      {/* PREVIEW OF GENERATED IMAGES - Only in development */}
      {isDevelopment && (
        <DesktopPreview
          imageUrls={imageUrls}
          isGenerating={isGeneratingRef.current}
        />
      )}

      {/* DESKTOP/IPAD VIEW - Stories */}
      <div className="relative hidden h-screen w-screen items-center justify-center overflow-hidden bg-[#FFF3DC] md:flex">
        {/* LEFT NAVIGATION BUTTON - Previous Slide */}
        <NavigationButton direction="prev" onClick={handlePreviousSlide} />

        <div
          ref={desktopStoriesContainerRef}
          className="relative h-[912px] w-[440px] origin-center overflow-hidden rounded-3xl shadow-white/50 lg:scale-[0.8]"
          style={{ boxShadow: '0 0 60px 0 rgba(16, 15, 15, 0.742)' }}
        >
          {/* FIXED LOGO - APPEARS ABOVE ALL STORIES */}
          <div className={clsx('absolute left-1/2 top-28 z-50 -translate-x-1/2')}>
            <Image
              src={logoImage}
              alt="Birdbuddy logo"
              width={35}
              height={35}
              priority
            />
          </div>
          <Stories
            loop={false}
            storyContainerStyles={{
              backgroundColor: 'transparent'
            }}
            width="100%"
            defaultInterval={10000}
            height="100%"
            progressContainerStyles={{
              position: 'absolute',
              top: '8.5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '75%'
            }}
            preloadCount={3}
            onStoryStart={trackStoryViewed}
            onAllStoriesEnd={trackAllStoriesViewed}
            stories={stories}
          />
        </div>

        {/* RIGHT NAVIGATION BUTTON - Next Slide */}
        <NavigationButton direction="next" onClick={handleNextSlide} />
      </div>

      <PageVisitTracker
        pageEvent={{
          pageName: PageName.YEAR_IN_REVIEW_PAGE
        }}
      />
    </React.Fragment>
  );
};

export default YearInReviewUserPage;
