import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';

// CLOUD IMAGES
import cloudsImage from '@/public/images/projects/personal-year-in-review/clouds/clouds-1.png';
import cloudsImage2 from '@/public/images/projects/personal-year-in-review/clouds/clouds-2.png';
import cloudsImage3 from '@/public/images/projects/personal-year-in-review/clouds/clouds-3.png';
import cloudsImage4 from '@/public/images/projects/personal-year-in-review/clouds/clouds-4.png';
import cloudsMoving1 from '@/public/images/projects/personal-year-in-review/clouds/clouds-moving-1.png';
import cloudsMoving2 from '@/public/images/projects/personal-year-in-review/clouds/clouds-moving-2.png';
// IMAGES
import birdFlightImage from '@/public/images/projects/personal-year-in-review/slides/bird-flight-image.png';
import backgroundImage from '@/public/images/projects/personal-year-in-review/slides/year-in-review-1.jpg';

import GuideComponent from './GuideComponent';

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
          src={backgroundImage}
          alt="Hero image"
          className="absolute left-0 top-0 h-full w-full object-cover"
          width={1000}
          height={1000}
          priority
          loading="eager"
          unoptimized
        />
        {/* BIRD IMAGE */}
        <AnimatedDiv
          className="absolute left-8 top-32 z-50 aspect-square w-1/3"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
        >
          <Image
            src={birdFlightImage}
            alt="Bird"
            width={1000}
            height={1000}
            priority
            loading="eager"
            unoptimized
          />
        </AnimatedDiv>

        {/* CLOUD 1 TOP - OPACITY & BLUR */}
        <Image
          src={cloudsImage}
          alt="Clouds"
          className="absolute left-0 top-0 h-full w-full object-cover opacity-70 sm:blur-xl"
          width={1000}
          height={1000}
          priority
          loading="eager"
          unoptimized
        />

        {/* CLOUD 2 TOP - NON OPAQUE */}
        <Image
          src={cloudsImage2}
          alt="Clouds"
          className="absolute left-0 top-0 h-1/2 w-full object-cover"
          width={1000}
          height={1000}
          priority
          loading="eager"
          unoptimized
        />
        {/* CLOUD 3 BOTTOM - OPACITY & BLUR */}
        <Image
          src={cloudsImage3}
          alt="Clouds"
          className="absolute bottom-0 left-0 w-full object-cover"
          width={1000}
          height={1000}
          priority
          loading="eager"
          unoptimized
        />
        {/* CLOUD 4 BOTTOM - NON OPAQUE */}
        <Image
          src={cloudsImage4}
          alt="Clouds"
          className="absolute bottom-0 left-0 w-full object-cover"
          width={1000}
          height={1000}
          priority
          loading="eager"
          unoptimized
        />

        {/* MOVING CLOUD 1 - ANIMATED */}
        <AnimatedDiv
          className="absolute right-0 top-40 z-40"
          animate={{
            x: [-30, 30, -30],
            y: [-15, 15, -15],
          }}
          transition={{
            delay: 1.5,
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={cloudsMoving1}
            alt="Moving clouds"
            className="object-cover"
            width={1000}
            height={1000}
            priority
            loading="eager"
            unoptimized
          />
        </AnimatedDiv>

        {/* MOVING CLOUD 2 - ANIMATED */}
        <AnimatedDiv
          className="absolute bottom-24 left-0"
          animate={{
            x: [20, -40, 20],
            y: [10, -20, 10],
          }}
          transition={{
            delay: 1.5,
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={cloudsMoving2}
            alt="Moving clouds"
            className="object-cover"
            width={1000}
            height={1000}
            priority
            loading="eager"
            unoptimized
          />
        </AnimatedDiv>

        {/* OPACITY BG */}
        <div className="absolute left-0 top-0 hidden h-full w-full bg-linear-to-b from-primary/60 to-amber-50" />

        {/* TITLE & SUBTITLE */}
        <div className="relative z-50 mt-16 flex h-[50%] flex-col items-center justify-center px-5 text-center font-inter">
          <AnimatedTitle
            className="text-center text-3xl text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Your
          </AnimatedTitle>
          <AnimatedTitle
            className="relative overflow-visible text-center font-awesome-serif text-9xl text-primary"
            initial={{ opacity: 0, y: 40, scale: 0.3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <span className="pr-8">2025</span>
            <Image
              src="/images/projects/personal-year-in-review/slides/hero-bird-number.png"
              alt="Bird"
              width={1000}
              height={1000}
              unoptimized
              loading="eager"
              className="absolute -right-3 -top-[6.8rem] w-1/3"
              priority
            />
          </AnimatedTitle>
          <AnimatedDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <AnimatedText className="mx-auto mt-4 w-full px-4 font-awesome-serif text-4xl italic text-primary">
              Year in Birds
            </AnimatedText>
          </AnimatedDiv>
          <AnimatedDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <AnimatedText className="mx-auto mt-2 w-full px-4 font-inter text-3xl font-normal text-primary">
              is Here!
            </AnimatedText>
          </AnimatedDiv>
        </div>
        {/* INTERACTION GUIDE OVERLAY */}
        <GuideComponent />
      </section>
    )
  );
};

export default HeroSlide;
