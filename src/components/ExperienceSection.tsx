import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, Building2, Clock, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: string; // "Full-time", "Internship", etc.
  mode: string; // "On-site", "Remote", "Hybrid"
  startDate: string;
  endDate: string;
  duration: string;
  isCurrent: boolean;
  bullets: string[];
  logo?: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "MERN Stack Developer",
    company: "TechnoComet Solutions",
    companyUrl: "https://technocometsolutions.com",
    location: "Rajkot, Gujarat, India",
    type: "Full-time",
    mode: "On-site",
    startDate: "Jul 2024",
    endDate: "Present",
    duration: "2 yrs 3 mo",
    isCurrent: true,
    bullets: [
      "Designed and developed scalable full-stack applications using React.js, Node.js, and related technologies.",
      "Worked on real-world projects, collaborating with cross-functional teams to deliver high-quality solutions.",
      "Contributed to performance optimization, feature development and ongoing maintenance."
    ],
    logo: "/technocomet-logo.png"
  },
  {
    id: 2,
    role: "Internship",
    company: "TechnoComet Solutions",
    companyUrl: "https://technocometsolutions.com",
    location: "Rajkot, Gujarat, India",
    type: "Internship",
    mode: "On-site",
    startDate: "Jul 2023",
    endDate: "Jul 2024",
    duration: "1 yr 1 mo",
    isCurrent: false,
    bullets: [
      "Developed reusable UI components and integrated REST APIs.",
      "Gained practical experience in frontend and backend development."
    ],
    logo: "/technocomet-logo.png"
  }
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative pt-10 pb-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
      >
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4"
        >
          <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Career Timeline
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white mt-2 sm:mt-3">
          My Professional{" "}
          <span className="text-blue-500 font-extrabold italic drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Journey
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/60 max-w-2xl mx-auto">
          Learning &nbsp;•&nbsp; Building &nbsp;•&nbsp; Growing
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">

        {/* Vertical Line — on mobile: left-aligned with smaller offset; on desktop: centered */}
        <div className="absolute left-[18px] sm:left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/60 via-blue-500/30 to-transparent" />

        {EXPERIENCE_DATA.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row items-start mb-10 sm:mb-14 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
          >

            {/* Timeline Node — mobile: smaller & left-aligned; desktop: centered */}
            <div className="absolute left-[18px] sm:left-[28px] md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              {/* Status Badge */}
              <span
                className={`px-2 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1.5 sm:mb-2 whitespace-nowrap ${exp.isCurrent
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-white/10 text-white/60 border border-white/20'
                  }`}
              >
                {exp.isCurrent ? 'Present' : 'Past'}
              </span>

              {/* Dot */}
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${exp.isCurrent
                  ? 'bg-blue-500 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]'
                  : 'bg-white/20 border-white/40'
                }`} />
            </div>

            {/* Date Info — only visible on desktop, on opposite side of card */}
            <div
              className={`hidden md:flex flex-col w-1/2 ${index % 2 === 0 ? 'pr-14 text-right items-end' : 'pl-14 text-left items-start'
                }`}
            >
              <div className="mt-8">
                <p className="text-sm font-semibold text-white/90">
                  {exp.startDate} – {exp.endDate}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{exp.duration}</p>
              </div>
            </div>

            {/* Card — mobile: offset from timeline line; desktop: half width */}
            <div
              className={`ml-11 sm:ml-16 md:ml-0 w-[calc(100%-2.75rem)] sm:w-[calc(100%-4rem)] md:w-1/2 ${index % 2 === 0 ? 'md:pl-14' : 'md:pr-14'
                }`}
            >
              <div className="group relative rounded-xl sm:rounded-2xl bg-[#0B0F19]/90 border border-blue-500/20 hover:border-blue-400/50 p-4 sm:p-5 md:p-6 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)] backdrop-blur-md">

                {/* Card Header */}
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Logo */}
                  {exp.logo && (
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                      {exp.role}
                    </h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-semibold transition-colors"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <p className="text-blue-400 text-xs sm:text-sm font-semibold">{exp.company}</p>
                    )}
                  </div>
                </div>

                {/* Meta Info Row — wraps gracefully on small screens */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3 mt-2.5 sm:mt-3 text-[11px] sm:text-xs text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{exp.location}</span>
                  </span>
                  <span className="text-white/20 hidden xs:inline">|</span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-3 h-3 shrink-0" /> {exp.type}
                  </span>
                  <span className="text-white/20 hidden xs:inline">|</span>
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3 h-3 shrink-0" /> {exp.mode}
                  </span>
                </div>

                {/* Mobile Date — shown only on mobile/tablet */}
                <div className="md:hidden flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 shrink-0" /> {exp.startDate} – {exp.endDate}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 shrink-0" /> {exp.duration}
                  </span>
                </div>

                {/* Divider */}
                <div className="mt-3 sm:mt-4 mb-3 sm:mb-4 border-t border-white/10" />

                {/* Bullets */}
                <ul className="space-y-2 sm:space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 shrink-0 rounded-full bg-blue-500/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto px-2"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-bold italic text-white/20 tracking-tight font-serif text-center sm:text-left">
          Every Experience<br />Matters
        </p>
        <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-3 sm:mt-0">
          Build • Learn • Improve • Repeat
        </p>
      </motion.div>

    </section>
  );
};
