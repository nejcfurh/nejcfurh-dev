import type { Variants } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Card contents inherit the card's hidden/visible state and enter one after another.
// A bounce-free spring for the movement, a slightly longer fade and a short blur keep
// overlapping items flowing instead of stepping in.
const ITEM_MOVE = { type: 'spring', bounce: 0, visualDuration: 0.9 } as const;
const ITEM_FADE = { duration: 1, ease: 'easeOut' } as const;

export const contentItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { y: ITEM_MOVE, opacity: ITEM_FADE, filter: { duration: 0.7, ease: 'easeOut' } },
    // Any filter, even blur(0px), cuts a descendant's backdrop blur off from what is
    // behind it.
    transitionEnd: { filter: 'none' },
  },
};

// For short runs inside a card, such as tags or bullet points.
export const staggerList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { y: ITEM_MOVE, opacity: ITEM_FADE } },
};

export const cardVariants = ({
  delay,
  from,
  duration,
}: {
  delay: number;
  from: { x?: number; y?: number; scale?: number };
  duration: number;
}): Variants => ({
  hidden: { opacity: 0, ...from },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
      delayChildren: delay + 0.15,
      staggerChildren: 0.07,
    },
  },
});
