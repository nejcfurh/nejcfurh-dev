import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedSubTitle from '@/app/components/motion/AnimatedSubTitle';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

import AnimatedNumberBasic from './BasicAnimatedNumber';

const GlobalStatsSlide = (): React.JSX.Element => {
  const totalFeeders = 638084;
  const totalBirdObservations = 250273955;

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#A3C8D8] px-4">
      <Image
        src="/images/projects/personal-year-in-review/slides/global-stats.png"
        alt="Global Stats Slide Background"
        className="absolute bottom-0 left-0 object-cover"
        width={1000}
        height={1000}
        unoptimized
        loading="eager"
        priority
      />
      <div className="container mx-auto flex h-[85%] flex-col items-center">
        <AnimatedDiv
          className="mt-28 text-center sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedSubTitle
            className="font-inter text-2xl text-[#285168] sm:mb-4 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your feeder is one of
          </AnimatedSubTitle>
          <AnimatedTitle
            className="my-2 w-full px-4 text-center font-awesome-serif text-6xl font-thin text-[#193441]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedNumberBasic passedValue={totalFeeders} />
            {/* {totalVisits} */}
          </AnimatedTitle>
          <AnimatedText
            className="mt-3 px-4 font-inter text-2xl text-[#285168]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            smart feeders in our network.
          </AnimatedText>
          <AnimatedText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 px-5 text-center font-inter text-lg font-light text-[#285168]"
          >
            Together, you contributed{' '}
            <AnimatedNumberBasic
              className="font-inter font-bold"
              passedValue={totalBirdObservations}
            />{' '}
            <br />
            bird observations to science this year.
          </AnimatedText>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default GlobalStatsSlide;
