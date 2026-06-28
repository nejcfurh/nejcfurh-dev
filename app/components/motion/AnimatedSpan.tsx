'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { JSX } from 'react';

const AnimatedSpan = (props: HTMLMotionProps<'span'>): JSX.Element => {
  return <motion.span {...props} />;
};

export default AnimatedSpan;
