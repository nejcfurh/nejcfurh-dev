'use client';

import { ButtonNameType } from '@/app/analytics/constants';
import { useButtonTap } from '@/app/analytics/useButtonTap';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, Eye, Github } from 'lucide-react';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from '@/app/components/SectionHeading';
import {
  cardVariants,
  contentItem,
  listItem,
  staggerList,
} from '@/app/components/motion/cardContent';
import { projects } from '../constants';
import ProjectPreviewModal from './ProjectPreviewModal';

type Project = (typeof projects)[number];

const FEATURED_NAMES = [
  'Design Lab',
  'Birdbuddy WIKI',
  'Birdbuddy Year in Birds',
  'Seoul Beauty Club',
  'Wonder',
];

const MORE_NAMES = [
  'Birdbuddy WIKI CMS',
  'Friends of Nature',
  'N-Drive',
  'Twabblr',
  'Backyard Skies',
  'Elysantium',
  'ToDoCards',
  'Domavia',
  'Blog',
];

const STUDIO_REPO = 'https://github.com/nejcfurh/nejcfurh-studio';
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const pickProjects = (names: string[]): Project[] =>
  names
    .map(name => projects.find(project => project.name === name))
    .filter((project): project is Project => Boolean(project));

const featuredProjects = pickProjects(FEATURED_NAMES);
const moreProjects = pickProjects(MORE_NAMES);

const CountUp = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? value : 0);
  const text = useTransform(
    count,
    current =>
      `${prefix}${current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`,
  );

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(count, value, { duration: 1.6, ease: EASE_OUT });
    return () => controls.stop();
  }, [count, isInView, reduceMotion, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text}
    </motion.span>
  );
};

const Highlight = ({ project }: { project: Project }): JSX.Element | null => {
  if (!('highlight' in project) || !project.highlight) return null;
  const { highlight } = project;

  return (
    <span className="whitespace-nowrap rounded-full border border-accent-light/55 bg-accent/35 px-3 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">
      {'value' in highlight && typeof highlight.value === 'number' ? (
        <CountUp
          value={highlight.value}
          decimals={'decimals' in highlight ? highlight.decimals : 0}
          prefix={'prefix' in highlight ? highlight.prefix : ''}
          suffix={'suffix' in highlight ? highlight.suffix : ''}
        />
      ) : (
        'text' in highlight && highlight.text
      )}
    </span>
  );
};

const Tags = ({ project, limit, small }: { project: Project; limit?: number; small?: boolean }): JSX.Element => (
  <motion.div variants={staggerList} className="flex flex-wrap gap-1.5">
    {project.tags.slice(0, limit).map(tag => (
      <motion.span
        key={tag.name}
        variants={listItem}
        className={`rounded-full border border-white/20 bg-white/10 font-medium text-white ${small ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}
      >
        #{tag.name}
      </motion.span>
    ))}
  </motion.div>
);

const FeaturedCard = ({
  project,
  isHero,
  index,
  onPreview,
}: {
  project: Project;
  isHero: boolean;
  index: number;
  onPreview: () => void;
}): JSX.Element => {
  const trackButtonTap = useButtonTap();
  const hasPreview = 'has_preview' in project && project.has_preview;
  const label = 'label' in project ? project.label : undefined;

  return (
    <motion.div
      className={isHero ? 'md:col-span-2' : undefined}
      variants={cardVariants({ delay: (index % 2) * 0.12, from: { y: 40, scale: 0.97 }, duration: 0.8 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      <article
        className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/15 bg-tertiary transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-accent-light/70 hover:shadow-[0_34px_80px_-28px_rgba(96,134,190,0.7)] ${
          isHero ? 'min-h-[520px] lg:min-h-[480px]' : 'min-h-[520px]'
        }`}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes={isHero ? '(max-width: 768px) 100vw, 1152px' : '(max-width: 768px) 100vw, 576px'}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className={
            isHero
              ? 'absolute inset-0 bg-linear-to-t from-black/95 via-black/80 via-45% to-black/10 lg:bg-linear-to-r lg:from-black/95 lg:via-black/80 lg:via-40% lg:to-transparent'
              : 'absolute inset-0 bg-linear-to-t from-black/95 via-black/85 via-40% to-black/5'
          }
        />

        <motion.div
          variants={contentItem}
          className="absolute inset-x-5 top-5 z-10 flex flex-wrap items-start justify-between gap-2 sm:inset-x-6"
        >
          {label && (
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-black/55 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#cfe0f5] backdrop-blur-md">
              {label}
            </span>
          )}
          <Highlight project={project} />
        </motion.div>

        <div
          className={`relative flex flex-col gap-3 px-5 pb-5 pt-28 sm:px-6 sm:pb-6 ${isHero ? 'lg:max-w-[620px]' : ''}`}
        >
          <motion.h3
            variants={contentItem}
            className={`font-bold tracking-tight text-white ${isHero ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]'}`}
          >
            {project.name}
          </motion.h3>
          <motion.p variants={contentItem} className="text-[15px] leading-relaxed text-white/80">
            {project.description}
          </motion.p>
          <Tags project={project} />
          <motion.div variants={contentItem} className="flex flex-wrap gap-2.5 pt-1">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonTap(ButtonNameType.PROJECT_VISIT, { ProjectName: project.name })}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Visit
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonTap(ButtonNameType.PROJECT_SOURCE, { ProjectName: project.name })}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/35 bg-black/30 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Github size={15} />
                Source
              </a>
            )}
            {hasPreview && (
              <button
                type="button"
                onClick={() => {
                  trackButtonTap(ButtonNameType.PROJECT_PREVIEW, { ProjectName: project.name });
                  onPreview();
                }}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-white/35 bg-black/30 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <Eye size={15} />
                Preview
              </button>
            )}
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
};

