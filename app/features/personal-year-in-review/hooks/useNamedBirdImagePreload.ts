import { useEffect, useState } from 'react';

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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());

  useEffect(() => {
    const namedBirds = namedBirdVisitStats?.namedBirds ?? [];

    if (namedBirds.length === 0) {
      setImagesLoaded(true);

      return;
    }

    // GET ALL UNIQUE IMAGE URLs TO PRELOAD
    const imageUrls = new Set<string>();

    // ANY WAS SET BECAUSE THE TYPES ARE NOT NEEDED AS THE MOCK DATA IS USED INSTEAD
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    namedBirds.forEach((bird: any) => {
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

    const urlsArray = Array.from(imageUrls);

    if (urlsArray.length === 0) {
      setImagesLoaded(true);

      return;
    }

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
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = (): void => {
          // DON'T REJECT - JUST CONTINUE AND MARK AS "LOADED" ANYWAY
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.src = url;
      });
    };

    Promise.all(urlsArray.map(url => preloadImage(url))).catch(error => {
      console.error(error);
      setImagesLoaded(true);
    });
  }, [namedBirdVisitStats]);

  return {
    imagesLoaded,
    loadedUrls,
  };
};
