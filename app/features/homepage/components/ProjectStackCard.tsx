'use client';

import {
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, Eye, Github } from 'lucide-react';
import { JSX, useRef } from 'react';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedImage from '@/app/components/motion/AnimatedImage';
import AnimatedSpan from '@/app/components/motion/AnimatedSpan';
import AnimatedSubHeading from '@/app/components/motion/AnimatedSubHeading';
import AnimatedText from '@/app/components/motion/AnimatedText';
import { projects } from '../constants';

const overlayContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const overlayItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const pillBase =
  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold';

interface ProjectStackCardProps {
  project: (typeof projects)[number];
  index: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
  onPreview?: () => void;
}

const ProjectStackCard = ({
  project,
  index,
  range,
  targetScale,
  progress,
  onPreview,
}: ProjectStackCardProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const imageFilter = useMotionTemplate`blur(${blurAmount}px)`;

  const hasPreview = 'has_preview' in project && project.has_preview;

  return (
    // CARD CONTAINER
    // Each container is a full-viewport sticky box, so the ones further down the
    // stack sit on top of the cards already parked above them. Left clickable it
    // swallows the previous card's links through its empty area — hit-testing
    // only reaches the cards themselves.
    <div
      ref={containerRef}
      className="pointer-events-none sticky top-0 mx-auto flex h-screen justify-center"
    >
      {/* CARD */}
      <AnimatedDiv
        className="pointer-events-auto relative mt-[30vh] sm:mt-[23vh] h-[340px] w-[1000px] max-w-[90vw] origin-top overflow-hidden rounded-2xl border-2 border-white/60 sm:h-[510px]"
        style={{ top: `calc(-10% + ${index * 25}px)`, scale: cardScale }}
      >
        <AnimatedImage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full object-cover"
          src={project.image}
          alt={project.name}
          style={{
            scale: imageScale,
            filter: imageFilter,
          }}
        />

        {/* DARK GRADIENT — always applied to the bottom of the picture,
            independent of the text reveal animation */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/75 to-transparent" />

        {/* CONTENT OVERLAY */}
        <AnimatedDiv
          className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-8"
          variants={overlayContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <AnimatedSubHeading
            className="text-xl font-bold sm:text-3xl"
            variants={overlayItem}
          >
            {project.name}
          </AnimatedSubHeading>

          <AnimatedText
            className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80"
            variants={overlayItem}
          >
            {project.description}
          </AnimatedText>

          <AnimatedDiv
            className="mt-4 flex flex-wrap gap-2"
            variants={overlayContainer}
          >
            {project.tags.map((tag: { name: string; color: string }) => (
              <AnimatedSpan
                key={tag.name}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                style={tag.color ? { color: tag.color } : undefined}
                variants={overlayItem}
              >
                #{tag.name}
              </AnimatedSpan>
            ))}
          </AnimatedDiv>

          <AnimatedDiv
            className="mt-5 flex flex-wrap items-center gap-3"
            variants={overlayItem}
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pillBase} bg-white text-black transition-transform duration-300 ease-out hover:scale-105 active:scale-95`}
              >
                <span>Visit</span>
                <ArrowUpRight size={16} />
              </a>
            )}

            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${pillBase} border border-white/30 transition-colors hover:bg-white/10`}
              >
                <Github size={16} />
                <span>Source</span>
              </a>
            )}

            {hasPreview && (
              <button
                onClick={onPreview}
                className={`${pillBase} cursor-pointer border border-white/30 transition-colors hover:bg-white/10`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            )}
          </AnimatedDiv>
        </AnimatedDiv>
      </AnimatedDiv>
    </div>
  );
};

export default ProjectStackCard;
