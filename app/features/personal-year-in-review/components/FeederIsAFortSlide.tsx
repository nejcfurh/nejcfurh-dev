import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import Image from 'next/image';

const FeederIsAFortSlide = (): React.JSX.Element => {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden bg-[#C8B9DA] px-5 font-inter">
      <AnimatedDiv
        className="absolute left-0 top-0 w-full object-cover"
        initial={{ opacity: 0, x: 30, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: 'easeOut'
        }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/fort-leaves-left.png"
          alt="Fort Background"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        className="absolute right-0 top-0 z-10 w-full object-cover"
        initial={{ opacity: 0, x: -30, y: -30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.1
        }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/fort-leaves-right.png"
          alt="Fort Background"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>

      <AnimatedDiv
        className="absolute -bottom-20 left-0 w-full object-cover"
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 12,
          bounce: 0.8,
          mass: 1.5
        }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/fort-racoon.png"
          alt="Fort Bird"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <AnimatedDiv
        className="absolute top-10 w-full object-cover"
        initial={{ opacity: 0, y: -200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Image
          src="/images/projects/personal-year-in-review/slides/fort-feeder.png"
          alt="Fort Percentage"
          width={1000}
          height={1000}
          unoptimized
          loading="eager"
          priority
        />
      </AnimatedDiv>
      <div className="z-50 mt-24 w-full items-center gap-4 text-center">
        <AnimatedText
          className="pb-2 text-center font-awesome-serif text-[2.5rem] text-[#25212A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your feeder is a <span className="font-bold">Fort</span>
        </AnimatedText>
        <AnimatedText
          className="px-4 text-center font-inter text-xl font-light text-[#4A4354]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Not a single <span className="italic">uninvited guest</span> such as
          squirrel or raccoon breached the perimeter! That&apos;s less than{' '}
          <span className="font-bold">10%</span> of feeders worldwide!
        </AnimatedText>
      </div>
    </section>
  );
};

export default FeederIsAFortSlide;
