import AnimatedDiv from '@/app/components/motion/AnimatedDiv';

const GuideIcon = ({
  type
}: {
  type: 'back' | 'pause' | 'next';
}): React.JSX.Element => {
  if (type === 'back') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M14 8l-4 4 4 4" />
      </svg>
    );
  }

  if (type === 'pause') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-primary"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l4 4-4 4" />
    </svg>
  );
};

const GuideItem = ({
  type,
  action,
  label
}: {
  type: 'back' | 'pause' | 'next';
  action: string;
  label: string;
}): React.JSX.Element => {
  return (
    <div className="mt-2 flex flex-col items-center justify-center text-justify opacity-80">
      <div className="my-1 flex items-center justify-center">
        <GuideIcon type={type} />
      </div>
      <p className="text-center font-inter text-[10px] font-light text-primary">
        {action}
      </p>
      <p className="text-center font-inter text-[10px] font-semibold text-primary">
        {label}
      </p>
    </div>
  );
};

const GuideComponent = (): React.JSX.Element => {
  return (
    <AnimatedDiv
      className="absolute bottom-0 left-0 z-50 flex h-[25vh] w-full flex-col items-center justify-center bg-gradient-to-b from-transparent to-black/20 no-tap-highlight"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 2 }}
    >
      <div className="mb-1 flex items-center justify-center opacity-70">
        <p className="text-center font-inter text-xs font-light text-primary">
          Stories will autoplay. <br />
          You can still navigate through your <br />
          <span className="font-semibold italic">Year in Birds</span> if you:
        </p>
      </div>

      <AnimatedDiv
        className="grid h-fit w-full grid-cols-3 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 2 }}
      >
        <GuideItem type="back" action="Tap on the left to" label="Go back" />
        <GuideItem type="pause" action="Hold anyhere to" label="Pause" />
        <GuideItem
          type="next"
          action="Tap on the right for"
          label="Next Slide"
        />
      </AnimatedDiv>
    </AnimatedDiv>
  );
};

export default GuideComponent;
