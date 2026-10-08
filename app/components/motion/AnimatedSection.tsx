'use client';

import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

const AnimatedSection = (props: HTMLMotionProps<'section'>): JSX.Element => {
  return <motion.section {...props} />;
};

export default AnimatedSection;
