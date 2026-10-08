'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedSubHeading = (props: HTMLMotionProps<'h3'>): JSX.Element => {
  return <motion.h3 {...props} />;
};

export default AnimatedSubHeading;
