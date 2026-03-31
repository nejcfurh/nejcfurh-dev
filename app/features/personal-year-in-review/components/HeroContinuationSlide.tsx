import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedSubTitle from '@/app/components/motion/AnimatedSubTitle';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

const HeroContinuationSlide = (): React.JSX.Element => {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#AFD8E5] px-4">
      {/* BG IMAGE */}
      <Image
        src="/images/projects/personal-year-in-review/slides/final-background.jpg"
        alt="Final background"
        width={1000}
        height={1000}
        unoptimized
        className="absolute inset-0 object-cover"
        loading="eager"
        priority
      />
      {/* CLOUDS */}
      <AnimatedDiv
        className="absolute bottom-0 left-0 z-20 w-full object-cover"
        initial={{ opacity: 0.5, y: -600 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/projects/personal-year-in-review/clouds/thank-you-clouds-1.png"
          alt="Thank you clouds 1"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        className="absolute bottom-0 left-0 z-20 w-full object-cover"
        initial={{ opacity: 0.5, y: -600 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/projects/personal-year-in-review/clouds/final-clouds-1.png"
          alt="Final clouds 1"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        className="absolute bottom-0 left-0 z-20 w-full object-cover"
        initial={{ opacity: 0.5, y: 250 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/projects/personal-year-in-review/clouds/final-clouds-2.png"
          alt="Final clouds 2"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        className="absolute bottom-0 left-0 z-20 w-full object-cover"
        initial={{ opacity: 0, y: -350 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <Image
          src="/images/projects/personal-year-in-review/clouds/final-clouds-3.png"
          alt="Final clouds 3"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <div className="z-50 mt-20 flex flex-col items-center justify-center gap-10">
        <AnimatedTitle
          className="text-center font-awesome-serif text-4xl leading-tight text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          A whole year of small moments,{' '}
          <span className="font-awesome-serif italic">big impact.</span>
        </AnimatedTitle>
        <AnimatedSubTitle
          className="text-center font-inter text-2xl font-light text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Let’s look at how your feeder helped nature thrive.
        </AnimatedSubTitle>
      </div>
      <AnimatedDiv
        className="absolute bottom-0 left-0 z-20 w-full object-cover"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/hero-bird-bottom.png"
          alt="Thank you bottom"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
    </section>
  );
};

export default HeroContinuationSlide;
