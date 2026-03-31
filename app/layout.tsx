import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const awesomeSerif = localFont({
  variable: '--font-awesome-serif',
  src: [
    {
      path: '../public/fonts/awesome-serif-var-tf.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/awesome-serif-italic-var-vf.ttf',
      weight: '300',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Nejc Furh | Product Engineer & Web Developer',
  description:
    'Portfolio of Nejc Furh — Product Engineer at Birdbuddy, full-stack web developer specializing in React, Next.js, and modern web technologies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${awesomeSerif.variable} ${inter.variable} font-sans antialiased bg-primary text-white-100`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
