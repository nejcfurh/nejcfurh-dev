import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

const WhatDoesItMeanSlide = (): React.JSX.Element => {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#F7E9E3] px-4">
      <AnimatedDiv
        initial={{ opacity: 0, x: -120, y: -60, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 }
        }}
        className="absolute left-0 top-0 z-10 w-full object-cover"
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/mean-leaves-left.png"
          alt="leaves left"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        initial={{ opacity: 0, x: 120, y: -40, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.4,
          ease: [0.19, 0.54, 0.38, 0.92],
          opacity: { duration: 0.6 },
          delay: 0.15
        }}
        className="absolute left-0 top-0 z-20 w-full object-cover"
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/mean-leaves-right.png"
          alt="leaves right"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <Image
        src="/images/projects/personal-year-in-review/slides/mean-background.jpg"
        alt="background"
        width={1000}
        height={1000}
        unoptimized
        loading="eager"
        priority
        className="absolute left-0 top-0 w-full object-cover"
      />
      {/* IMAGES */}
      <AnimatedDiv
        initial={{ opacity: 0, x: 40, y: 100, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.3,
          ease: [0.22, 0.61, 0.36, 1],
          opacity: { duration: 0.6 },
          delay: 0.2
        }}
        className="absolute bottom-0 left-0 w-full object-cover"
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/mean-bottom.png"
          alt="bottom-bird"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        initial={{ opacity: 0, x: 100, y: 100, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.3,
          ease: [0.22, 0.61, 0.36, 1],
          opacity: { duration: 0.6 },
          delay: 0.2
        }}
        className="absolute right-10 top-10 mt-24"
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/mean-top.png"
          alt="top-bird"
          width={150}
          height={150}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <div className="z-30 mx-auto flex h-full w-full flex-col items-center justify-center">
        <AnimatedTitle
          initial={{ opacity: 0, x: 250 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center font-inter text-3xl text-[#25212A]"
        >
          What does this
        </AnimatedTitle>
        <AnimatedTitle
          initial={{ opacity: 0, x: -250 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-2 text-center font-awesome-serif text-[5rem] leading-10 text-[#25212A]"
        >
          all mean?
          <Image
            src="/images/projects/personal-year-in-review/slides/mean-middle.png"
            alt="bird on title"
            width={150}
            height={150}
            unoptimized
            loading="eager"
            priority
            className="absolute -left-[4.5rem] -top-32"
          />
        </AnimatedTitle>
      </div>
    </section>
  );
};

export default WhatDoesItMeanSlide;
