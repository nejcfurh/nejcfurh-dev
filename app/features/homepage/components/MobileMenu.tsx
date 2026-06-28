'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { JSX, useState } from 'react';
import Logo from '@/app/components/Logo';
import AnimatedDiv from '@/app/components/motion/AnimatedDiv';
import { navLinks } from '../constants';
import { socialLinks } from '../constants/socialLinks';
import MobileMenuCurve from './MobileMenuCurve';
import MobileNavLink from './MobileNavLink';

const EASE = [0.76, 0, 0.24, 1] as const;

const menuSlide = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease: EASE } },
  exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: EASE } },
};

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps): JSX.Element => {
  const [selectedIndicator, setSelectedIndicator] = useState('');

  return (
    <AnimatedDiv
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 z-150 h-dvh w-full overflow-visible bg-primary text-white-100 md:hidden"
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white-100 transition-colors hover:bg-(--chip-bg-hover)"
      >
        <X size={24} />
      </button>

      <div className="box-border flex h-full flex-col px-8 py-24">
        <div
          onMouseLeave={() => setSelectedIndicator('')}
          className="flex min-h-0 flex-1 flex-col items-center gap-3 text-center"
        >
          {/* Logo replaces the "Navigation" label */}
          <div className="flex shrink-0 justify-center">
            <Link
              href="/"
              onClick={onClose}
              aria-label="Home"
              className="inline-flex"
            >
              <Logo className="h-auto w-[130px]" />
            </Link>
          </div>

          <div className="h-px w-full shrink-0 bg-(--divider)" />

          {/* Nav links */}
          <nav
            className="flex min-h-0 flex-1 flex-col items-center justify-evenly"
            style={{
              fontSize: `clamp(1.75rem, calc((100vh - 16rem) / ${navLinks.length} * 0.55), 3rem)`,
            }}
          >
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.id}
                data={{ title: link.title, id: link.id, index }}
                isActive={selectedIndicator === link.id}
                setSelectedIndicator={setSelectedIndicator}
                onNavigate={onClose}
              />
            ))}
          </nav>

          <div className="h-px w-full shrink-0 bg-(--divider)" />

          {/* Social links — same set as the footer */}
          <div className="flex w-full shrink-0 items-center justify-center gap-3 pt-1">
            {socialLinks.map(social => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-transparent text-white-100 outline outline-(--outline-subtle) transition-all duration-300 hover:outline-offset-[3px] ${social.hoverClass}`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MobileMenuCurve />
    </AnimatedDiv>
  );
};

export default MobileMenu;
