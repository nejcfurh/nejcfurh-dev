'use client';

import { JSX, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { navLinks } from '../constants';
import Logo from '@/app/components/Logo';
import { MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/app/components/theme/ThemeToggle';

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

  const mobileMenu = (
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 min-h-dvh w-full bg-primary/85 backdrop-blur-sm z-100 flex flex-col items-center justify-center pt-20 pb-12"
        >
          <button
            className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center cursor-pointer text-white-100 rounded-full hover:bg-(--chip-bg-hover) transition-colors"
            onClick={() => setToggle(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <nav>
            <ul className="list-none flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.02 + i * 0.05,
                    duration: 0.25,
                    ease: 'easeOut',
                  }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`text-4xl font-light transition-colors duration-300 ${
                      active === link.title
                        ? 'text-white-100'
                        : 'text-secondary hover:text-white-100'
                    }`}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(false);
                    }}
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/85 backdrop-blur-xs border-b border-(--divider)'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
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

        {mounted && createPortal(mobileMenu, document.body)}
      </div>
    </motion.nav>
  );
};

export default Navbar;
