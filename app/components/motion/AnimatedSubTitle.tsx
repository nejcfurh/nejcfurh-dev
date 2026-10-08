'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedSubTitle = (props: HTMLMotionProps<'h2'>): JSX.Element => {
  return <motion.h2 {...props} />;
};

export default AnimatedSubTitle;
