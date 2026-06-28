'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../constants/socialLinks';

const Footer = (): JSX.Element => {
  return (
    <footer className="relative border-t border-(--divider) py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Left */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary text-sm"
          >
            &copy; {new Date().getFullYear()} Nejc Furh. All rights reserved.
          </motion.p>

          {/* Social links + scroll to top */}
          <div className="flex items-center gap-4">
            {socialLinks.map(social => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`w-11 h-11 rounded-full outline outline-(--outline-subtle) bg-transparent grid place-items-center text-white-100 cursor-pointer transition-all duration-300 hover:outline-offset-[3px] ${social.hoverClass}`}
              >
                {social.icon}
              </Link>
            ))}

            {/* Scroll to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-11 h-11 rounded-full outline outline-(--outline-subtle) bg-transparent grid place-items-center text-white-100 cursor-pointer transition-all duration-300 hover:outline-offset-[3px] hover:bg-accent ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
