'use client';

import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import { motion } from 'motion/react';

interface VisitsVerticalChartProps {
  monthlyVisits: Array<{ month: string; visits: number }>;
}

const MONTH_ABBREVIATIONS: Record<string, string> = {
  January: 'JAN',
  February: 'FEB',
  March: 'MAR',
  April: 'APR',
  May: 'MAY',
  June: 'JUN',
  July: 'JUL',
  August: 'AUG',
  September: 'SEP',
  October: 'OCT',
  November: 'NOV',
  December: 'DEC',
};

const VisitsVerticalChart = ({
  monthlyVisits,
}: VisitsVerticalChartProps): React.ReactNode => {
  // Convert monthly visits to chart data
  const monthData = monthlyVisits.map(monthlyVisit => {
    return {
      name:
        MONTH_ABBREVIATIONS[monthlyVisit.month] ||
        monthlyVisit.month.substring(0, 3).toUpperCase(),
      visits: monthlyVisit.visits,
    };
  });

  // Find max visits for scaling
  const maxVisits = Math.max(...monthData.map(month => month.visits));

  return (
    <div className="pointer-events-none flex w-full flex-col items-center justify-center px-2">
      <AnimatedDiv
        className="mx-auto block w-full no-tap-highlight sm:mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* CHART CONTAINER */}
        <div className="relative flex justify-between gap-1">
          {monthData.map((month, index) => {
            const percentage =
              maxVisits > 0 ? (month.visits / maxVisits) * 100 : 0;

            return (
              <div
                key={month.name}
                className="flex flex-1 flex-col items-center"
              >
                {/* BAR WRAPPER */}
                <div className="relative flex h-52 w-full items-end border-b-2 border-[#C8B9DA]">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{
                      height: `${percentage}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full rounded-t-2xl bg-linear-to-t from-transparent to-[#4A4354]"
                  />
                </div>

                {/* MONTH LABEL */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08 + 0.5,
                  }}
                  className="mt-2 flex h-8 items-center justify-center"
                >
                  <span
                    className="rotate-180 font-inter text-[10px] font-normal text-[#4A4354] sm:text-xs"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}
                  >
                    {month.name}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </AnimatedDiv>
    </div>
  );
};

export default VisitsVerticalChart;
