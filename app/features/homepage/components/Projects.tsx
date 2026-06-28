'use client';

import { AnimatePresence, useScroll } from 'framer-motion';
import {
  JSX,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { ArrowUpRight, Eye, Github, X } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import { projects } from '../constants';
import ProjectStackCard from './ProjectStackCard';

const PersonalYearInReview = lazy(
  () => import('@/app/features/personal-year-in-review/page'),
);

// How much each card shrinks per card stacked on top of it. Kept gentle so the
// deepest card in a long list never collapses to an unreadable size.
const SCALE_STEP = 0.035;

// The projects shown as the large stacked cards (the rest fall into the grid
// below). Order here is the order they stack in.
const FEATURED_NAMES = [
  'Design Lab',
  'Twabblr',
  'Backyard Skies',
  'N-Drive',
  'Birdbuddy WIKI',
  'Birdbuddy Year in Birds',
  'Seoul Beauty Club',
  'Elysantium',
];

const featuredProjects = FEATURED_NAMES.map(name =>
  projects.find(project => project.name === name),
).filter((project): project is (typeof projects)[number] => Boolean(project));

const additionalProjects = projects.filter(
  project => !FEATURED_NAMES.includes(project.name),
);

const AdditionalProjectCard = ({
  project,
  index,
  onPreview,
}: {
  project: (typeof projects)[number];
  index: number;
  onPreview?: () => void;
}): JSX.Element => {
  const hasPreview = 'has_preview' in project && project.has_preview;

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] sm:block sm:aspect-video sm:bg-transparent"
    >
      {/* Image — its own aspect-video block on mobile, fills the card on desktop */}
      <div className="relative aspect-video w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-105 sm:group-hover:blur-sm"
        />

        {/* Dark scrim — overlay treatment only matters on desktop */}
        <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-black/95 via-black/65 to-transparent sm:block" />
      </div>

      {/* Content — stacked below the image on mobile, overlaid at the bottom on desktop */}
      <div className="flex flex-col p-5 text-white sm:absolute sm:inset-0 sm:justify-end">
        <h3 className="text-lg font-bold">{project.name}</h3>

        {/* Description: always visible on mobile; hover-reveal on desktop */}
        <div className="sm:grid sm:grid-rows-[0fr] sm:transition-[grid-template-rows] sm:duration-300 sm:ease-out sm:group-hover:grid-rows-[1fr]">
          <div className="sm:overflow-hidden">
            <p className="mt-2 text-sm leading-relaxed text-white/75 sm:line-clamp-3 sm:text-white/80">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags
            .slice(0, 4)
            .map((tag: { name: string; color: string }) => (
              <span
                key={tag.name}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                style={tag.color ? { color: tag.color } : undefined}
              >
                #{tag.name}
              </span>
            ))}
        </div>

        {/* Actions — same pills as the featured cards, sized down */}
        {(project.link || project.source_code_link || hasPreview) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
              >
                <span>Visit</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Github size={14} />
                <span>Source</span>
              </a>
            )}

            {hasPreview && (
              <button
                onClick={onPreview}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Eye size={14} />
                <span>Preview</span>
              </button>
            )}
          </div>
        )}
      </div>
    </AnimatedDiv>
  );
};

const IPhoneModal = ({ onClose }: { onClose: () => void }): JSX.Element => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatedDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Close preview"
      >
        <X size={20} className="text-white" />
      </button>

      {/* iPhone frame */}
      <AnimatedDiv
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative scale-[0.65] sm:scale-75 lg:scale-[0.85]"
      >
        {/* iPhone outer shell */}
        <div
          className="relative rounded-[54px] bg-[#1a1a1a] p-[14px]"
          style={{
            boxShadow:
              '0 0 60px 15px var(--accent-glow), 0 0 120px 40px var(--accent-glow-soft)',
          }}
        >
          {/* Screen */}
          <div className="relative w-[370px] h-[750px] sm:h-[800px] rounded-[40px] overflow-hidden bg-black">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-[#FFF3DC]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
                </div>
              }
            >
              <PersonalYearInReview />
            </Suspense>
          </div>
        </div>
      </AnimatedDiv>
    </AnimatedDiv>
  );
};

const Projects = (): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const handleOpenPreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <section id="projects" className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-x-clip">
        <div className="gradient-orb gradient-orb-accent w-[400px] h-[400px] hidden sm:block -bottom-[150px] -right-[150px] absolute" />
      </div>

      <span className="hash-span">&nbsp;</span>

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-32">
        <SectionHeading label="My Work" title="Projects." />

        <AnimatedText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-secondary max-w-2xl leading-relaxed"
        >
          A showcase of my latest web development creations. Each project
          includes links to GitHub repositories{' '}
          <span className="italic">(if not private)</span> and live demos
          <span className="italic">(if available)</span>. Scroll to watch them
          stack into place.
        </AnimatedText>
      </div>

      {/* Stacking cards (featured) */}
      <div ref={containerRef} className="relative pb-0 sm:pb-[18vh]">
        {featuredProjects.map((project, index) => {
          const targetScale =
            1 - (featuredProjects.length - index) * SCALE_STEP;

          return (
            <ProjectStackCard
              key={project.name}
              project={project}
              index={index}
              range={[index * (1 / featuredProjects.length), 1]}
              targetScale={targetScale}
              progress={scrollYProgress}
              onPreview={
                'has_preview' in project && project.has_preview
                  ? handleOpenPreview
                  : undefined
              }
            />
          );
        })}
      </div>

      {/* Additional projects (grid) */}
      {additionalProjects.length > 0 && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {additionalProjects.map((project, index) => (
              <AdditionalProjectCard
                key={project.name}
                project={project}
                index={index}
                onPreview={
                  'has_preview' in project && project.has_preview
                    ? handleOpenPreview
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showPreview && <IPhoneModal onClose={handleClosePreview} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
