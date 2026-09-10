import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { TYPEWRITER_ROLES, SOCIAL_ITEMS } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect matching "MERN Stack Developer . . |"
  useEffect(() => {
    const currentFullText = TYPEWRITER_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPEWRITER_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative pt-20 sm:pt-28 md:pt-36 pb-8 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto z-10">

      {/* Top Hero Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center min-h-0 sm:min-h-[480px]">

        {/* Left Column: Greeting, Name, Typewriter */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight">
              Hi There!
            </h2>
            <motion.span
              animate={{ rotate: [0, 18, -10, 18, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-2xl sm:text-3xl md:text-5xl inline-block origin-bottom-right select-none"
            >
              👋
            </motion.span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            I'M <span className="text-blue-500 font-extrabold drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Shahnawaz Bheda</span>
          </h1>

          {/* Typewriter text line */}
          <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500 flex items-center min-h-[36px] sm:min-h-[48px] tracking-wide">
            <span>{displayedText}</span>
            <span className="inline-block w-[2px] sm:w-[3px] h-6 sm:h-8 md:h-10 bg-blue-500 ml-1.5 sm:ml-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        {/* Right Column: Isometric Developer Illustration with float */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Soft blue glow backdrop */}
            <div className="absolute inset-4 rounded-3xl bg-blue-600/15 blur-3xl pointer-events-none" />

            <motion.img
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src="/developer-illustration.jpg"
              alt="MERN Stack Developer Isometric 3D Workspace"
              referrerPolicy="no-referrer"
              className="relative z-10 w-full h-full object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

      </div>

      {/* Middle Block: Introduction & Convocation Portrait */}
      <div className="mt-16 sm:mt-28 pt-10 sm:pt-16 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

        {/* Left Column: Bio Paragraphs with Staggered Scroll Reveal */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans font-normal">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Enthusiastic and dedicated Computer Science student with a specialization in full-stack web development, fervently pursuing opportunities to contribute to innovative projects utilizing the <span className="text-blue-500 font-semibold">MERN stack</span> — <span className="text-blue-500 font-semibold">MongoDB</span>, <span className="text-blue-500 font-semibold">Express.js</span>, <span className="text-blue-500 font-semibold">React.js</span>, and <span className="text-blue-500 font-semibold">Node.js</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            Proficient across the <span className="text-blue-500 font-semibold">MERN</span> ecosystem, I'm driven to build engaging, performant, end-to-end web applications. My comfort designing REST APIs with <span className="text-blue-500 font-semibold">Node.js</span> and <span className="text-blue-500 font-semibold">Express</span>, modeling data in <span className="text-blue-500 font-semibold">MongoDB</span>, and crafting seamless UIs with <span className="text-blue-500 font-semibold">React</span> lets me own a feature from database to browser.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            I am eager to apply and expand my expertise in the <span className="text-blue-500 font-semibold">MERN stack</span> within dynamic development teams, leveraging my full-stack skills to deliver immersive and impactful web experiences.
          </motion.p>
        </div>

        {/* Right Column: Convocation Portrait Photo with Scroll Reveal */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_35px_rgba(37,99,235,0.25)] bg-[#0A0D14] group"
          >
            <img
              src="/shahnawaz-convocation.jpg"
              alt="Shahnawaz Bheda - Academic Convocation"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* Bottom Block: FIND ME ON with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-16 sm:mt-24 md:mt-32 text-center flex flex-col items-center"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
          <span>FIND </span>
          <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">ME ON</span>
        </h3>

        <p className="mt-2 text-sm md:text-base text-white/80 font-normal">
          Feel free to <span className="text-blue-500 font-medium">connect</span> with me
        </p>

        {/* 4 White Circle Social Buttons with Staggered Scroll Pop-in */}
        <div className="mt-6 flex items-center justify-center gap-5">
          {SOCIAL_ITEMS.map((item, index) => {
            let Icon = Github;
            if (item.name === 'Twitter') Icon = Twitter;
            if (item.name === 'LinkedIn') Icon = Linkedin;
            if (item.name === 'Instagram') Icon = Instagram;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit Shahnawaz on ${item.name}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "backOut" }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};