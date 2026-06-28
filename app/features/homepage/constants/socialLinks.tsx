import { JSX } from 'react';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import { SlSocialLinkedin } from 'react-icons/sl';
import { TbBrandInstagram } from 'react-icons/tb';

export interface SocialLink {
  name: string;
  href: string;
  icon: JSX.Element;
  hoverClass: string;
}

export const socialLinks: SocialLink[] = [
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
