'use client';

import React from 'react';
import { GitMerge, ArrowDown, ArrowRight, ShieldCheck, Recycle, ShoppingBag, Hammer } from 'lucide-react';

export const MaterialFlowView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <GitMerge className="w-3.5 h-3.5" />
          <span>CIRCULAR MATERIAL MASS BALANCE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Material Flow Visualization</h1>
        <p className="text-xs text-slate-400">
          Visual trace showing how campus waste flows from initial discovery to reuse, sale, & recycling.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-8 space-y-8 text-center squid-grid-bg">
        {/* Node 1: Waste Generated */}
        <div className="max-w-xs mx-auto p-4 rounded-2xl bg-[#07080E] border border-slate-700 text-xs space-y-1 shadow-lg">
          <div className="font-mono text-slate-400 text-[10px]">STAGE 1: GENERATED</div>
          <div className="font-bold text-white text-base">WASTE GENERATED</div>
          <div className="font-mono text-[#FF007A] font-extrabold">428 kg Total Campus Scrap</div>
        </div>

        <ArrowDown className="w-6 h-6 text-[#FF007A] mx-auto animate-bounce" />

        {/* Node 2: Reported & AI Classified */}
        <div className="max-w-xs mx-auto p-4 rounded-2xl bg-[#07080E] border border-[#FF007A]/50 text-xs space-y-1 shadow-lg">
          <div className="font-mono text-slate-400 text-[10px]">STAGE 2: AI RECOGNITION</div>
          <div className="font-bold text-white text-base">REPORTED & AI CLASSIFIED</div>
          <div className="font-mono text-[#03E5B7] font-bold">98.4% Neural Vision Accuracy</div>
        </div>

        <ArrowDown className="w-6 h-6 text-[#03E5B7] mx-auto animate-bounce" />

        {/* Node 3: Verified */}
        <div className="max-w-xs mx-auto p-4 rounded-2xl bg-[#07080E] border border-[#03E5B7]/50 text-xs space-y-1 shadow-lg">
          <div className="font-mono text-slate-400 text-[10px]">STAGE 3: VERIFICATION</div>
          <div className="font-bold text-white text-base">FRONT MAN VERIFIED</div>
          <div className="font-mono text-[#FFC700] font-bold">Points Awarded to Players</div>
        </div>

        <ArrowDown className="w-6 h-6 text-[#FFC700] mx-auto" />

        {/* 3 Split Output Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Output 1: Reuse */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#A855F7]/15 to-transparent border border-[#A855F7]/40 space-y-2">
            <Hammer className="w-6 h-6 text-[#A855F7] mx-auto" />
            <div className="font-bold text-white font-mono">REUSE (BUILD)</div>
            <div className="text-xl font-extrabold text-[#A855F7] font-mono">184 kg</div>
            <div className="text-[10px] text-slate-400">DIY Hydroponics & Art</div>
          </div>

          {/* Output 2: Sell */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#FF007A]/15 to-transparent border border-[#FF007A]/40 space-y-2">
            <ShoppingBag className="w-6 h-6 text-[#FF007A] mx-auto" />
            <div className="font-bold text-white font-mono">SELL (B2B)</div>
            <div className="text-xl font-extrabold text-[#FF007A] font-mono">84 kg</div>
            <div className="text-[10px] text-slate-400">ABC & Corporate Buyers</div>
          </div>

          {/* Output 3: Recycle */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#03E5B7]/15 to-transparent border border-[#03E5B7]/40 space-y-2">
            <Recycle className="w-6 h-6 text-[#03E5B7] mx-auto" />
            <div className="font-bold text-white font-mono">RECYCLE</div>
            <div className="text-xl font-extrabold text-[#03E5B7] font-mono">127 kg</div>
            <div className="text-[10px] text-slate-400">CPCB Certified Recyclers</div>
          </div>

          {/* Output 4: Residual */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-800 to-transparent border border-slate-700 space-y-2">
            <div className="font-bold text-white font-mono pt-2">REMAINING</div>
            <div className="text-xl font-extrabold text-slate-400 font-mono">33 kg</div>
            <div className="text-[10px] text-slate-500">In Sorting Queue</div>
          </div>
        </div>
      </div>
    </div>
  );
};
