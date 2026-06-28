'use client';

import { JSX, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { navLinks } from '../constants';
import Logo from '@/app/components/Logo';
import { MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/app/components/theme/ThemeToggle';
import MobileMenu from './MobileMenu';

const Navbar = (): JSX.Element => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggle ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [toggle]);

  const mobileMenu = (
    <AnimatePresence mode="wait">
      {toggle && (
        <>
          {/* Backdrop — dims the sliver of page left of the panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={() => setToggle(false)}
            className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <MobileMenu onClose={() => setToggle(false)} />
        </>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none"
    >
      <motion.div
        layout
        transition={{
          layout: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`pointer-events-auto flex items-center justify-between transition-[background-color,border-color,box-shadow] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'w-full bg-primary/85 backdrop-blur-xs border-b border-(--divider) py-4 px-6 sm:px-8 lg:px-12 ' +
              'md:w-auto md:max-w-[calc(100%-2rem)] md:mt-3 md:py-2 md:px-4 md:gap-8 ' +
              'md:rounded-full md:bg-primary/75 md:backdrop-blur-lg md:border-b-transparent ' +
              'md:shadow-[inset_0_0_0_1px_var(--divider),0_8px_32px_rgba(0,0,0,0.12)]'
            : 'w-full max-w-6xl py-4 px-6 sm:px-8 lg:px-12 bg-transparent border-b border-transparent'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <Logo className="w-[120px] h-auto" />
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <ul className="list-none hidden md:flex flex-row gap-8 items-center">
            {navLinks.map(link => {
              const isContact = link.id === 'contact';
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setActive(link.title)}
                    className={
                      isContact
                        ? 'inline-block bg-(--accent) text-white rounded-full py-1.5 px-4 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_var(--accent-glow)]'
                        : `text-sm transition-colors duration-300 ${
                            active === link.title
                              ? 'text-white-100'
                              : 'text-secondary hover:text-white-100'
                          }`
                    }
                  >
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <button
            className="md:hidden w-7 h-7 flex items-center justify-center cursor-pointer text-white-100"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </motion.div>

      {mounted && createPortal(mobileMenu, document.body)}
    </motion.nav>
  );
};

export default Navbar;
