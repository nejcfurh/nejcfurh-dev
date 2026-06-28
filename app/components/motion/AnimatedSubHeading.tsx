'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { JSX } from 'react';

const AnimatedSubHeading = (props: HTMLMotionProps<'h3'>): JSX.Element => {
  return <motion.h3 {...props} />;
};

export default AnimatedSubHeading;
