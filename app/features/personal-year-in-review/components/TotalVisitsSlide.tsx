'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedSubTitle from '@/app/components/motion/AnimatedSubTitle';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';
import clsx from 'clsx';

import AnimatedNumberBasic from './BasicAnimatedNumber';

const TotalVisitsSlide = ({
  totalVisits,
  totalVisitsPercentile,
}: {
  totalVisits: number;
  totalVisitsPercentile: number;
}): React.ReactNode => {
  const cappedPercentile = Math.min(99, Math.max(1, totalVisitsPercentile));

  const displayPercentile = 100 - cappedPercentile;

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#DC7E7E]">
      <AnimatedDiv
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={clsx(
          'absolute left-0 h-fit w-full -bottom-20 sm:-bottom-10',
        )}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/feeder-slide-image.png"
          alt="Total Visits Slide Background"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <div className="container mx-auto flex h-[85%] max-w-5xl flex-col items-center justify-between">
        <AnimatedDiv
          className="z-50 mt-20 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedSubTitle
            className="font-inter text-2xl text-[#542626] sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Birdbuddy was <br />{' '}
            <span className="font-bold">the place to be,</span> with
          </AnimatedSubTitle>
          <AnimatedTitle
            className="my-2 px-4 font-awesome-serif text-8xl font-thin text-[#2A1313]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedNumberBasic passedValue={totalVisits} />
            {/* {totalVisits} */}
          </AnimatedTitle>
          <AnimatedText
            className="mt-3 px-4 font-inter text-2xl text-[#542626]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            total visits!
          </AnimatedText>
        </AnimatedDiv>
        <AnimatedDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="z-50 mx-4 mb-[-10px] flex flex-col items-center justify-center rounded-2xl bg-[#D35E5E] px-6 py-4 text-white shadow-lg"
        >
          {cappedPercentile >= 36 ? (
            <AnimatedText className="text-center font-inter text-lg font-light text-white">
              That puts you in the{' '}
              <span className="font-bold">Top {displayPercentile}%</span> <br />
              of all feeders globally.
            </AnimatedText>
          ) : (
            <AnimatedText className="text-center font-inter text-lg font-light text-white">
              A quieter year, but still
              <br />
              <span className="font-bold">meaningful</span> for your local
              birds.
            </AnimatedText>
          )}
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default TotalVisitsSlide;
