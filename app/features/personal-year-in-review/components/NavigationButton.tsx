import type React from 'react';
import clsx from 'clsx';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const NavigationButton = ({
  direction,
  onClick,
  className
}: NavigationButtonProps): React.JSX.Element => {
  const isPrev = direction === 'prev';
  const positionClass = isPrev
    ? 'left-[calc(50%-220px-60px)] -translate-x-1/2'
    : 'left-[calc(50%+220px+60px)] -translate-x-1/2';

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'absolute',
        positionClass,
        'top-1/2 z-50 -translate-y-1/2 rounded-full p-3 text-primary transition-all duration-300 no-tap-highlight active:scale-[2]',
        className
      )}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('text-primary', isPrev && 'rotate-180')}
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default NavigationButton;
