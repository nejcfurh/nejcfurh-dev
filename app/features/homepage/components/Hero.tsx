'use client';

import { motion } from 'framer-motion';
import { JSX } from 'react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import { SlSocialLinkedin } from 'react-icons/sl';
import { TbBrandInstagram } from 'react-icons/tb';
import { useTheme } from '@/app/components/theme/ThemeProvider';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/nejcfurh',
    icon: <BsGithub />,
    hoverClass: 'hover:bg-[#3c3b3b]',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nejcfurh/',
    icon: <SlSocialLinkedin />,
    hoverClass: 'hover:bg-[#0077b5]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/nejcfurh/',
    icon: <TbBrandInstagram />,
    hoverClass:
      'hover:bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
  },
  {
    name: 'X',
    href: 'https://twitter.com/nejcfurh',
    icon: <BsTwitterX />,
    hoverClass: 'hover:bg-white hover:text-black',
  },
];

const firstName = 'NEJC';
const lastName = 'FURH';

const Hero = (): JSX.Element => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden mt-16 sm:mt-0"
    >
      {/* GRADIENT ORB */}
      <div className="gradient-orb gradient-orb-accent w-[400px] h-[400px] hidden sm:block -bottom-[150px] -left-[150px] absolute" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col lg:flex-row items-center lg:items-end lg:justify-between gap-12 lg:gap-8">
        {/* TEXT CONTENT */}
        <div className="flex-1 min-w-0">
          {/* LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-8 mt-16 sm:mt-0"
          >
            <span className="text-secondary text-sm font-mono tracking-[0.2em] uppercase">
              Product Engineer & Web Developer
            </span>
          </motion.div>

          {/* GIANT NAME */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(60px,12vw,180px)] font-bold leading-[0.85] tracking-tighter sm:ml-[-20px] text-white-100"
              aria-label="Nejc Furh"
            >
              {firstName.split('').map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 className="text-[clamp(60px,12vw,180px)] font-bold leading-[0.85] tracking-tighter text-gradient-accent sm:ml-[-20px]">
              {lastName.split('').map((char, i) => (
                <motion.span
                  key={`last-${i}`}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-secondary text-md sm:text-lg max-w-lg leading-relaxed"
          >
            Building polished digital experiences with React, Next.js & React
            Native. Currently at <span className="text-accent">Birdbuddy</span>.
          </motion.p>

          {/* SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 flex items-center gap-4"
          >
            {socialLinks.map(social => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`w-11 h-11 rounded-full outline outline-(--outline-subtle)  bg-transparent grid place-items-center text-white-100 cursor-pointer transition-all duration-300 hover:outline-offset-[3px] ${social.hoverClass}`}
              >
                {social.icon}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* PORTRAIT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0"
        >
          <div
            className={`relative w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] lg:w-[420px] lg:h-[560px] ${
              isDark
                ? ''
                : 'rounded-3xl overflow-hidden ring-1 ring-(--card-border) shadow-[0_30px_80px_-20px_rgba(10,10,10,0.25)]'
            }`}
            style={
              isDark
                ? {
                    maskImage:
                      'radial-gradient(ellipse 45% 50% at 50% 50%, black 40%, transparent 100%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 45% 50% at 50% 50%, black 40%, transparent 100%)',
                  }
                : undefined
            }
          >
            <Image
              src="/images/portrait.jpeg"
              alt="Nejc Furh"
              fill
              className="object-cover transition-all duration-700"
              priority
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary hover:text-white-100 transition-colors cursor-pointer"
      >
        <span className="text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={16} className="scroll-indicator" />
      </motion.a>
    </section>
  );
};

export default Hero;
