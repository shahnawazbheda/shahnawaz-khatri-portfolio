import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Monitor, Mail, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "experience", "project", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onSelectTab) {
      onSelectTab(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "project", label: "Project", icon: Monitor },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  const activeId = activeTab || currentSection;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-3.5 px-4 sm:px-6 md:px-16 ${isScrolled
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
        : 'bg-black/40 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Desktop Nav Links - centered, larger font */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-10 text-base lg:text-lg font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all cursor-pointer ${isActive
                  ? 'text-blue-400 font-bold'
                  : 'text-white hover:text-blue-400'
                  }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-400' : 'text-white'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-blue-400 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 bg-black/95 rounded-xl p-4 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-lg font-semibold transition-colors ${isActive
                  ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                  : 'text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-5 h-5 text-blue-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};