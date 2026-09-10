import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { SOCIAL_ITEMS } from '../data/portfolioData';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-md py-6 px-6 md:px-16 z-20 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm">
        
        {/* Left: Author Name */}
        <div className="font-medium tracking-wide">
          <span>Shahnawaz bheda</span>
        </div>

        
       

        {/* Right: Social Icons */}
        <div className="flex items-center gap-5">
          {SOCIAL_ITEMS.map((item) => {
            let Icon = Github;
            if (item.name === 'Twitter') Icon = Twitter;
            if (item.name === 'LinkedIn') Icon = Linkedin;
            if (item.name === 'Instagram') Icon = Instagram;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="text-white hover:text-blue-400 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
};
