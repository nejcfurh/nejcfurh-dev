'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { JSX } from 'react';

const AnimatedImage = (props: HTMLMotionProps<'img'>): JSX.Element => {
  return <motion.img {...props} />;
};

export default AnimatedImage;
