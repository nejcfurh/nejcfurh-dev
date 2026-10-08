'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedTitle = (props: HTMLMotionProps<'h1'>): JSX.Element => {
  return <motion.h1 {...props} />;
};

export default AnimatedTitle;
