import { useEffect, useMemo, useState } from 'react';

import type { YearInReviewNamedBirdStats } from '../types/types';

interface UseNamedBirdImagePreloadProps {
  namedBirdVisitStats: YearInReviewNamedBirdStats | null | undefined;
}

interface UseNamedBirdImagePreloadReturn {
  imagesLoaded: boolean;
  loadedUrls: Set<string>;
}

export const useNamedBirdImagePreload = ({
  namedBirdVisitStats,
}: UseNamedBirdImagePreloadProps): UseNamedBirdImagePreloadReturn => {
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());

  // GET ALL UNIQUE IMAGE URLs TO PRELOAD
  const urlsArray = useMemo(() => {
    const imageUrls = new Set<string>();

    // ANY WAS SET BECAUSE THE TYPES ARE NOT NEEDED AS THE MOCK DATA IS USED INSTEAD
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (namedBirdVisitStats?.namedBirds ?? []).forEach((bird: any) => {
      // IMAGES
      const firstMedia = bird.namedBird.previewMedia?.[0];

      if (firstMedia?.__typename === 'MediaImage') {
        imageUrls.add(firstMedia.thumbnailUrl);
      }
      // ICONS
      if (bird.namedBird.species.iconUrl) {
        imageUrls.add(bird.namedBird.species.iconUrl);
      }
    });

    return Array.from(imageUrls);
  }, [namedBirdVisitStats]);

  useEffect(() => {
    if (urlsArray.length === 0) return;

    let loadedCount = 0;
    const totalImages = urlsArray.length;

    const preloadImage = (url: string): Promise<void> => {
      return new Promise(resolve => {
        const img = new window.Image();

        img.onload = (): void => {
          loadedCount++;
          setLoadedUrls(prev => {
            const newSet = new Set<string>(prev);

            newSet.add(url);

            return newSet;
          });
          if (loadedCount === totalImages) {
            setAllLoaded(true);
          }
          resolve();
        };
        img.onerror = (): void => {
          // DON'T REJECT - JUST CONTINUE AND MARK AS "LOADED" ANYWAY
          loadedCount++;
          if (loadedCount === totalImages) {
            setAllLoaded(true);
          }
          resolve();
        };
        img.src = url;
      });
    };

    Promise.all(urlsArray.map(url => preloadImage(url))).catch(error => {
      console.error(error);
      setAllLoaded(true);
    });
  }, [urlsArray]);

  return {
    // NOTHING TO PRELOAD COUNTS AS LOADED
    imagesLoaded: urlsArray.length === 0 || allLoaded,
    loadedUrls,
  };
};
