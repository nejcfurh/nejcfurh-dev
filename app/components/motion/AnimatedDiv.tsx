'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedDiv = (props: HTMLMotionProps<'div'>): JSX.Element => {
  return <motion.div {...props} />;
};

export default AnimatedDiv;
