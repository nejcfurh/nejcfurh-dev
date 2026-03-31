'use client';

import BackgroundVideo from '@/app/components/motion/BackgroundVideo';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';

// import Image from 'next/image';
import AnimatedNumberBasic from './BasicAnimatedNumber';

const SeedConsumptionSlide = ({
  totalVisits,
  totalVisitsPercentile,
}: {
  totalVisits: number;
  totalVisitsPercentile: number;
}): React.ReactNode => {
  const cappedPercentile = Math.min(99, Math.max(1, totalVisitsPercentile));

  const seedConsumptionGrams = totalVisits * 2.5;
  const seedConsumptionPounds = seedConsumptionGrams / 453.592; // 1 pound = 453.592 grams

  // Since seed consumption is directly calculated from visits, the percentile is the same
  const seedConsumptionPercentile = cappedPercentile;
  const bananasWeightRounded = Math.round(seedConsumptionGrams / 170);

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#FBCF8D] px-4 py-16 text-[#322716]">
      <AnimatedDiv
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <BackgroundVideo
          isMuted
          isLooping={false}
          mobileVideoPath="/videos/year-in-review/seeds.mp4"
          mobileWebmPath="/videos/year-in-review/seeds.webm"
          desktopVideoPath="/videos/year-in-review/seeds.mp4"
          desktopWebmPath="/videos/year-in-review/seeds.webm"
          className="z-0 h-full w-full object-cover"
        />
      </AnimatedDiv>

      <div className="container z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-start">
        <div className="mt-28 flex flex-col items-center justify-center gap-8">
          <AnimatedDiv
            className="flex flex-col px-4 text-center font-inter text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            You served an estimated
            <AnimatedDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="my-6 flex items-center justify-center font-awesome-serif text-7xl"
            >
              {/* {seedConsumptionPoundsRounded} lbs */}
              <div className="mt-6 flex w-fit items-baseline justify-center gap-4 sm:w-[350px]">
                <span className="inline-block min-w-[18vw] tabular-nums sm:min-w-[100px]">
                  <AnimatedNumberBasic passedValue={seedConsumptionPounds} />
                </span>
                <span>lbs</span>
                <span className="font-inter text-2xl">of seeds...</span>
              </div>
            </AnimatedDiv>
            <AnimatedText
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-4"
            >
              ...which is the same weight as{' '}
              <span className="font-bold">{bananasWeightRounded} bananas!</span>
            </AnimatedText>
          </AnimatedDiv>
          <AnimatedText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 4 }}
            className="mt-5 px-4 text-center font-inter text-lg font-light"
          >
            You are a true provider—that&apos;s{' '}
            <span className="font-bold">
              {' '}
              more than {seedConsumptionPercentile}%
            </span>{' '}
            of feeders on our global network.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};

export default SeedConsumptionSlide;
