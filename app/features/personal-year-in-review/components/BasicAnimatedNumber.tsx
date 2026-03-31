'use client';

import AnimatedNumber from '@/app/components/motion/AnimatedNumber';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const AnimatedNumberBasic = ({
  passedValue,
  className,
}: {
  passedValue: number;
  className?: string;
}): React.JSX.Element => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(passedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="inline-flex items-center justify-center">
      <AnimatedNumber
        className={clsx('inline-flex items-center', className)}
        springOptions={{
          bounce: 0.5,
          damping: 20,
          stiffness: 50,
          mass: 1.1,
          duration: 2000,
        }}
        value={value}
      />
    </span>
  );
};

export default AnimatedNumberBasic;
