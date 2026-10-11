'use client';

import { motion } from 'motion/react';
import { JSX } from 'react';
import SectionHeading from '@/app/components/SectionHeading';
import {
  MapPin,
  Briefcase,
  Code,
  GraduationCap,
  Sparkles,
  Clapperboard,
} from 'lucide-react';
import AngledMediaSlider from './AngledMediaSlider';
import CareerPath from './CareerPath';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import { GrGraphQl } from 'react-icons/gr';
import { IoLogoVercel } from 'react-icons/io5';
import {
  SiExpress,
  SiFramer,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGooglecloud,
  SiPrisma,
  SiRedux,
  SiStripe,
  SiSupabase,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { TbBrandTailwind } from 'react-icons/tb';

const TECH_STACK_DATA = [
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3 /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <IoLogoVercel /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Redux', icon: <SiRedux /> },
  { name: 'Prisma', icon: <SiPrisma /> },
  { name: 'Vercel', icon: <SiVercel /> },
  { name: 'Motion', icon: <SiFramer /> },
  { name: 'Tailwind CSS', icon: <TbBrandTailwind /> },
  { name: 'GraphQL', icon: <GrGraphQl /> },
  { name: 'Stripe', icon: <SiStripe /> },
  { name: 'Supabase', icon: <SiSupabase /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Google Cloud', icon: <SiGooglecloud /> },
];

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 },
  }),
};

const infoCards = [
  {
    icon: Briefcase,
    label: 'Current Role',
    title: 'Product Engineer',
    subtitle: 'Birdbuddy Inc.',
    accent: 'from-accent/20 to-transparent',
    delay: 0.1,
  },
  {
    icon: MapPin,
    label: 'Location',
    title: 'Slovenia / US',
    subtitle: 'Remote & On-site',
    accent: 'from-purple-500/20 to-transparent',
    delay: 0.15,
  },
  {
    icon: GraduationCap,
    label: 'Education',
    title: "Master's Degree",
    subtitle: 'International Relations',
    accent: 'from-emerald-500/20 to-transparent',
    delay: 0.2,
  },
  {
    icon: Code,
    label: 'Freelance',
    title: 'Web Developer',
    subtitle: 'Since 2022',
    accent: 'from-amber-500/20 to-transparent',
    delay: 0.25,
  },
];

const About = (): JSX.Element => {
  return (
    <section id="about" className="relative py-32 overflow-x-clip">
      {/* Not clipped vertically, so this one glow straddles the boundary with the hero. */}
      <div className="gradient-orb gradient-orb-accent w-[400px] h-[400px] hidden sm:block -top-[150px] -left-[150px] absolute" />
      <span className="hash-span">&nbsp;</span>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading label="Introduction" title="About Me." />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Bio - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 sm:p-8 col-span-2 md:row-span-2 relative overflow-hidden flex flex-col"
          >
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-accent/5 to-transparent rounded-bl-full" />

            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent text-lg font-mono tracking-wider uppercase">
                Who I Am
              </span>
            </div>

            <p className="text-secondary leading-relaxed text-[15px]">
              I&apos;m a full-stack web developer and product engineer, driven
              by curiosity since childhood — dismantling gadgets and breaking
              them.
            </p>
            <p className="text-secondary leading-relaxed text-[15px] mt-4">
              Before code I worked in diplomacy, which taught me to{' '}
              <span className="text-white-100 font-medium">
                listen first and explain clearly
              </span>
              . Now I care most about the{' '}
              <span className="text-white-100 font-medium">
                details people feel but rarely notice
              </span>
              : timing, motion, and the small transitions between screens.
            </p>

            <div className="mt-3 flex flex-1 flex-col">
              <CareerPath />
            </div>
          </motion.div>

          {/* Info cards */}
          {infoCards.map(card => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: card.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card glass-card-hover p-4 sm:p-6 flex flex-col justify-start sm:justify-between relative overflow-hidden group"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col items-start gap-2 mb-3 sm:flex-row sm:items-center sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-(--chip-bg) border border-(--card-border) flex items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors duration-300">
                  <card.icon size={18} className="text-accent" />
                </div>
                <p className="text-secondary text-xs sm:text-base font-mono tracking-wider uppercase">
                  {card.label}
                </p>
              </div>

              <div className="relative z-10">
                <p className="text-white-100 font-semibold text-sm sm:text-base">
                  {card.title}
                </p>
                <p className="text-secondary text-sm mt-0.5">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}

          {/* Tech Stack - spans full width */}
          <div className="col-span-2 md:col-span-4 py-10">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {TECH_STACK_DATA.map((tech, index) => (
                <motion.li
                  key={tech.name}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  className="border border-(--card-border) rounded-2xl px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 sm:min-w-[120px] justify-center text-[13px] sm:text-sm text-white-100 hover:border-accent/30 hover:bg-accent/5 transition-colors duration-300"
                >
                  {tech.icon} {tech.name}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Drone Shots - spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 md:col-span-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 mb-5"
            >
              <Clapperboard size={14} className="text-accent" />
              <span className="text-accent text-lg font-mono tracking-wider uppercase">
                Beyond Code
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-secondary leading-relaxed text-[15px] mb-6 max-w-2xl"
            >
              Away from the keyboard I&apos;m usually on a football pitch, in
              front of a screen for entirely different reasons, or someplace
              new. The drone is my excuse to slow down and look at a place twice
              — once on foot, once from above. A few favourites from those trips
              are below.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <AngledMediaSlider />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
