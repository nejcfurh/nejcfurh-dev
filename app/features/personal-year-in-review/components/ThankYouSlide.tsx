import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeroSlide = (): React.ReactNode => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden sm:h-full">
        {/* BG IMAGE */}
        <Image
          src="/images/projects/personal-year-in-review/slides/thank-you-background.jpg"
          alt="Thank you background"
          fill
          className="object-cover"
          unoptimized
          loading="eager"
          priority
        />
        {/* BOTTOM GRASS AND BRANCHES */}
        <AnimatedDiv
          className="absolute bottom-0 left-0 z-30 w-full object-cover"
          initial={{ opacity: 0, y: 120, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.3,
            ease: [0.22, 0.61, 0.36, 1],
            opacity: { duration: 0.6 },
            delay: 0.2,
          }}
        >
          <Image
            src="/images/projects/personal-year-in-review/slides/thank-you-bottom-grass.png"
            alt="Thank you bottom grass"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
          />
        </AnimatedDiv>
        <AnimatedDiv
          className="absolute bottom-0 left-0 z-30 w-full object-cover"
          initial={{ opacity: 0, x: 150, y: 80, scale: 0.85 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            ease: [0.19, 0.54, 0.38, 0.92],
            opacity: { duration: 0.6 },
            delay: 0.3,
          }}
        >
          <Image
            src="/images/projects/personal-year-in-review/slides/thank-you-bottom-branch.png"
            alt="Thank you bottom branch"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
            className="scale-110"
          />
        </AnimatedDiv>

        {/* CLOUDS */}
        <AnimatedDiv
          className="absolute bottom-0 left-0 z-10 w-full object-cover"
          initial={{ opacity: 0.5, y: 500 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <Image
            src="/images/projects/personal-year-in-review/clouds/thank-you-clouds-1.png"
            alt="Thank you cloud"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
          />
        </AnimatedDiv>
        <AnimatedDiv
          className="absolute bottom-0 left-0 z-10 w-full object-cover"
          initial={{ opacity: 0.5, y: 400 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        >
          <Image
            src="/images/projects/personal-year-in-review/clouds/thank-you-clouds-2.png"
            alt="Thank you cloud"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
          />
        </AnimatedDiv>
        <AnimatedDiv
          className="absolute bottom-0 left-0 z-10 w-full object-cover"
          initial={{ opacity: 0.5, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <Image
            src="/images/projects/personal-year-in-review/clouds/thank-you-clouds-3.png"
            alt="Thank you cloud"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
          />
        </AnimatedDiv>
        {/* BIRD FLYING */}
        <AnimatedDiv
          className="absolute bottom-44 left-24 z-50 w-1/2 object-cover"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Image
            src="/images/projects/personal-year-in-review/slides/thank-you-bottom.png"
            alt="Thank you bird flying"
            width={500}
            height={500}
            unoptimized
            loading="eager"
            priority
          />
        </AnimatedDiv>
        {/* TITLE & SUBTITLE */}
        <div className="relative z-50 mb-10 flex h-[50%] flex-col items-center justify-center px-5 text-center font-inter">
          <AnimatedTitle
            className="relative text-center font-awesome-serif text-7xl text-primary"
            initial={{ opacity: 0, x: 220 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Thank you!
            <Image
              src="/images/projects/personal-year-in-review/slides/thank-you-title.png"
              alt="Thank you title bird"
              width={1000}
              height={1000}
              unoptimized
              loading="eager"
              priority
              className="absolute -left-24 -top-56"
            />
          </AnimatedTitle>
          <AnimatedDiv
            initial={{ opacity: 0, x: -220 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <AnimatedText className="mx-auto mt-2 w-full px-4 font-inter text-2xl font-light text-primary">
              Your feeder became a tiny safe haven this year.
            </AnimatedText>
          </AnimatedDiv>
        </div>
      </section>
    )
  );
};

export default HeroSlide;
