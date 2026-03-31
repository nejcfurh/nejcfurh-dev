import { BirderProfile } from '../types/types';

interface BirderProfileParams {
  totalVisits: number;
  distinctSpeciesCount: number;
  namedBirdsCount: number;
  otherAnimalVisitsCount: number;
}

export const calculateBirderProfile = ({
  totalVisits,
  distinctSpeciesCount,
  namedBirdsCount,
  otherAnimalVisitsCount,
}: BirderProfileParams): BirderProfile => {
  const hasHighNamedBirdCount = namedBirdsCount >= 5;
  const hasLowOtherAnimalVisits = otherAnimalVisitsCount < 20; // count actual visits not distinct species for other animals
  const hasHighVisitCount = totalVisits >= 500;
  const hasMediumVisitCount = totalVisits >= 250 && totalVisits < 500;
  const hasHighSpeciesDiversity = distinctSpeciesCount >= 25;
  const hasLowSpeciesDiversity = distinctSpeciesCount < 10;

  switch (true) {
    case hasHighNamedBirdCount && hasHighVisitCount:
      return BirderProfile.SCIENTIST;

    case hasLowSpeciesDiversity && hasHighVisitCount:
      return BirderProfile.SPECIALIST;

    case hasLowOtherAnimalVisits:
      return BirderProfile.GUARDIAN;

    case hasHighSpeciesDiversity && hasMediumVisitCount:
      return BirderProfile.SOCIALITE;

    default:
      return BirderProfile.SOCIALITE;
  }
};

// FOR NAVIGATION OF STORIES ON DESKTOP/IPAD

const createMouseEvent = (
  type: 'mousedown' | 'mouseup' | 'click',
  x: number,
  y: number,
): MouseEvent => {
  return new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    button: 0,
  });
};

const dispatchClickSequence = (
  element: Element,
  x: number,
  y: number,
): void => {
  element.dispatchEvent(createMouseEvent('mousedown', x, y));
  setTimeout(() => {
    element.dispatchEvent(createMouseEvent('mouseup', x, y));
    element.dispatchEvent(createMouseEvent('click', x, y));
  }, 10);
};

export const createNavigationHandler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  horizontalPosition: number,
) => {
  return (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;

    if (!container) return;

    const button = e.currentTarget;
    const originalPointerEvents = button.style.pointerEvents;

    // Temporarily disable pointer events to find element underneath
    button.style.pointerEvents = 'none';

    const rect = container.getBoundingClientRect();
    const x = rect.left + rect.width * horizontalPosition;
    const y = rect.top + rect.height / 2;

    const elementAtPoint = document.elementFromPoint(x, y);

    // Restore pointer events
    button.style.pointerEvents = originalPointerEvents;

    if (elementAtPoint && elementAtPoint !== button) {
      dispatchClickSequence(elementAtPoint, x, y);
    }
  };
};
