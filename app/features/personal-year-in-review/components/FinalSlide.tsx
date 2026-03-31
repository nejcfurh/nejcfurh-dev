import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

const FinalSlide = (): React.JSX.Element => {
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

      {/* BIRD FLYING */}
      <AnimatedDiv
        className="absolute left-0 top-28 z-50 w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/final-bird.png"
          alt="Final bird flying"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <div className="relative z-50 flex h-[50%] mt-10 flex-col items-center justify-end gap-5 px-5 text-center font-inter">
        <AnimatedTitle
          className="relative text-center font-awesome-serif text-6xl text-primary sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Share <br />
          your impact
          <Image
            src="/images/projects/personal-year-in-review/slides/final-hummingbird.png"
            alt="Final title"
            width={1000}
            height={1000}
            unoptimized
            loading="eager"
            priority
            className="absolute -right-10 -top-1/2 w-1/2"
          />
        </AnimatedTitle>
        <AnimatedDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.2 }}
        >
          <AnimatedText className="mx-auto mt-2 w-full px-4 font-inter text-2xl font-light text-primary">
            Show your{' '}
            <span className="pr-2 font-awesome-serif font-bold italic">
              Year in Birds
            </span>{' '}
            to your friends and family and inspire more people to care for local
            birds.
          </AnimatedText>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default FinalSlide;
