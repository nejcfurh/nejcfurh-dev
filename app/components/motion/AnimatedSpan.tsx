'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedSpan = (props: HTMLMotionProps<'span'>): JSX.Element => {
  return <motion.span {...props} />;
};

export default AnimatedSpan;
