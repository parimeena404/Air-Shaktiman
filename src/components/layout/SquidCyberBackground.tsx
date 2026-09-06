'use client';

import React from 'react';

/**
 * Clean, minimal background for the GDG-themed layout.
 * Replaces the old SquidCyberBackground with a subtle decorative pattern.
 */
export const SquidCyberBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
        }}
      />

      {/* Decorative circles — Google colors, very subtle */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.04]"
        style={{ backgroundColor: '#4285F4' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-[0.04]"
        style={{ backgroundColor: '#34A853' }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-[0.03]"
        style={{ backgroundColor: '#FBBC04' }}
      />
    </div>
  );
};
