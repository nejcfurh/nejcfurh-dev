import { useEffect, useMemo, useState } from 'react';

import type { YearInReviewSpeciesVisit } from '../types/types';

interface UseTopSpeciesImagePreloadProps {
  topSpecies: YearInReviewSpeciesVisit | undefined;
}

interface UseTopSpeciesImagePreloadReturn {
  imagesLoaded: boolean;
  loadedUrls: Set<string>;
}

export const useTopSpeciesImagePreload = ({
  topSpecies,
}: UseTopSpeciesImagePreloadProps): UseTopSpeciesImagePreloadReturn => {
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());

  // Get all unique image URLs to preload
  const urlsArray = useMemo(() => {
    const imageUrls = new Set<string>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    topSpecies?.medias?.forEach((media: any) => {
      if (media?.__typename === 'MediaImage') {
        imageUrls.add(media.thumbnailUrl);
      }
    });

    return Array.from(imageUrls);
  }, [topSpecies]);

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
          // Don't reject - just continue and mark as "loaded" anyway
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
    // Nothing to preload counts as loaded.
    imagesLoaded: urlsArray.length === 0 || allLoaded,
    loadedUrls,
  };
};
