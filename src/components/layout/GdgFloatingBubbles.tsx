'use client';

import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

const GOOGLE_COLORS = [
  '#4285F4', // Blue
  '#EA4335', // Red
  '#FBBC04', // Yellow
  '#34A853', // Green
  '#DADCE0', // Soft Grey
];

export const GdgFloatingBubbles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate bubbles matching the Google dots visual reference
    const bubbleCount = Math.floor(Math.min(width, height) / 32);
    const bubbles: Bubble[] = [];

    // Pre-defined size clusters: few large ones, some medium, and many small ones
    for (let i = 0; i < bubbleCount; i++) {
      let radius: number;
      const sizeRand = Math.random();
      if (sizeRand < 0.15) {
        radius = Math.random() * 35 + 40; // 40px - 75px (large dots)
      } else if (sizeRand < 0.5) {
        radius = Math.random() * 18 + 18; // 18px - 36px (medium)
      } else {
        radius = Math.random() * 10 + 6;  // 6px - 16px (small dots)
      }

      const color = GOOGLE_COLORS[Math.floor(Math.random() * GOOGLE_COLORS.length)];
      const baseAlpha = color === '#DADCE0' ? 0.25 : radius > 40 ? 0.18 : 0.26;

      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() * -0.5) - 0.15, // gently drift upwards
        alpha: baseAlpha,
        targetAlpha: baseAlpha,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // Mouse interaction for subtle parallax push
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        // Update pulse
        b.pulseAngle += b.pulseSpeed;
        const currentRadius = b.radius + Math.sin(b.pulseAngle) * 2;

        // Mouse gentle repulsion
        const dx = b.x - mouseX;
        const dy = b.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          b.x += (dx / dist) * force * 1.5;
          b.y += (dy / dist) * force * 1.5;
        }

        // Move bubble
        b.x += b.vx;
        b.y += b.vy;

        // Wrap around edges smoothly
        if (b.x < -b.radius * 2) b.x = width + b.radius;
        if (b.x > width + b.radius * 2) b.x = -b.radius;
        if (b.y < -b.radius * 2) b.y = height + b.radius;
        if (b.y > height + b.radius * 2) b.y = -b.radius;

        // Draw bubble with smooth circular fill
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.radius > 30 ? 12 : 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 60%, #F1F3F4 100%)',
        }}
      />
      {/* Living GDG Floating Dots Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
