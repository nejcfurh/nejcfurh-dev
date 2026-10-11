'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { JSX, useRef } from 'react';
import SectionHeading from '@/app/components/SectionHeading';
import {
  cardVariants,
  contentItem,
  listItem,
  staggerList,
} from '@/app/components/motion/cardContent';
import { experiences } from '../constants';

type ExperienceEntry = (typeof experiences)[number];

interface TimelineGroup {
  company: string;
  location: string;
  // Newest role first.
  entries: ExperienceEntry[];
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const RAIL_MASK =
  'linear-gradient(180deg, transparent 0%, #000 7%, #000 88%, transparent 100%)';
const RAIL_DRAW_SECONDS = 3;

const splitCompany = (companyName: string): { company: string; location: string } => {
  const separator = companyName.lastIndexOf(' - ');
  if (separator === -1) return { company: companyName, location: '' };
  return {
    company: companyName.slice(0, separator),
    location: companyName.slice(separator + 3),
  };
};

// Consecutive roles at the same company collapse into one card, newest first.
const buildGroups = (): TimelineGroup[] =>
  [...experiences].reverse().reduce<TimelineGroup[]>((groups, entry) => {
    const last = groups[groups.length - 1];
    if (last && last.entries[0].company_name === entry.company_name) {
      last.entries.push(entry);
      return groups;
    }
    return [...groups, { ...splitCompany(entry.company_name), entries: [entry] }];
  }, []);

const yearOf = (part: string): string =>
  part.trim() === 'Present' ? 'Now' : (part.trim().split(' ').pop() ?? '');

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const monthIndex = (part: string): number => {
  const [month, year] = part.trim().split(' ');
  return Number(year) * 12 + MONTHS.indexOf(month);
};

const formatDuration = (months: number): string => {
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yrs ${rest} mos` : `${years} yrs`;
};

const groupSpan = (group: TimelineGroup): { years: string; note: string } => {
  const newest = group.entries[0].date.split(' - ');
  const oldest = group.entries[group.entries.length - 1].date.split(' - ');
  const from = yearOf(oldest[0]);
  const to = yearOf(newest[1]);
  const years = from === to ? from : `${from} – ${to}`;

  if (group.entries.length > 1) return { years, note: `${group.entries.length} roles` };
  // An open-ended role would need today's date, which differs between the build and the visit.
  if (newest[1].trim() === 'Present') return { years, note: 'Ongoing' };
  return { years, note: formatDuration(monthIndex(newest[1]) - monthIndex(oldest[0])) };
};

const formatDates = (date: string): string => date.replace(' - ', ' – ');

const CompanyLogo = ({ entry }: { entry: ExperienceEntry }): JSX.Element => {
  if ('logoFill' in entry && entry.logoFill) {
    return (
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
        <Image src={entry.icon} alt={splitCompany(entry.company_name).company} fill sizes="56px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
      <div className="relative size-10">
        <Image src={entry.icon} alt={splitCompany(entry.company_name).company} fill sizes="40px" className="object-contain" />
      </div>
    </div>
  );
};

const Bullets = ({ points }: { points: string[] }): JSX.Element => (
  <motion.ul variants={staggerList} className="mt-3 space-y-2">
    {points.map(point => (
      <motion.li
        key={point}
        variants={listItem}
        className="flex gap-3 text-[15px] leading-relaxed text-secondary"
      >
        <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
        <span>{point}</span>
      </motion.li>
    ))}
  </motion.ul>
);

const MultiRoleCard = ({ group }: { group: TimelineGroup }): JSX.Element => (
  <article className="flex flex-col gap-7 rounded-[23px] bg-tertiary p-6 sm:p-8">
    <motion.header variants={contentItem} className="flex items-center gap-4">
      <CompanyLogo entry={group.entries[0]} />
      <div>
        <h3 className="text-xl font-semibold text-white-100">{group.company}</h3>
        <p className="mt-1 text-sm text-accent">{group.location}</p>
      </div>
    </motion.header>

    <div className="relative flex flex-col gap-7 pl-7">
      <div aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-accent/35" />
      {group.entries.map(entry => {
        const isCurrent = entry.date.endsWith('Present');
        return (
          <motion.div key={entry.title} variants={contentItem} className="relative">
            <span
              aria-hidden="true"
              className={
                isCurrent
                  ? 'absolute -left-7 top-1.5 size-[11px] rounded-full bg-accent'
                  : 'absolute -left-[26px] top-[7px] size-[7px] rounded-full border border-accent bg-tertiary'
              }
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-center gap-2.5">
                <h4 className={`font-semibold text-white-100 ${isCurrent ? 'text-lg' : 'text-[17px]'}`}>
                  {entry.title}
                </h4>
                {isCurrent && (
                  <span className="rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent-light">
                    Now
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-secondary">{formatDates(entry.date)}</span>
            </div>
            <Bullets points={entry.points} />
          </motion.div>
        );
      })}
    </div>
  </article>
);

const SingleRoleCard = ({ entry }: { entry: ExperienceEntry }): JSX.Element => (
  <article className="flex flex-col gap-5 rounded-3xl border border-(--card-border) bg-tertiary p-6 sm:p-8">
    <motion.header variants={contentItem} className="flex items-center gap-4">
      <CompanyLogo entry={entry} />
      <div className="flex grow flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h3 className="text-lg font-semibold text-white-100">{entry.title}</h3>
          <p className="mt-1 text-sm text-accent">{entry.company_name}</p>
        </div>
        <span className="text-sm font-medium text-secondary">{formatDates(entry.date)}</span>
      </div>
    </motion.header>
    <Bullets points={entry.points} />
  </article>
);

const Experience = (): JSX.Element => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const groups = buildGroups();

  // The rail draws itself once, top to bottom, when the timeline first comes into view.
  const hasEnteredView = useInView(timelineRef, { once: true, margin: '-20% 0px' });

  return (
    <section id="experience" className="relative overflow-x-clip py-32">
      {/* Not clipped vertically, so this one glow straddles the boundary with About. */}
      <div className="pointer-events-none absolute inset-0 overflow-x-clip">
        <div className="gradient-orb gradient-orb-accent absolute -right-[150px] -top-[150px] h-[400px] w-[400px]" />
      </div>
      <span className="hash-span">&nbsp;</span>

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <SectionHeading label="My Career" title="Work Experience." />

        <div ref={timelineRef} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -left-[33px] -top-6 w-20 md:left-[168px]"
            style={{ maskImage: RAIL_MASK, WebkitMaskImage: RAIL_MASK }}
          >
            <div className="absolute inset-y-0 left-[39.5px] w-px bg-(--divider)" />
            <motion.div
              className="absolute inset-y-0 left-[38.5px] w-[3px] origin-top rounded-full bg-linear-to-b from-accent-light via-accent via-60% to-accent/25"
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={hasEnteredView ? { scaleY: 1 } : undefined}
              transition={{ duration: RAIL_DRAW_SECONDS, ease: 'easeInOut' }}
            />
            {!reduceMotion && (
              <motion.div
                className="absolute left-8 -mt-2 size-4 rounded-full bg-[#cfe0f5] shadow-[0_0_10px_3px_rgba(207,224,245,0.7),0_0_26px_10px_rgba(138,174,214,0.45)]"
                initial={{ top: '0%', opacity: 0 }}
                animate={hasEnteredView ? { top: '100%', opacity: [0, 1, 1, 0] } : undefined}
                transition={{
                  top: { duration: RAIL_DRAW_SECONDS, ease: 'easeInOut' },
                  opacity: { duration: RAIL_DRAW_SECONDS, times: [0, 0.05, 0.9, 1] },
                }}
              />
            )}
          </div>

          <ol className="relative flex flex-col gap-8">
          {groups.map((group, index) => {
            const span = groupSpan(group);
            const isCurrent = index === 0;
            const isMultiRole = group.entries.length > 1;

            return (
              <li
                key={group.company}
                className="relative grid pl-8 md:grid-cols-[184px_48px_minmax(0,1fr)] md:pl-0"
              >
                <motion.div
                  className="hidden pt-7 md:block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  <p className="text-[17px] font-semibold tracking-tight text-white-100">{span.years}</p>
                  <p className="mt-1 text-sm text-secondary">{span.note}</p>
                </motion.div>
                <div className="hidden md:block" />

                <motion.span
                  aria-hidden="true"
                  className={`absolute top-[30px] rounded-full ${
                    isCurrent
                      ? 'left-px size-[13px] bg-accent shadow-[0_0_0_5px_rgba(96,134,190,0.18)] md:left-[201.5px]'
                      : `left-[2px] size-[11px] border-2 bg-primary md:left-[202.5px] ${index === 1 ? 'border-accent' : 'border-(--outline-subtle)'}`
                  }`}
                  // Not scale 0: a zero-size element never reports entering the viewport.
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: [0.4, 1.5, 1], opacity: 1 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                />

                <motion.div
                  variants={cardVariants({ delay: 0.1, from: { x: 48 }, duration: 0.7 })}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px 0px' }}
                >
                  <motion.p variants={contentItem} className="mb-3 text-sm text-secondary md:hidden">
                    <span className="font-semibold text-white-100">{span.years}</span> · {span.note}
                  </motion.p>
                  {isMultiRole ? (
                    <motion.div
                      className="rounded-3xl p-px"
                      style={{
                        backgroundImage:
                          'linear-gradient(110deg, var(--card-border) 30%, rgba(138,174,214,0.85) 50%, var(--card-border) 70%)',
                        backgroundSize: '250% 100%',
                      }}
                      animate={reduceMotion ? undefined : { backgroundPosition: ['120% 0%', '-120% 0%'] }}
                      transition={{ duration: 3.5, ease: 'linear', repeat: Infinity }}
                    >
                      <MultiRoleCard group={group} />
                    </motion.div>
                  ) : (
                    <SingleRoleCard entry={group.entries[0]} />
                  )}
                </motion.div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
