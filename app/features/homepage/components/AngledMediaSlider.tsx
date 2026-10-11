'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { droneShotVideos } from '../constants';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

const AUTO_CYCLE_MS = 4500;

const computeClip = (
  idx: number,
  hovered: number | null,
  pps: number,
  split: number,
  count: number,
): string | undefined => {
  const j = idx + 1;
  const i = hovered !== null ? hovered + 1 : null;

  if (i === null) {
    if (j === 1) return undefined;
    return `polygon(calc(${j - 1} * ${pps}% - ${split}px) 100%, calc(${j - 1} * ${pps}% + ${split}px) 0, 100% 0, 100% 100%)`;
  }

  if (j <= i) {
    if (j === 1) return undefined;
    const base = (j - 1) * 2;
    return `polygon(${base * split}px 100%, ${(base + 2) * split}px 0, 100% 0, 100% 100%)`;
  } else {
    const base = (count - j) * 2;
    return `polygon(calc(100% - ${(base + 4) * split}px) 100%, calc(100% - ${(base + 2) * split}px) 0, 100% 0, 100% 100%)`;
  }
};

// iOS Safari occasionally ignores the `loop` attribute on autoplaying
// muted videos and pauses on the last frame; force a restart as a fallback.
const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  const video = e.currentTarget;
  video.currentTime = 0;
  video.play().catch(() => {});
};

interface DroneVideoProps {
  src: string;
  poster: string;
  className: string;
}

// No autoPlay and preload="none": a clip downloads only once it nears the
// viewport, instead of every clip loading with the page.
const DroneVideo = ({ src, poster, className }: DroneVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: '200px 0px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else if (!video.paused) {
      // pause() on a never-loaded element starts the resource fetch, so only
      // pause one that is actually playing.
      video.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onEnded={handleEnded}
      src={src}
    />
  );
};

const AngledMediaSlider = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sliderRef, { margin: '-80px 0px' });
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const split = 50;
  const count = droneShotVideos.length;
  const pps = 100 / count;

  // Cycles through the clips while nobody is hovering; a hover takes over and pauses it.
  const isAutoCycling = !isMobile && isInView && hovered === null && !reduceMotion;
  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = setInterval(
      () => setAutoIndex(index => (index + 1) % count),
      AUTO_CYCLE_MS,
    );
    return () => clearInterval(timer);
  }, [isAutoCycling, count]);

  const active = hovered ?? (reduceMotion ? null : autoIndex);

  if (isMobile) {
    return (
      <ul className="m-0 flex flex-col gap-3 list-none p-0">
        {droneShotVideos.map(item => (
          <li key={item.video} className="relative rounded-xl overflow-hidden">
            <DroneVideo
              className="w-full aspect-video object-cover"
              src={item.video}
              poster={item.poster}
            />
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 backdrop-blur-md">
              <MapPin size={12} className="text-[#cfe0f5]" />
              <span className="text-xs font-medium text-white">{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={sliderRef} className="relative rounded-3xl overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl border border-(--slider-border)"
        style={{ boxShadow: 'inset 0 0 80px 30px var(--slider-vignette)' }}
      />
      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div
            key={active}
            className="pointer-events-none absolute bottom-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 backdrop-blur-md"
            // The active slice's bottom-left corner, from the same geometry computeClip uses.
            style={{ left: `calc(${active * 2 * split}px + 24px)` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <MapPin size={14} className="text-[#cfe0f5]" />
            <span className="text-sm font-medium text-white">
              {droneShotVideos[active].title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <ul className="angled-slider relative m-0 grid list-none p-0">
        {droneShotVideos.map((item, idx) => {
          return (
            <li
              key={item.video}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                clipPath: computeClip(idx, active, pps, split, count),
                filter: active !== null && idx !== active ? 'brightness(0.5)' : 'none',
              }}
              className="relative outline-none"
            >
              <div className="absolute inset-0">
                <DroneVideo
                  className="h-full w-full object-cover"
                  src={item.video}
                  poster={item.poster}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AngledMediaSlider;
