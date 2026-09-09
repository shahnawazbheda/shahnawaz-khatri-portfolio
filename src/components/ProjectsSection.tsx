import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  X, 
  ZoomIn, 
  Search, 
  Sparkles, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  Code2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All'];
    PROJECTS_DATA.forEach(p => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, []);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.category && project.category.toLowerCase().includes(query)) ||
        project.tech.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Modal navigation handlers
  const currentModalProject = selectedProjectIndex !== null ? PROJECTS_DATA[selectedProjectIndex] : null;

  const handleNextProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % PROJECTS_DATA.length);
    }
  };

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
    }
  };

  // Keyboard navigation for modal (Escape to close, arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectIndex === null) return;
      if (e.key === 'Escape') setSelectedProjectIndex(null);
      if (e.key === 'ArrowRight') handleNextProject();
      if (e.key === 'ArrowLeft') handlePrevProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectIndex]);

  // Tech pill badge color mapping
  const getTechBadgeClass = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes('next')) return 'bg-white/10 text-white border-white/20 hover:border-white/40';
    if (lower.includes('react')) return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50';
    if (lower.includes('tailwind')) return 'bg-sky-500/10 text-sky-300 border-sky-500/30 hover:border-sky-400/50';
    if (lower.includes('c#') || lower.includes('.net')) return 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-400/50';
    if (lower.includes('node') || lower.includes('mongo')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-400/50';
    if (lower.includes('bootstrap')) return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:border-indigo-400/50';
    return 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-400/40';
  };

  return (
    <section id="project" className="relative pt-24 pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Portfolio Showcase</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          My Recent <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">Works</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-normal"
        >
          Explore a curated selection of full-stack web platforms, healthcare systems, and client software engineered with <span className="text-blue-400 font-medium">Next.js</span>, <span className="text-blue-400 font-medium">React</span>, and modern architectures.
        </motion.p>
      </div>

      {/* Filter and Search Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 p-3 sm:p-4 rounded-2xl bg-[#0B0F19]/90 border border-blue-500/20 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] border border-blue-400'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${PROJECTS_DATA.length})`}
              </button>
            );
          })}
        </div>

        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, title, or keyword..."
              className="w-full pl-9 pr-8 py-1.5 bg-black/60 border border-white/10 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grid vs List View Buttons */}
          <div className="hidden sm:flex items-center bg-black/60 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active Filter Status Count */}
      <div className="flex items-center justify-between text-xs text-white/50 mb-6 px-1">
        <span>Showing <strong className="text-blue-400 font-semibold">{filteredProjects.length}</strong> of {PROJECTS_DATA.length} projects</span>
        {(searchQuery || activeCategory !== 'All') && (
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center rounded-2xl bg-[#090D16]/60 border border-dashed border-white/10 p-8">
          <Code2 className="w-12 h-12 text-blue-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">No projects found</h3>
          <p className="text-sm text-white/60 mt-1 max-w-sm mx-auto">
            No projects matched your search criteria. Try another keyword or reset filters.
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Projects Showcase Container: Grid or List Layout */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((proj, index) => {
            const originalIndex = PROJECTS_DATA.findIndex((p) => p.id === proj.id);
            return (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -7 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#090D18]/90 border border-blue-500/30 hover:border-blue-400/80 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.45)] transition-all duration-300"
              >
                {/* Window Frame Bar with macOS style decorative dots */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                    <span className="ml-2 text-[11px] font-mono text-white/40 truncate max-w-[140px]">
                      {proj.category || 'Web Application'}
                    </span>
                  </div>

                  {proj.demo ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Demo
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-blue-400/80">
                      Open Source
                    </span>
                  )}
                </div>

                {/* Screenshot Frame with Zoom & Hover Actions */}
                <div
                  onClick={() => setSelectedProjectIndex(originalIndex)}
                  className="relative w-full h-48 sm:h-52 bg-zinc-950 overflow-hidden cursor-pointer group/image"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover/image:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay with View Details & Zoom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600/90 text-white text-xs font-semibold shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      View Details
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <h3
                      onClick={() => setSelectedProjectIndex(originalIndex)}
                      className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 tracking-tight"
                    >
                      {proj.title}
                    </h3>

                    {/* Short Punchy Summary */}
                    <p className="mt-2 text-xs sm:text-[13px] text-white/70 line-clamp-2 leading-relaxed font-sans">
                      {proj.shortSummary || proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] px-2.5 py-0.5 rounded-md border font-mono transition-colors ${getTechBadgeClass(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors duration-200 cursor-pointer"
                        title="View Source on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>

                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-200 cursor-pointer"
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>

                    {/* Quick Details Trigger */}
                    <button
                      onClick={() => setSelectedProjectIndex(originalIndex)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Detailed List View Mode */
        <div className="space-y-4">
          {filteredProjects.map((proj, index) => {
            const originalIndex = PROJECTS_DATA.findIndex((p) => p.id === proj.id);
            return (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group p-4 sm:p-5 rounded-2xl bg-[#090D18]/90 border border-blue-500/30 hover:border-blue-400/80 flex flex-col md:flex-row items-center gap-5 transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)]"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedProjectIndex(originalIndex)}
                  className="w-full md:w-52 h-36 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 cursor-pointer relative group/thumb"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    <ZoomIn className="w-4 h-4 text-blue-400" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 w-full text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {proj.category || 'Project'}
                    </span>
                    {proj.demo && (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Live Demo
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => setSelectedProjectIndex(originalIndex)}
                    className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2 py-0.5 rounded border font-mono ${getTechBadgeClass(t)}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>

                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProjectIndex(originalIndex)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30 transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                    <span>Overview</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Interactive Case Study & Screenshot Lightbox Modal */}
      <AnimatePresence>
        {currentModalProject && selectedProjectIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto"
            onClick={() => setSelectedProjectIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full my-auto bg-[#0A0E1A] border border-blue-500/50 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.45)] flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-black/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Project {selectedProjectIndex + 1} of {PROJECTS_DATA.length}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white tracking-tight line-clamp-1">
                    {currentModalProject.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* Previous / Next Navigator */}
                  <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
                    <button
                      onClick={handlePrevProject}
                      aria-label="Previous project"
                      className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Previous Project (Left Arrow)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextProject}
                      aria-label="Next project"
                      className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Next Project (Right Arrow)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedProjectIndex(null)}
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Scrollable */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
                
                {/* Screenshot Visual Frame */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl relative group">
                  <img
                    src={currentModalProject.image}
                    alt={currentModalProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[50vh] object-contain mx-auto"
                  />
                  <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <a
                      href={currentModalProject.image}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 border border-white/20 text-white text-xs backdrop-blur-md hover:bg-black"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>Open Full Image</span>
                    </a>
                  </div>
                </div>

                {/* Tech Stack Breakdown */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-2 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Technologies & Frameworks</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentModalProject.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-3 py-1 rounded-lg border font-mono ${getTechBadgeClass(t)}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Project Description / Case Study */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Project Overview & Architecture</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm sm:text-base leading-relaxed text-white/90 font-sans">
                    {currentModalProject.description}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-5 sm:px-7 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between gap-4">
                <span className="text-xs text-white/40 hidden sm:inline">
                  Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">→</kbd> to browse projects
                </span>

                <div className="flex items-center gap-3 ml-auto">
                  <a
                    href={currentModalProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>

                  {currentModalProject.demo && (
                    <a
                      href={currentModalProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
