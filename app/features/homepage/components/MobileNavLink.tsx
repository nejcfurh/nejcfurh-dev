'use client';

import { JSX } from 'react';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';

const EASE = [0.76, 0, 0.24, 1] as const;

const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: EASE, delay: 0.05 * i },
  }),
};

interface MobileNavLinkProps {
  data: {
    title: string;
    id: string;
    index: number;
  };
  onNavigate: () => void;
}

const MobileNavLink = ({ data, onNavigate }: MobileNavLinkProps): JSX.Element => {
  const { title, id, index } = data;

  return (
    <AnimatedDiv
      className="relative flex shrink-0 items-center leading-none"
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <a
        href={`#${id}`}
        onClick={onNavigate}
        className="font-light text-white-100 no-underline"
      >
        {title}
      </a>
    </AnimatedDiv>
  );
};

export default MobileNavLink;
