'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedText = (props: HTMLMotionProps<'p'>): JSX.Element => {
  return <motion.p {...props} />;
};

export default AnimatedText;
