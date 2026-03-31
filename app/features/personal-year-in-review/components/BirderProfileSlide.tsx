import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import Image from 'next/image';

import type { BirderProfile } from '../types/types';

const BirderProfileSlide = ({
  birderProfile
}: {
  birderProfile: BirderProfile;
}): React.JSX.Element => {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F7E9E3] px-4">
      <div className="mt-24 flex flex-col items-center justify-center gap-4 font-inter">
        <AnimatedText
          className="px-5 text-center font-inter text-xl font-light text-[#25212A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          We analyzed your{' '}
          <span className="font-bold">
            hosting <br />
            habits
          </span>{' '}
          and you are ...
        </AnimatedText>
        <AnimatedDiv
          className="relative flex w-full items-center justify-center"
          initial={{ opacity: 0, x: 250 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image
            src={`/images/projects/personal-year-in-review/cards/${birderProfile}.png`}
            alt={birderProfile}
            width={300}
            height={300}
            className="rounded-3xl object-cover shadow-xl"
            unoptimized
            fetchPriority="high"
            priority
          />
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default BirderProfileSlide;
