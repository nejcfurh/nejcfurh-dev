"use client";

import { JSX } from "react";
import Navbar from "./features/homepage/components/Navbar";
import Hero from "./features/homepage/components/Hero";
import About from "./features/homepage/components/About";
import Experience from "./features/homepage/components/Experience";
import Projects from "./features/homepage/components/Projects";
import Contact from "./features/homepage/components/Contact";
import Footer from "./features/homepage/components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import GrainOverlay from "./components/GrainOverlay";
import { ReactLenis } from "lenis/react";

export default function Home(): JSX.Element {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <main className="relative bg-primary">
        <GrainOverlay />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
}
