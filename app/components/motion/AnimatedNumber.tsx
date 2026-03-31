'use client';

import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';

type SpringOptions = {
  bounce?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  duration?: number;
};

type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
};

const AnimatedNumber = ({
  value,
  className,
  springOptions,
}: AnimatedNumberProps): JSX.Element => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, springOptions);
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => {
      setDisplayValue(v as number);
    });
    return unsubscribe;
  }, [display]);

  return <motion.span className={className}>{displayValue}</motion.span>;
};

export default AnimatedNumber;
