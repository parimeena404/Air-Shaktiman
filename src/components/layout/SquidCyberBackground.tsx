'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SquidCyberBackground: React.FC = () => {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Generate 24 columns for falling digital matrix stream
    setColumns(Array.from({ length: 24 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Ambient Hooded Hacker Background Image with balanced brightness */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-22 mix-blend-screen filter brightness-110 contrast-125 saturate-140 transition-all duration-700"
        style={{
          backgroundImage: 'url(/cyber-hacker-bg.jpg)',
        }}
      />

      {/* 2. Deep Cyber Vignette / Soft Radial Darkening */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07080E]/50 to-[#07080E]/85" />

      {/* 3. Falling Matrix Digital Binary Streams (0s and 1s) */}
      <div className="absolute inset-0 overflow-hidden opacity-25">
        {columns.map((col) => {
          const leftPercent = (col / columns.length) * 100 + Math.random() * 2;
          const duration = 8 + Math.random() * 12;
          const delay = Math.random() * 8;
          const chars = ['0', '1', '1', '0', '0', '1', '1', '0', '⭕', '△', '▢'];

          return (
            <motion.div
              key={col}
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: '110vh', opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                top: 0,
                fontSize: '11px',
                fontFamily: 'monospace',
                color: col % 3 === 0 ? '#FF007A' : col % 3 === 1 ? '#03E5B7' : '#FFC700',
                textShadow: '0 0 8px currentColor',
                lineHeight: '1.4',
              }}
            >
              {chars.map((ch, idx) => (
                <div key={idx} style={{ opacity: 0.3 + (idx / chars.length) * 0.7 }}>
                  {ch}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* 4. Ambient Floating Squid Game Neon Glyphs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-[10%] text-6xl text-[#FF007A] font-bold font-mono opacity-20 filter drop-shadow-[0_0_20px_#FF007A]"
      >
        ⭕
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-40 right-[8%] text-6xl text-[#03E5B7] font-bold font-mono opacity-20 filter drop-shadow-[0_0_20px_#03E5B7]"
      >
        △
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/2 right-[25%] text-6xl text-[#FFC700] font-bold font-mono opacity-15 filter drop-shadow-[0_0_20px_#FFC700]"
      >
        ▢
      </motion.div>

      {/* 5. Cyber Scanline Grid Overlay */}
      <div className="absolute inset-0 scanline-overlay opacity-30" />
    </div>
  );
};
