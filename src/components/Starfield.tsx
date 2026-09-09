import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Starfield: React.FC = () => {
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 2500], [0, -100]);
  const parallaxY2 = useTransform(scrollY, [0, 2500], [0, -180]);

  // Generate random stars once
  const { slowStars, fastStars } = useMemo(() => {
    const all = Array.from({ length: 95 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.2 ? 2.5 : Math.random() < 0.6 ? 1.5 : 1,
      opacity: Math.random() * 0.7 + 0.3,
      animationDuration: Math.random() * 4 + 2,
      animationDelay: Math.random() * 5,
      isFast: i % 3 === 0
    }));

    return {
      slowStars: all.filter((s) => !s.isFast),
      fastStars: all.filter((s) => s.isFast)
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Background Layer: Slow parallax drift */}
      <motion.div style={{ y: parallaxY1 }} className="absolute inset-0 w-full h-[120%]">
        {slowStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white transition-opacity"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: star.size > 2 ? '0 0 4px #ffffff, 0 0 8px #60a5fa' : 'none',
              animation: `twinkle ${star.animationDuration}s ease-in-out infinite ${star.animationDelay}s`
            }}
          />
        ))}
      </motion.div>

      {/* Foreground Layer: Faster parallax drift */}
      <motion.div style={{ y: parallaxY2 }} className="absolute inset-0 w-full h-[130%]">
        {fastStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-blue-100 transition-opacity"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * 0.85,
              boxShadow: '0 0 5px #3b82f6',
              animation: `twinkle ${star.animationDuration}s ease-in-out infinite ${star.animationDelay}s`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
