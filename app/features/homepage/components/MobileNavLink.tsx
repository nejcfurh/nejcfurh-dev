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

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

interface MobileNavLinkProps {
  data: {
    title: string;
    id: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (id: string) => void;
  onNavigate: () => void;
}

const MobileNavLink = ({
  data,
  isActive,
  setSelectedIndicator,
  onNavigate,
}: MobileNavLinkProps): JSX.Element => {
  const { title, id, index } = data;

  return (
    <AnimatedDiv
      className="relative flex shrink-0 items-center leading-none"
      onMouseEnter={() => setSelectedIndicator(id)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <AnimatedDiv
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="absolute -left-[1.5em] size-[0.2em] min-h-2 min-w-2 rounded-full bg-(--accent)"
      />
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
