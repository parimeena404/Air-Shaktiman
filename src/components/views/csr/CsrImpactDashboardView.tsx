'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import { BarChart3, ShieldCheck, Award, Zap, Sprout, Heart, Users, Globe } from 'lucide-react';

export const CsrImpactDashboardView: React.FC = () => {
  const { csrCompanies } = useEco();
  const company = csrCompanies[0];

  const scoreMetrics = [
    { label: 'ENVIRONMENTAL IMPACT', percentage: 92, color: '#03E5B7' },
    { label: 'COMMUNITY PARTICIPATION', percentage: 84, color: '#FF007A' },
    { label: 'PROJECT COMPLETION', percentage: 96, color: '#FFC700' },
    { label: 'WASTE DIVERSION', percentage: 88, color: '#03E5B7' },
    { label: 'FOOD RESCUE', percentage: 72, color: '#FF007A' },
    { label: 'TRANSPARENCY & AUDIT', percentage: 95, color: '#03E5B7' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl p-6 space-y-2 shadow-2xl glow-teal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-black">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>CSR IMPACT INTELLIGENCE & AUDIT MATRIX</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest">IMPACT INTELLIGENCE</h1>
        <p className="text-xs text-slate-300 font-bold">
          Verified environmental metrics, carbon offsets, and citizen engagement analytics derived from funded CSR campaigns.
        </p>
      </div>

      {/* Large Impact Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#03E5B7] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">WASTE RECOVERED</span>
          <div className="text-lg font-black text-[#03E5B7]">12.8 TONNES</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#FF007A] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">MEALS RESCUED</span>
          <div className="text-lg font-black text-[#FF007A]">4,820 MEALS</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#03E5B7] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">WATER BODIES</span>
          <div className="text-lg font-black text-[#03E5B7]">18 CLEANED</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#FFC700] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">GREEN PROJECTS</span>
          <div className="text-lg font-black text-[#FFC700]">24 FUNDED</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">PEOPLE ENGAGED</span>
          <div className="text-lg font-black text-white">8,420 PLAYERS</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold">CAMPUSES</span>
          <div className="text-lg font-black text-white">18 ACTIVE</div>
        </div>
      </div>

      {/* 📊 CSR IMPACT SCORE STAT SCREEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Badge Card */}
        <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-xl p-6 flex flex-col justify-center items-center text-center space-y-3 glow-pink shadow-2xl">
          <span className="text-[10px] px-3 py-1 rounded bg-[#FF007A]/20 text-[#FF007A] font-black">
            OVERALL CSR RATING
          </span>
          <div className="text-5xl font-black text-[#FFC700]">942</div>
          <span className="text-xs text-slate-300 font-bold">SCORE // 1000 POINTS</span>
          <div className="text-[11px] px-3 py-1 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-black">
            🏆 TOP 1% CORPORATE LEADER
          </div>
        </div>

        {/* Detailed Breakdown Gauges */}
        <div className="md:col-span-2 bg-[#0D0F17] border border-[#1D2133] rounded-xl p-6 space-y-4 shadow-lg">
          <h3 className="text-xs font-black text-white tracking-wider uppercase">
            IMPACT SCORE CATEGORY BREAKDOWN
          </h3>

          <div className="space-y-3">
            {scoreMetrics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{item.label}</span>
                  <span style={{ color: item.color }}>{item.percentage}%</span>
                </div>
                <div className="w-full bg-[#07080E] h-2.5 rounded-full overflow-hidden border border-[#1D2133]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
