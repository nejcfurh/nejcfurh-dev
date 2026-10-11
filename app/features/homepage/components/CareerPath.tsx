'use client';

import { motion, useReducedMotion } from 'motion/react';
import { JSX } from 'react';

const CAREER_STEPS = [
  { year: '2019', role: 'Diplomat' },
  { year: '2022', role: 'IT Support' },
  { year: '2024', role: 'CE Lead' },
  { year: '2024 – now', role: 'Engineer', current: true },
];

// The line runs past the last step and fades out, since that role is still ongoing.
const TRACK_FADE = 'linear-gradient(90deg, #000 78%, transparent)';
const FILL_DELAY = 0.3;
const FILL_DURATION = 1.8;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const CareerPath = (): JSX.Element => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mt-auto pt-2">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-3 h-[3px] rounded-full bg-(--chip-bg-hover)"
        style={{ maskImage: TRACK_FADE, WebkitMaskImage: TRACK_FADE }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-3 h-[3px] origin-left rounded-full bg-linear-to-r from-accent/50 via-accent via-55% to-accent-light"
        style={{ maskImage: TRACK_FADE, WebkitMaskImage: TRACK_FADE }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px 0px' }}
        transition={{ duration: FILL_DURATION, delay: FILL_DELAY, ease: 'linear' }}
      />
      {!reduceMotion && (
        <div aria-hidden="true" className="absolute inset-x-0 top-[13.5px] h-0">
          <motion.div
            className="absolute top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cfe0f5] shadow-[0_0_10px_3px_rgba(207,224,245,0.7),0_0_26px_10px_rgba(138,174,214,0.45)]"
            initial={{ left: '0%', opacity: 0 }}
            whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{
              duration: FILL_DURATION,
              delay: FILL_DELAY,
              ease: 'linear',
              opacity: { duration: FILL_DURATION + 0.4, delay: FILL_DELAY, times: [0, 0.08, 0.85, 1] },
            }}
          />
        </div>
      )}

      <ol aria-label="Career path" className="relative flex gap-2 sm:gap-4">
        {CAREER_STEPS.map((step, index) => {
          // The steps sit roughly at equal fractions of the track, so each node
          // lights at the moment the linear fill reaches it.
          const reachedAt = FILL_DELAY + (index / CAREER_STEPS.length) * FILL_DURATION;

          return (
            <li key={step.role} className="relative min-w-max flex-1 basis-0 pt-[22px]">
              <span className="absolute left-0 top-0 block size-[11px] rounded-full border-2 border-(--chip-bg-hover) bg-primary">
                {step.current && (
                  <span className="absolute -inset-[2px] animate-ping rounded-full bg-accent/40" />
                )}
                <motion.span
                  className={`absolute -inset-[2px] rounded-full ${step.current ? 'border-2 border-[#cfe0f5] bg-accent-light' : 'bg-accent'}`}
                  // Not scale 0: a zero-size element never reports entering the viewport.
                  initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: [0.4, 1.5, 1], opacity: 1 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.5, delay: reachedAt, ease: EASE_OUT }}
                />
              </span>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px 0px' }}
                transition={{ duration: 0.5, delay: reachedAt, ease: EASE_OUT }}
              >
                <p
                  className={`whitespace-nowrap font-mono text-[11px] tracking-wider ${step.current ? 'text-accent-light' : 'text-secondary'}`}
                >
                  {step.year}
                </p>
                <p
                  className={`mt-0.5 whitespace-nowrap text-[12px] sm:text-[13px] ${step.current ? 'font-semibold text-white-100' : 'font-medium text-white-100/70'}`}
                >
                  {step.role}
                </p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default CareerPath;
