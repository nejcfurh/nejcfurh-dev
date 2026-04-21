'use client';

import { useEffect, useState } from 'react';
import { droneShotVideos } from '../constants';

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

const AngledMediaSlider = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const split = 50;
  const count = droneShotVideos.length;
  const pps = 100 / count;

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  if (isMobile) {
    return (
      <ul className="m-0 flex flex-col gap-3 list-none p-0">
        {droneShotVideos.map(item => (
          <li key={item.video} className="rounded-xl overflow-hidden">
            <video
              className="w-full aspect-video object-cover"
              muted
              autoPlay
              loop
              playsInline
              src={item.video}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl border border-(--slider-border)"
        style={{ boxShadow: 'inset 0 0 80px 30px var(--slider-vignette)' }}
      />
      <ul className="angled-slider relative m-0 grid list-none p-0">
        {droneShotVideos.map((item, idx) => {
          return (
            <li
              key={item.video}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{ clipPath: computeClip(idx, hovered, pps, split, count) }}
              className="relative outline-none"
            >
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  src={item.video}
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
