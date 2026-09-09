import React from 'react';
import { Starfield } from './components/Starfield';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { ScrollProgressBar, ScrollToTopButton } from './components/ScrollAnimations';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-blue-600/30 selection:text-blue-200">
      {/* Scroll Progress Bar at the top edge */}
      <ScrollProgressBar />

      {/* Starfield Galaxy Background with Parallax Scroll */}
      <Starfield />

      {/* Top Navbar with Home, About, Project, Contact links */}
      <Navbar />

      {/* Main Sections matching the reference design */}
      <main className="relative z-10 w-full">
        {/* Hero, Bio, Convocation Photo, Find Me On */}
        <HeroSection />

        {/* Know Who I'M, Outdoor Photo, Resume/Hire, Professional Skillset */}
        <AboutSection />

        {/* My Recent Works, Project Showcase with Filter & Lightbox */}
        <ProjectsSection />

        {/* Contact Us: Direct Details, Availability, Interactive Form */}
        <ContactSection />
      </main>

      {/* Floating Scroll To Top button with progress ring */}
      <ScrollToTopButton />

      {/* Universal Footer */}
      <FooterSection />
    </div>
  );
}
