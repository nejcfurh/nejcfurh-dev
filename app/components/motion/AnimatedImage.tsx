'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedImage = (props: HTMLMotionProps<'img'>): JSX.Element => {
  return <motion.img {...props} />;
};

export default AnimatedImage;