const MoreCard = ({ project, index }: { project: Project; index: number }): JSX.Element => {
  const trackButtonTap = useButtonTap();
  const isInternal = !project.link && !project.source_code_link;

  return (
    <motion.article
      className="group relative aspect-4/3 overflow-hidden rounded-[20px] border border-white/15 bg-tertiary"
      variants={cardVariants({ delay: (index % 3) * 0.1, from: { y: 40 }, duration: 0.7 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/95 via-black/80 via-45% to-black/10" />
      <motion.div variants={contentItem} className="absolute right-4 top-4 z-10">
          {isInternal ? (
            <span className="rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-md">
              Internal
            </span>
          ) : (
            <div className="flex gap-1.5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name}`}
                  onClick={() => trackButtonTap(ButtonNameType.PROJECT_VISIT, { ProjectName: project.name })}
                  className="flex size-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                >
                  <ArrowUpRight size={15} />
                </a>
              )}
              {project.source_code_link && (
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source`}
                  onClick={() => trackButtonTap(ButtonNameType.PROJECT_SOURCE, { ProjectName: project.name })}
                  className="flex size-9 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75"
                >
                  <Github size={15} />
                </a>
              )}
            </div>
          )}
      </motion.div>
      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2">
        <motion.h4 variants={contentItem} className="text-[19px] font-bold text-white">
          {project.name}
        </motion.h4>
        <motion.p variants={contentItem} className="line-clamp-2 text-[13px] leading-normal text-white/75">
          {project.description}
        </motion.p>
        <div className="pt-0.5">
          <Tags project={project} limit={3} small />
        </div>
      </div>
    </motion.article>
  );
};

const Projects = (): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false);
  const trackButtonTap = useButtonTap();
  const handleOpenPreview = useCallback(() => setShowPreview(true), []);
  const handleClosePreview = useCallback(() => setShowPreview(false), []);

  return (
    <section id="projects" className="relative py-32">
      {/* Not clipped vertically, so the glow straddles the boundary with Experience. */}
      <div className="pointer-events-none absolute inset-0 overflow-x-clip">
        <div className="gradient-orb gradient-orb-accent absolute -left-[150px] -top-[150px] hidden h-[400px] w-[400px] sm:block" />
      </div>
      <span className="hash-span">&nbsp;</span>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading label="My Work" title="Projects." />
        <motion.p
          className="-mt-8 mb-14 max-w-2xl leading-relaxed text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        >
          A showcase of my latest web development work, from Birdbuddy products in
          production to my own animation lab. Each project links to its live demo
          (if available) and its GitHub repository (if not private).
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <FeaturedCard
              key={project.name}
              project={project}
              isHero={index === 0}
              index={index}
              onPreview={handleOpenPreview}
            />
          ))}
        </div>

        <div className="mb-6 mt-20 flex items-baseline justify-between gap-4 border-b border-(--divider) pb-4">
          <h3 className="text-[22px] font-semibold text-white-100">More projects</h3>
          <a
            href={STUDIO_REPO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonTap(ButtonNameType.PROJECT_SOURCE, { ProjectName: 'nejcfurh-studio' })}
            className="group inline-flex items-center gap-1.5 text-sm text-accent-light transition-colors hover:text-white-100"
          >
            All code on GitHub
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((project, index) => (
            <MoreCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPreview && <ProjectPreviewModal onClose={handleClosePreview} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
