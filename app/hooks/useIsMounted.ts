'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (): (() => void) => () => {};

const getSnapshot = (): boolean => true;

// The server snapshot is also what the hydration render sees, so markup gated on
// this hook matches the server HTML and only appears once hydration is finished.
const getServerSnapshot = (): boolean => false;

export const useIsMounted = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
