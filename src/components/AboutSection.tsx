import React from 'react';
import { motion } from 'motion/react';
import { FileText, UserPlus } from 'lucide-react';
import { SKILL_ITEMS } from '../data/portfolioData';
import { TechIcon } from './TechIcons';

export const AboutSection: React.FC = () => {
  const handleDownloadResume = () => {
    // Open resume or download
    const link = document.createElement('a');
    link.href = '/cv/shahnawazResume.pdf';
    link.download = 'Shahnawaz_Bheda_Resume.pdf';
    link.click();
  };

  const handleHireMe = () => {
    // Smooth scroll to contact or open email
    window.location.href = "mailto:shahnawazbheda@gmail.com?subject=Job%20Opportunity%20for%20Shahnawaz%20Bheda";
  };

  return (
    <section id="about" className="relative pt-10 pb-8 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto z-10">

      {/* 1. Know Who I'M Section (from Screenshot 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">

        {/* Left Column: Portrait Photo with Scroll Slide-In from Left */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-blue-500/40 shadow-[0_0_30px_rgba(37,99,235,0.3)] bg-[#0A0D14] group"
          >
            <img
              src="/shahnawaz-outdoor.jpg"
              alt="Shahnawaz Bheda - Front End Developer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Right Column: Heading, Bio, Action Buttons with Scroll Slide-In from Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
            Know Who{" "}
            <span className="text-blue-500 font-extrabold drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              I AM
            </span>
          </h2>

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans">
            <p>
              Hello, my name is{" "}
              <span className="text-blue-500 font-semibold">
                Shahnawaz Bheda
              </span>{" "}
              and I am a passionate{" "}
              <span className="text-blue-500 font-semibold">
                MERN Stack Developer
              </span>{" "}
              with 2 years of professional experience. Currently, I am working at{" "}
              <span className="text-blue-500 font-semibold">
                Technocomet Solutions
              </span>
              .
            </p>

            <p>
              I specialize in building scalable, responsive, and high-performance web
              applications using{" "}
              <span className="text-blue-500 font-semibold">
                MongoDB, Express.js, React.js, and Node.js
              </span>
              . I have hands-on experience developing both frontend and backend
              solutions, RESTful APIs, authentication systems, database management,
              and modern responsive user interfaces.
            </p>

            <p>
              My technical expertise also includes{" "}
              <span className="text-blue-500 font-semibold">
                Next.js, TypeScript, Redux Toolkit, Tailwind CSS, Bootstrap, JWT,
                Git, and GitHub
              </span>
              . I enjoy transforming ideas into clean, efficient, and user-friendly
              digital solutions while continuously learning and exploring modern web
              technologies.
            </p>
          </div>

          {/* Buttons: Resume & Hire Me */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* 2. Professional Skillset Section with Staggered Scroll Reveal */}
      <div className="mt-16 sm:mt-24 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
            Professional <span className="text-blue-500 font-extrabold drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Skillset</span>
          </h2>
        </motion.div>

        {/* 8 Skillset Cards Grid (2 rows x 4 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {SKILL_ITEMS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.1 + Math.floor(index / 4) * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative h-28 sm:h-36 rounded-xl sm:rounded-2xl bg-black border border-blue-500/50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_35px_rgba(59,130,246,0.75)] hover:border-blue-400 cursor-default"
            >
              {/* Inner blue glow accent on hover */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <TechIcon
                  name={skill.iconName}
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white group-hover:scale-110 transition-transform duration-300"
                  color={skill.iconName === 'nextjs' || skill.iconName === 'github' ? '#ffffff' : undefined}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};
