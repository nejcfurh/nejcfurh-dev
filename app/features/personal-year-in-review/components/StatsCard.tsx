'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import { useEffect, useState } from 'react';

import { Card } from './ui/card';

interface StatsCardProps {
  value: number;
  label: string;
  icon?: string;
  delay?: number;
  name?: string;
  className?: string;
}

const StatsCard = ({
  value,
  label,
  icon,
  name = '',
  delay = 0,
  className = ''
}: StatsCardProps): React.ReactNode => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // COUNTER ANIMATION WHEN CARD BECOMES VISIBLE
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  // ANIMATION DELAY AFTER TITLE
  const animationDelay = 0.5 + delay / 700;

  return (
    <AnimatedDiv
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: animationDelay,
        ease: [0.4, 0, 0.2, 1]
      }}
      onViewportEnter={(): void => {
        // COUNTER ANIMATION DELAY WHEN ENTERING VIEWPORT
        setTimeout(() => setHasAnimated(true), animationDelay * 200);
      }}
    >
      <Card className="group relative overflow-visible border-2 border-primary/10 bg-white p-4 text-center shadow-xl sm:p-8">
        <div className="absolute inset-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-amber-100/20" />
        {/* CONTENT */}
        <div className="relative z-10">
          {/* ICON */}
          {icon && (
            <div className="mb-4 inline-flex h-6 w-6 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-amber-200/30 text-3xl transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16">
              {icon}
            </div>
          )}
          {/* VALUE WITH GRADIENT TEXT EFFECT */}
          <div className="mb-3 bg-gradient-to-br from-primary to-primary/70 bg-clip-text py-2 text-sm font-extrabold leading-tight text-transparent sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
            {count.toLocaleString()}{' '}
            {name && (
              <span className="text-xs font-normal text-primary/70 sm:text-sm">
                visits
              </span>
            )}
          </div>
          {/* LABEL */}
          <div className="mb-2 text-xs font-semibold text-primary sm:text-xl md:text-2xl">
            {label}
          </div>
        </div>
      </Card>
    </AnimatedDiv>
  );
};

export default StatsCard;
