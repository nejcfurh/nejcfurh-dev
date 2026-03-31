import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

import type { YearInReviewSpeciesStats } from '../types/types';

type TopSpeciesVisitedProps = YearInReviewSpeciesStats['distinctSpecies'];

const TopVisitedSpeciesSlide = ({
  topSpeciesVisited
}: {
  topSpeciesVisited: TopSpeciesVisitedProps;
}): React.JSX.Element => {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#E0A78F] pt-10 font-inter">
      {topSpeciesVisited.map((species: TopSpeciesVisitedProps[number], index: number) => (
        <div
          key={species.species.name}
          className="z-10 mx-auto my-5 grid w-[80%] grid-cols-2 items-center justify-center gap-8"
        >
          <AnimatedDiv
            className="flex flex-row items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.4 }}
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-50/40">
              <Image
                src={species.species.iconUrl}
                alt={species.species.name}
                width={300}
                height={300}
                unoptimized
                loading="eager"
                priority
              />
            </div>
          </AnimatedDiv>
          <AnimatedDiv
            className="relative flex flex-col items-start justify-center pt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.4 }}
          >
            <AnimatedTitle className="z-10 max-w-[5rem] text-2xl leading-7 text-[#1E2412]">
              {species.species.name}
            </AnimatedTitle>
            <AnimatedText className="z-10 mt-1 text-base text-[#3B4523]">
              {species.visitCount} visits
            </AnimatedText>
            <AnimatedTitle className="absolute right-4 z-0 mb-9 w-full text-center font-awesome-serif text-9xl text-[#F7E9E3] opacity-70">
              {index + 1}
            </AnimatedTitle>
          </AnimatedDiv>
        </div>
      ))}
    </section>
  );
};

export default TopVisitedSpeciesSlide;
