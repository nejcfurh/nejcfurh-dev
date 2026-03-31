'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { JSX, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Eye, Github, X } from 'lucide-react';
import SectionHeading from '@/app/components/SectionHeading';
import { projects } from '../constants';

const PersonalYearInReview = lazy(
  () => import('@/app/features/personal-year-in-review/page'),
);

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  onPreview?: () => void;
}

const ProjectCard = ({
  project,
  index,
  onPreview,
}: ProjectCardProps): JSX.Element => {
  const hasPreview = 'has_preview' in project && project.has_preview;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="project-card glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-[180px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="project-card-image object-cover"
        />
        {/* Hover overlay */}
        {(project.source_code_link || project.link || hasPreview) && (
          <div className="project-card-overlay absolute inset-0 bg-primary/10 backdrop-blur-xs flex items-center justify-center gap-4">
            {project.source_code_link && (
              <Link
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-colors ease-out duration-300"
              >
                <Github size={20} className="text-white-100" />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-colors ease-out duration-300"
              >
                <ExternalLink size={20} className="text-white-100" />
              </Link>
            )}
            {hasPreview && (
              <button
                onClick={onPreview}
                className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/75 transition-colors ease-out duration-300 cursor-pointer"
              >
                <Eye size={20} className="text-white-100" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white-100 font-semibold text-lg">{project.name}</h3>
        <p className="text-secondary text-sm mt-2 leading-relaxed line-clamp-5">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: { name: string; color: string }) => (
            <span key={tag.name} className="tag-pill">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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
    <motion.div
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
      >
        <X size={20} className="text-white" />
      </button>

      {/* iPhone frame */}
      <motion.div
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
              '0 0 60px 15px rgba(255, 255, 255, 0.15), 0 0 120px 40px rgba(255, 255, 255, 0.05)',
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
      </motion.div>
    </motion.div>
  );
};

const Projects = (): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false);

  const handleOpenPreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="gradient-orb gradient-orb-accent w-[400px] h-[400px] hidden sm:block -top-[150px] -left-[150px] absolute" />
      <div className="gradient-orb gradient-orb-accent w-[400px] h-[400px] hidden sm:block -bottom-[150px] -right-[150px] absolute" />
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading label="My Work" title="Projects." />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-secondary max-w-2xl mb-16 leading-relaxed"
        >
          A showcase of my latest web development creations. Each project
          includes links to GitHub repositories{' '}
          <span className="italic">(if not private)</span> and live demos
          <span className="italic">(if available)</span>.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
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

      <AnimatePresence>
        {showPreview && <IPhoneModal onClose={handleClosePreview} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
