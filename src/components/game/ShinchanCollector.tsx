'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Recycle } from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const ShinchanCollector: React.FC = () => {
  const { addToast } = useEco();

  // Animation Sequence Phases:
  // 1. 'slideIn': Slowly glides in from left to the waste material sack in the center
  // 2. 'bendDown': Bends down to grab the sack handles
  // 3. 'heaveShoulder': Lifts and hoists the heavy sack up onto his right shoulder
  // 4. 'carrySlideOut': Slowly glides from center to the right with sack resting on shoulder
  // 5. 'depositSack': Tosses sack into the Eco Hub recycling bin with sparkle burst
  // 6. 'hidden': Brief pause before loop restarts from left
  const [phase, setPhase] = useState<
    'slideIn' | 'bendDown' | 'heaveShoulder' | 'carrySlideOut' | 'depositSack' | 'hidden'
  >('slideIn');

  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState('Indore Campus Cleanliness Patrol! ♻️');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === 'slideIn') {
      // Smooth slow stroll from left to center (takes 6.5s)
      timer = setTimeout(() => {
        setPhase('bendDown');
      }, 6500);
    } else if (phase === 'bendDown') {
      // Bends down to grab handles (takes 1.0s)
      timer = setTimeout(() => {
        setPhase('heaveShoulder');
        setShowSpeech(true);
        setSpeechText('Heaving onto shoulder! (+10 Pts) 💥');
      }, 1000);
    } else if (phase === 'heaveShoulder') {
      // Hoists sack onto shoulder (takes 1.2s)
      timer = setTimeout(() => {
        setShowSpeech(false);
        setPhase('carrySlideOut');
      }, 1200);
    } else if (phase === 'carrySlideOut') {
      // Slowly slides to right edge carrying sack on shoulder (takes 6.5s)
      timer = setTimeout(() => {
        setPhase('depositSack');
        setShowSpeech(true);
        setSpeechText('Recycled at Eco Hub! ✨♻️');
      }, 6500);
    } else if (phase === 'depositSack') {
      // Deposits sack into bin with sparkle effect (takes 1.5s)
      timer = setTimeout(() => {
        setShowSpeech(false);
        setPhase('hidden');
      }, 1500);
    } else if (phase === 'hidden') {
      // Waits 3.5 seconds before perpetually looping again from left!
      timer = setTimeout(() => {
        setPhase('slideIn');
      }, 3500);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  const handleShinchanClick = () => {
    setClickCount((prev) => prev + 1);
    setShowSpeech(true);
    const quotes = [
      'Ooh! Carrying heavy trash for Indore Campus is fun~ 🍑✨',
      'Action Kamen Eco-Power Activated! ⚡',
      'Squid Game Guard Shinchan on Duty! ⭕',
      'Heavy waste sack on my shoulder! (+10 Eco Points) ♻️',
    ];
    setSpeechText(quotes[clickCount % quotes.length]);
    addToast('🦹 Shinchan cleaned a campus waste spot! +10 Eco Points.', 'success');
    setTimeout(() => setShowSpeech(false), 3000);
  };

  // Whether the garbage bag in the center floor is still on the ground
  const isBagOnFloor = phase === 'slideIn' || phase === 'bendDown';
  // Whether Shinchan is carrying the sack on his shoulder
  const isCarryingOnShoulder = phase === 'heaveShoulder' || phase === 'carrySlideOut';

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-40 overflow-hidden">
      {/* Floor baseline guide */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#03E5B7]/30 to-transparent border-t border-[#03E5B7]/20" />

      {/* Center Floor Waste Material Sack (Visible before Shinchan hoists it) */}
      <AnimatePresence>
        {isBagOnFloor && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.2, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 18 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/40 mb-1 animate-pulse tracking-wider">
              WASTE MATERIAL
            </span>
            {/* Waste Material Sack SVG on Floor */}
            <svg width="48" height="46" viewBox="0 0 50 48" fill="none">
              <path
                d="M12 40C8 38 6 30 9 20C12 10 20 8 25 8C30 8 38 10 41 20C44 30 42 38 38 40C34 42 16 42 12 40Z"
                fill="#1E293B"
                stroke="#03E5B7"
                strokeWidth="2.5"
              />
              <path d="M22 8L20 2M28 8L30 2" stroke="#FF007A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="25" cy="8" r="3.5" fill="#FF007A" />
              {/* Recyclable Logo */}
              <circle cx="25" cy="24" r="8" fill="#03E5B7" fillOpacity="0.15" stroke="#03E5B7" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M25 19L27.5 23H22.5L25 19ZM21 26L23.5 29H18.5L21 26ZM29 26L31.5 29H26.5L29 26Z" fill="#03E5B7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-side Eco Recycling Hub Portal */}
      <div className="absolute bottom-2 right-4 flex items-center gap-1.5 opacity-90 pointer-events-auto">
        <div className="p-2.5 rounded-2xl bg-[#0D0F17] border border-[#03E5B7]/60 flex items-center gap-2 shadow-[0_0_20px_rgba(3,229,183,0.25)]">
          <Recycle className="w-5 h-5 text-[#03E5B7] animate-spin" style={{ animationDuration: '6s' }} />
          <div className="font-mono text-[10px] text-[#03E5B7] font-bold hidden sm:block">
            ECO HUB RECYCLING
          </div>
        </div>
      </div>

      {/* Shinchan Moving Container (Smooth slow sliding across screen) */}
      <motion.div
        key={phase === 'hidden' ? 'hidden-key' : 'active-key'}
        className="absolute bottom-2 pointer-events-auto cursor-pointer"
        initial={{ left: phase === 'hidden' ? '-140px' : '-140px' }}
        animate={{
          left:
            phase === 'slideIn'
              ? 'calc(50% - 62px)'
              : phase === 'bendDown' || phase === 'heaveShoulder'
              ? 'calc(50% - 62px)'
              : phase === 'carrySlideOut'
              ? 'calc(100% - 100px)'
              : phase === 'depositSack'
              ? 'calc(100% - 85px)'
              : 'calc(100% + 140px)',
        }}
        transition={{
          duration:
            phase === 'slideIn'
              ? 6.5
              : phase === 'carrySlideOut'
              ? 6.5
              : phase === 'depositSack'
              ? 1.5
              : 0.1,
          ease: 'linear',
        }}
        onClick={handleShinchanClick}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: -10 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-12 -left-12 bg-[#0D0F17]/95 border-2 border-[#FF007A] text-white text-[11px] font-bold font-mono px-3.5 py-1.5 rounded-2xl shadow-[0_0_20px_rgba(255,0,122,0.5)] whitespace-nowrap z-50 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#FFC700] animate-bounce" />
              <span>{speechText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Posture Container - Subtle smooth stride bobbing */}
        <motion.div
          animate={{
            y:
              phase === 'slideIn' || phase === 'carrySlideOut'
                ? [0, -2, 0, -2, 0]
                : phase === 'bendDown'
                ? [0, 8]
                : phase === 'heaveShoulder'
                ? [8, -3, 0]
                : 0,
            rotate:
              phase === 'slideIn'
                ? [-1, 1, -1, 1, -1]
                : phase === 'carrySlideOut'
                ? [1, 2.5, 1, 2.5, 1] // Forward lean with weight on shoulder
                : phase === 'bendDown'
                ? [0, 10]
                : 0,
          }}
          transition={{
            repeat: phase === 'slideIn' || phase === 'carrySlideOut' ? Infinity : 0,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="relative w-28 h-28 flex flex-col items-center"
        >
          {/* ============================================================ */}
          {/* SVG ARTWORK: AUTHENTIC SHINCHAN FACE IN SQUID GAME JUMPSUIT */}
          {/* ============================================================ */}
          <svg width="105" height="105" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ------------------------------------------------------------ */}
            {/* 1. HEAVY WASTE MATERIAL SACK ON SHOULDER */}
            {/* ------------------------------------------------------------ */}
            {isCarryingOnShoulder && (
              <g className="filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                {/* Sack Body resting over right shoulder & back */}
                <path
                  d="M62 48 C55 30 65 14 85 15 C102 16 112 30 108 50 C104 68 85 75 70 70 C60 66 58 56 62 48 Z"
                  fill="#1E293B"
                  stroke="#03E5B7"
                  strokeWidth="2.5"
                />
                {/* Tied Knot & Ribbon dangling over shoulder */}
                <path d="M60 48 L52 42 M60 52 L54 58" stroke="#FF007A" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="60" cy="50" r="3.5" fill="#FF007A" />
                {/* Recycling Emblem on Sack */}
                <circle cx="88" cy="42" r="7" fill="#03E5B7" fillOpacity="0.2" stroke="#03E5B7" strokeWidth="1.2" />
                <path d="M88 38L90 41H86L88 38ZM85 43L87 45H83L85 43ZM91 43L93 45H89L91 43Z" fill="#03E5B7" />
              </g>
            )}

            {/* ------------------------------------------------------------ */}
            {/* 2. SQUID GAME PINK HOODIE (Back layer framing head) */}
            {/* ------------------------------------------------------------ */}
            <circle cx="50" cy="45" r="32" fill="#FF007A" stroke="#1A1A24" strokeWidth="3" />

            {/* ------------------------------------------------------------ */}
            {/* 3. SHINCHAN'S AUTHENTIC FACE */}
            {/* ------------------------------------------------------------ */}
            {/* Shinchan Face Skin (Iconic curved potato/cheek shape) */}
            <path
              d="M24 45 C20 36 26 25 45 24 C64 23 76 34 76 46 C76 56 70 65 52 66 C32 67 25 58 24 45 Z"
              fill="#FDE047"
              fillOpacity="0.35"
              stroke="#1A1A24"
              strokeWidth="2.5"
            />
            {/* Shinchan Skin Tone Fill */}
            <path
              d="M26 44 C22 37 28 26 46 25 C63 24 74 34 74 46 C74 55 68 64 52 65 C33 66 27 57 26 44 Z"
              fill="#FAD2B8"
            />

            {/* Shinchan Black Hair fringe on top */}
            <path
              d="M32 28 C40 22 58 22 66 28 C64 26 56 24 46 25 C38 26 34 27 32 28 Z"
              fill="#1A1A24"
            />

            {/* Shinchan Iconic Thick Wavy Eyebrows */}
            {/* Left Eyebrow */}
            <path
              d="M30 32 C34 27 42 27 46 31"
              fill="none"
              stroke="#1A1A24"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Right Eyebrow */}
            <path
              d="M54 31 C58 27 66 27 70 32"
              fill="none"
              stroke="#1A1A24"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Shinchan Big Eyes with highlights */}
            {/* Left Eye */}
            <ellipse cx="38" cy="40" rx="4.5" ry="5.5" fill="#1A1A24" />
            <circle cx="39.5" cy="38.5" r="1.8" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="62" cy="40" rx="4.5" ry="5.5" fill="#1A1A24" />
            <circle cx="63.5" cy="38.5" r="1.8" fill="#FFFFFF" />

            {/* Cute Rosy Cheek Blushes */}
            <ellipse cx="29" cy="48" rx="3.5" ry="2" fill="#F43F5E" fillOpacity="0.6" />
            <ellipse cx="71" cy="48" rx="3.5" ry="2" fill="#F43F5E" fillOpacity="0.6" />

            {/* Shinchan Cute Mischievous Smile */}
            <path
              d="M44 51 C48 57 54 57 58 51"
              fill="#E11D48"
              stroke="#1A1A24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* ------------------------------------------------------------ */}
            {/* 4. SQUID GAME PINK JUMPSUIT BODY */}
            {/* ------------------------------------------------------------ */}
            <path
              d="M30 68 C24 68 20 74 22 88 C24 94 36 96 50 96 C64 96 76 94 78 88 C80 74 76 68 70 68 Z"
              fill="#FF007A"
              stroke="#1A1A24"
              strokeWidth="3"
            />

            {/* Black Zipper Line down center */}
            <rect x="47" y="68" width="6" height="24" fill="#1A1A24" />

            {/* Black Waist Belt */}
            <rect x="27" y="84" width="46" height="5" rx="2" fill="#1A1A24" />

            {/* Peplum Tunic Hem */}
            <path
              d="M26 88 C34 94 42 94 50 90 C58 94 66 94 74 88 C74 96 26 96 26 88 Z"
              fill="#FF007A"
              stroke="#1A1A24"
              strokeWidth="2.5"
            />

            {/* ------------------------------------------------------------ */}
            {/* 5. ARMS & BLACK GLOVES (Adaptive based on posture) */}
            {/* ------------------------------------------------------------ */}
            {/* LEFT ARM */}
            {phase === 'bendDown' ? (
              // Bending down - reaching down for handles
              <g>
                <path d="M30 72 L24 94" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                <circle cx="24" cy="96" r="6" fill="#1A1A24" />
              </g>
            ) : isCarryingOnShoulder ? (
              // Walking with shoulder carry - left arm swinging freely
              <g>
                <path d="M28 70 C18 74 14 82 16 90" fill="none" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                <circle cx="17" cy="92" r="6" fill="#1A1A24" />
                <ellipse cx="21" cy="86" rx="3" ry="4.5" fill="#FF007A" />
              </g>
            ) : (
              // Normal stroll - relaxed arms
              <g>
                <path d="M28 70 C18 66 12 56 10 50" fill="none" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                <circle cx="10" cy="48" r="6.5" fill="#1A1A24" />
                <ellipse cx="15" cy="54" rx="3" ry="5" fill="#FF007A" transform="rotate(-30 15 54)" />
              </g>
            )}

            {/* RIGHT ARM */}
            {phase === 'bendDown' ? (
              // Bending down - right arm reaching down
              <g>
                <path d="M70 72 L76 94" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                <circle cx="76" cy="96" r="6" fill="#1A1A24" />
              </g>
            ) : isCarryingOnShoulder ? (
              // SHOULDER CARRY: Right hand hooked up over right shoulder clutching sack knot!
              <g>
                <path d="M70 70 C80 64 78 50 64 46" fill="none" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                {/* Black Glove firmly clutching the sack neck */}
                <circle cx="62" cy="46" r="7" fill="#1A1A24" />
                <ellipse cx="68" cy="52" rx="3.5" ry="5" fill="#FF007A" transform="rotate(-25 68 52)" />
              </g>
            ) : (
              // Normal stroll - right arm swing
              <g>
                <path d="M72 70 C82 66 88 56 90 50" fill="none" stroke="#FF007A" strokeWidth="9" strokeLinecap="round" />
                <circle cx="90" cy="48" r="6.5" fill="#1A1A24" />
                <ellipse cx="85" cy="54" rx="3" ry="5" fill="#FF007A" transform="rotate(30 85 54)" />
              </g>
            )}

            {/* ------------------------------------------------------------ */}
            {/* 6. LEGS & BLACK SHOES */}
            {/* ------------------------------------------------------------ */}
            {/* Left Foot */}
            <g>
              <ellipse cx="38" cy="100" rx="7" ry="4" fill="#FF007A" stroke="#1A1A24" strokeWidth="2" />
              <ellipse cx="37" cy="105" rx="10" ry="5" fill="#1A1A24" />
              <ellipse cx="37" cy="108" rx="8" ry="1.8" fill="#FFFFFF" />
            </g>

            {/* Right Foot */}
            <g>
              <ellipse cx="62" cy="100" rx="7" ry="4" fill="#FF007A" stroke="#1A1A24" strokeWidth="2" />
              <ellipse cx="63" cy="105" rx="10" ry="5" fill="#1A1A24" />
              <ellipse cx="63" cy="108" rx="8" ry="1.8" fill="#FFFFFF" />
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
