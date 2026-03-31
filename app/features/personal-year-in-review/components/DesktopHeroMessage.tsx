'use client';

import Image from 'next/image';
import type React from 'react';

import cloudsImage from '@/public/images/projects/personal-year-in-review/clouds/clouds-1.png';
import cloudsImage4 from '@/public/images/projects/personal-year-in-review/clouds/clouds-4.png';
import backgroundImage from '@/public/images/projects/personal-year-in-review/slides/year-in-review-1.jpg';
import logoImage from '@/public/images/projects/personal-year-in-review/slides/year-in-review-logo.svg';

const DesktopHeroMessage = (): React.ReactNode => {
  return (
    <section className="relative hidden min-h-screen w-full flex-col items-center justify-center overflow-hidden 2xl:flex">
      {/* BG IMAGE */}
      <Image
        src={backgroundImage}
        alt="Hero background"
        className="absolute left-0 top-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        priority
      />

      {/* CLOUD LAYERS */}
      <Image
        src={cloudsImage}
        alt="Clouds"
        className="absolute left-0 top-0 h-full w-full object-cover opacity-70 blur-xl"
        width={1000}
        height={1000}
        priority
      />
      <Image
        src={cloudsImage4}
        alt="Clouds"
        className="absolute bottom-0 left-0 w-full object-cover"
        width={1000}
        height={1000}
        priority
      />
      {/* CONTENT */}
      <div className="relative z-50 flex flex-col items-center justify-center px-5 text-center">
        <Image
          src={logoImage}
          alt="Bird Buddy logo"
          width={60}
          height={60}
          className="mb-20"
          priority
        />

        <h1 className="mb-2 text-center text-4xl text-primary">Your</h1>
        <h2 className="relative mb-4 overflow-visible text-center font-awesome-serif text-9xl text-primary">
          <span className="pr-6">2025</span>
          <Image
            src="/images/projects/personal-year-in-review/slides/hero-bird-number.png"
            alt="Bird"
            width={120}
            height={120}
            unoptimized
            className="absolute -right-5 -top-32 w-28"
            priority
          />
        </h2>
        <p className="font-awesome-serif text-6xl italic text-primary">
          Year in Birds
        </p>

        <div className="mt-32 rounded-2xl bg-white/60 px-8 py-6 shadow-lg backdrop-blur-sm">
          <p className="text-lg font-medium text-primary">
            This experience is only available <br />{' '}
            <span className="font-bold">on a mobile device.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DesktopHeroMessage;
