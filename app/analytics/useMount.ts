'use client';

import { useEffect, useRef, type EffectCallback } from 'react';

export const useMount = (callback: EffectCallback): void => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    // Ref guard so Strict Mode's double-invoked effect does not fire the callback twice in development.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;

      return callback();
    }
  }, []);
};
