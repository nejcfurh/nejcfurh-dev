'use client';

import { useEffect } from 'react';

// The glow box: a 400px .gradient-orb grown by its ::before's inset: -50%.
const GLOW_BOX_CSS_PX = 800;
// Drawn at device resolution so each dither step is one physical pixel; past 2x the
// mask gets large for little visible gain.
const MAX_PIXEL_RATIO = 2;
// The old filter: blur(120px) at opacity 0.15 peaked at this alpha.
const PEAK_ALPHA = 0.1125;
// One alpha level moves the output by under one colour level (about 0.75 for the
// accent's blue, 0.5 for its green), so the dither spans two alpha levels.
const DITHER_LEVELS = 2;
// That blur's falloff, sampled every 5% of the glow radius.
const FALLOFF = [
  1, 0.988, 0.951, 0.891, 0.813, 0.72, 0.617, 0.512, 0.41, 0.316, 0.234, 0.167, 0.113,
  0.073, 0.046, 0.028, 0.016, 0.008, 0.004, 0.002, 0,
];

let hasStarted = false;

const falloffAt = (radius: number): number => {
  if (radius >= 1) return 0;
  const position = radius * (FALLOFF.length - 1);
  const index = Math.floor(position);
  const fraction = position - index;
  return FALLOFF[index] + (FALLOFF[index + 1] - FALLOFF[index]) * fraction;
};

// Interleaved gradient noise: an ordered, evenly spread threshold in [0, 1), which
// reads as flat colour at one physical pixel where random noise reads as grain.
const ditherThreshold = (x: number, y: number): number => {
  const value = 52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1);
  return value % 1;
};

// A glow this faint spans only ~20 output colour levels, so a CSS gradient or blur
// draws each one as a visible ring. Dithering the mask's alpha breaks those steps up.
// The opacity is baked in because applying it afterwards would re-quantise the result.
const drawGlowMask = (): HTMLCanvasElement | null => {
  const size = Math.round(GLOW_BOX_CSS_PX * Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const image = context.createImageData(size, size);
  const center = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const radius = Math.hypot(x + 0.5 - center, y + 0.5 - center) / center;
      const alpha = PEAK_ALPHA * falloffAt(radius) * 255;
      // Capped near the edge so a negative value is never clamped, which would
      // brighten the rim.
      const spread = Math.min(DITHER_LEVELS, 2 * alpha);
      image.data[(y * size + x) * 4 + 3] = Math.round(alpha + (ditherThreshold(x, y) - 0.5) * spread);
    }
  }
  context.putImageData(image, 0, 0);
  return canvas;
};

const GlowMask = (): null => {
  useEffect(() => {
    if (hasStarted) return;
    hasStarted = true;

    drawGlowMask()?.toBlob(blob => {
      if (!blob) return;
      const root = document.documentElement;
      root.style.setProperty('--orb-mask', `url(${URL.createObjectURL(blob)})`);
      root.dataset.orbMask = 'ready';
    });
  }, []);

  return null;
};

export default GlowMask;
