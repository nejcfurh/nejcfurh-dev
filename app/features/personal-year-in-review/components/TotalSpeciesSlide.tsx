import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedSubTitle from '@/app/components/motion/AnimatedSubTitle';
import AnimatedTitle from '@/app/components/motion/AnimatedTitle';
import Image from 'next/image';

const BORDER_COLORS = ['#FDE7C6', '#FBEFEF', '#CAE5ED'];

const TotalSpeciesSlide = ({
  totalSpeciesVisited,
  totalSpeciesVisitedPercentile,
  speciesVisitedIcons,
}: {
  totalSpeciesVisited: number;
  totalSpeciesVisitedPercentile: number;
  speciesVisitedIcons: string[];
}): React.ReactNode => {
  const cappedPercentile = Math.min(
    99,
    Math.max(1, totalSpeciesVisitedPercentile),
  );

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-[#95CBDC] px-4 py-20 font-inter sm:py-24 md:py-32">
      <div className="relative z-10 mx-auto mt-16 flex h-1/2 w-full flex-col items-center">
        {/* TITLE WITH DECORATIVE LINE */}
        <AnimatedSubTitle
          className="text-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          You hosted a total of
        </AnimatedSubTitle>
        <AnimatedTitle
          className="font-awesome-serif text-[5rem] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {totalSpeciesVisited}
        </AnimatedTitle>
        <AnimatedSubTitle
          className="mt-4 text-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          different species this year!
        </AnimatedSubTitle>
        <AnimatedDiv
          className="mx-7 mt-14 text-center text-xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          That&apos;s more diversity than{' '}
          <span className="font-bold">{cappedPercentile}%</span> of feeders
          worldwide.
        </AnimatedDiv>
      </div>
      {/* BOTTOM HALF CONTAINER FOR STACKED BIRDS */}
      <div className="absolute bottom-0 left-0 z-50 h-1/2 w-full">
        {Array.from({
          // TO ENSURE ONLY MAX 20 ICONS ARE RENDERED
          length: totalSpeciesVisited >= 20 ? 20 : totalSpeciesVisited,
        }).map((_, index) => {
          const iconIndex = index % speciesVisitedIcons.length;
          const isRandomLayout = totalSpeciesVisited <= 19;

          let finalLeft: number;
          let finalBottom: number;

          if (isRandomLayout) {
            // "RANDOM" SCATTERED LAYOUT FOR FEWER THAN 10 SPECIES
            const scatteredPositions: Array<{ left: number; bottom: number }> =
              [
                { left: 25, bottom: 43 }, // 1: left-center upper
                { left: 5, bottom: 28 }, // 2: left middle
                { left: 65, bottom: 18 }, // 3: right lower
                { left: 35, bottom: 5 }, // 4: center bottom
                { left: 55, bottom: 38 }, // 5: right-center upper
                { left: -5, bottom: 3 }, // 6: far left bottom
                { left: 75, bottom: 43 }, // 7: far right upper
                { left: 45, bottom: 28 }, // 8: center middle
                { left: 15, bottom: 13 }, // 9: left-center bottom
                { left: -10, bottom: 28 }, // 10: far left middle
                { left: 80, bottom: 18 }, // 11: far right lower
                { left: 30, bottom: 55 }, // 12: center upper
                { left: 60, bottom: 55 }, // 13: right upper
                { left: -5, bottom: 43 }, // 14: far left upper
                { left: 55, bottom: 4 }, // 15: center-right bottom
                { left: 34, bottom: 25 }, // 16: left-center middle
                { left: 2, bottom: 55 }, // 17: left-center middle
                { left: 74, bottom: 4 }, // 18: left-center middle
                { left: 15, bottom: 3 }, // 19: left-center middle
              ];

            const position = scatteredPositions[index];

            finalLeft = position.left;
            finalBottom = position.bottom;
          } else {
            // ORDERED POSITIONING - BIRDS STACK IN A PATTERN
            const row = Math.floor(index / 5);
            const col = index % 5;

            // CHECK IF THIS IS THE LAST ROW AND HOW MANY ITEMS ARE IN IT
            const totalRows = Math.ceil(totalSpeciesVisited / 5);
            const isLastRow = row === totalRows - 1;
            const itemsInLastRow = totalSpeciesVisited % 5 || 5;

            let adjustedCol = col;

            // CUSTOM ARRANGEMENT FOR INCOMPLETE LAST ROW
            if (isLastRow && itemsInLastRow < 5) {
              const positionMap: Record<number, number[]> = {
                1: [2], // CENTER POSITION
                2: [0, 4], // FIRST AND LAST POSITIONS
                3: [0, 1, 4], // FIRST TWO AND LAST POSITIONS
                4: [0, 1, 3, 4], // SKIP MIDDLE POSITION
              };

              adjustedCol = positionMap[itemsInLastRow][col] ?? col;
            }

            const orderedLeft = -8 + adjustedCol * 21;
            const orderedBottom = -5 + row * 21;

            // VERTICAL OFFSETS FOR ORGANIC SHUFFLED LOOK
            const verticalOffset =
              Math.sin(index * 4.7) * 2 + Number(Math.cos(index * 3.2)) * 1;
            const horizontalOffset =
              Math.sin(index * 5.3) * 2 + Number(Math.cos(index * 2.8)) * 1;

            finalLeft = orderedLeft + horizontalOffset;
            finalBottom = orderedBottom + verticalOffset;
          }

          // Random z-index for overlapping effect
          const randomZIndex = Math.floor(Math.sin(index * 7.3) * 50) + 50;
          const randomRotation = Math.sin(index * 3.1) * 10;

          return (
            <AnimatedDiv
              key={index}
              className={`absolute h-28 w-28 overflow-visible rounded-full border-12
              bg-amber-50 shadow-xl shadow-primary/50`}
              initial={{ opacity: 0, y: 100, scale: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: randomRotation,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 1.5 + index * 0.08,
              }}
              style={{
                left: `${finalLeft}%`,
                bottom: `${finalBottom}%`,
                zIndex: randomZIndex,
                borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
              }}
            >
              <Image
                src={speciesVisitedIcons[iconIndex]}
                alt={`Species ${index + 1}`}
                width={80}
                height={80}
                unoptimized
                loading="eager"
                priority
                className="h-full w-full scale-105 overflow-visible rounded-full"
              />
            </AnimatedDiv>
          );
        })}
      </div>
    </section>
  );
};

export default TotalSpeciesSlide;
