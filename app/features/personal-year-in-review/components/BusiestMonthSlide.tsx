'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import AnimatedText from '@/app/components/motion/AnimatedText';
import Image from 'next/image';

import busiestMonthBird from '@/public/images/projects/personal-year-in-review/slides/busiest-month-bird.png';

import type {
  YearInReviewDailyStats,
  YearInReviewMonthlyStats,
} from '../types/types';
import VisitsVerticalChart from './VisitsVerticalChart';

interface BusiestMonthSlideProps {
  dailyVisitStats: YearInReviewDailyStats;
  monthlyVisitStats: YearInReviewMonthlyStats;
}

const BusiestMonthSlide = ({
  dailyVisitStats,
  monthlyVisitStats,
}: BusiestMonthSlideProps): React.ReactNode => {
  // Helper function to get ordinal suffix for day
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';

    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Transform monthly visits data and filter out December
  const transformedMonthlyVisits = monthlyVisitStats.monthlyVisits
    .filter((monthlyVisit: { month: string }) => monthlyVisit.month.toUpperCase() !== 'DECEMBER')
    .map((monthlyVisit: { month: string; visitCount: number }) => ({
      month:
        monthlyVisit.month.toLowerCase().charAt(0).toUpperCase() +
        monthlyVisit.month.toLowerCase().slice(1),
      visits: monthlyVisit.visitCount,
    }));

  // Convert to a map for easier access
  const monthVisitsMap = transformedMonthlyVisits.reduce(
    (acc: Record<string, number>, monthData: { month: string; visits: number }) => {
      acc[monthData.month] = monthData.visits;

      return acc;
    },
    {} as Record<string, number>,
  );

  // Find the month with the highest visits
  const busiestMonthData = (Object.entries(monthVisitsMap) as [string, number][]).reduce(
    (max, [month, visits]) => {
      return visits > max.visits ? { month, visits } : max;
    },
    { month: '', visits: 0 },
  );

  const busiestMonth = busiestMonthData.month;
  const busiestMonthVisits = busiestMonthData.visits;

  // Extract busiest day data
  const busiestDayData = dailyVisitStats.topDays[0];
  const busiestDayDate = new Date(busiestDayData.date);
  const busiestDayMonth = busiestDayDate.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  const busiestDayDay = busiestDayDate.getUTCDate();
  const busiestDayOrdinal = getOrdinalSuffix(busiestDayDay);

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-around overflow-hidden bg-[#C8B9DA] px-4 py-16">
      <AnimatedDiv
        className="absolute left-[20%] top-[40%] w-1/3 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Image
          src={busiestMonthBird}
          alt="Busiest month"
          width={100}
          height={100}
        />
      </AnimatedDiv>

      {/* TITLE & TEXT DIV */}
      <div className="container mx-auto mt-6 flex h-full w-full flex-col items-center justify-center px-8 font-inter text-[#25212A]">
        <h3 className="my-4 flex flex-col items-center justify-center gap-5 text-center text-2xl">
          <AnimatedText
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Your busiest month was
          </AnimatedText>
          <AnimatedText
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mb-4 font-awesome-serif text-7xl"
          >
            {busiestMonth},
          </AnimatedText>
          <AnimatedText
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            with <span className="font-bold">{busiestMonthVisits}</span> visits.
          </AnimatedText>
        </h3>
      </div>
      {/* GRAPH DIV */}
      <VisitsVerticalChart monthlyVisits={transformedMonthlyVisits} />
      {/* BUSIEST DAY DIV */}
      <AnimatedDiv
        className="mb-2 mt-6 flex w-full flex-col items-center justify-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <AnimatedText
          className="mb-2 w-full rounded-2xl bg-[#9586A7] px-4 py-4 text-center font-inter text-lg font-light text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          Your busiest day was <br />
          <span className="font-bold">
            {busiestDayMonth} {busiestDayDay}
            {busiestDayOrdinal}
          </span>{' '}
          with{' '}
          <span className="font-bold">{busiestDayData.visitCount} visits</span>.
        </AnimatedText>
      </AnimatedDiv>
    </section>
  );
};

export default BusiestMonthSlide;
