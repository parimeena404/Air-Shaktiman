'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import { BarChart3, ShieldCheck, Award, Zap, Sprout, Heart, Users, Globe } from 'lucide-react';

export const CsrImpactDashboardView: React.FC = () => {
  const { csrCompanies } = useEco();
  const company = csrCompanies[0];

  const scoreMetrics = [
    { label: 'ENVIRONMENTAL IMPACT', percentage: 92, color: '#00FF66' },
    { label: 'COMMUNITY PARTICIPATION', percentage: 84, color: '#A855F7' },
    { label: 'PROJECT COMPLETION', percentage: 96, color: '#00F0FF' },
    { label: 'WASTE DIVERSION', percentage: 88, color: '#F5C518' },
    { label: 'FOOD RESCUE', percentage: 72, color: '#00FF66' },
    { label: 'TRANSPARENCY & AUDIT', percentage: 95, color: '#A855F7' },
  ];

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#09120D] border border-[#00F0FF]/40 rounded-lg p-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>CSR IMPACT INTELLIGENCE & AUDIT MATRIX</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-widest">IMPACT INTELLIGENCE</h1>
        <p className="text-xs text-[#527A67]">
          Verified environmental metrics, carbon offsets, and citizen engagement analytics derived from funded CSR campaigns.
        </p>
      </div>

      {/* Large Impact Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-4 rounded bg-[#09120D] border border-[#00FF66]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">WASTE RECOVERED</span>
          <div className="text-lg font-black text-[#00FF66]">12.8 TONNES</div>
        </div>
        <div className="p-4 rounded bg-[#09120D] border border-[#A855F7]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">MEALS RESCUED</span>
          <div className="text-lg font-black text-[#A855F7]">4,820 MEALS</div>
        </div>
        <div className="p-4 rounded bg-[#09120D] border border-[#00F0FF]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">WATER BODIES</span>
          <div className="text-lg font-black text-[#00F0FF]">18 CLEANED</div>
        </div>
        <div className="p-4 rounded bg-[#09120D] border border-[#F5C518]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">GREEN PROJECTS</span>
          <div className="text-lg font-black text-[#F5C518]">24 FUNDED</div>
        </div>
        <div className="p-4 rounded bg-[#09120D] border border-[#00FF66]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">PEOPLE ENGAGED</span>
          <div className="text-lg font-black text-white">8,420 PLAYERS</div>
        </div>
        <div className="p-4 rounded bg-[#09120D] border border-[#A855F7]/40 space-y-1">
          <span className="text-[10px] text-[#527A67]">CAMPUSES</span>
          <div className="text-lg font-black text-white">18 PARTICIPATING</div>
        </div>
      </div>

      {/* 📊 CSR IMPACT SCORE STAT SCREEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Badge Card */}
        <div className="bg-[#09120D] border-2 border-[#A855F7] rounded-lg p-6 flex flex-col justify-center items-center text-center space-y-3 glow-pink">
          <span className="text-[10px] px-3 py-1 rounded bg-[#A855F7]/20 text-[#A855F7] font-bold">
            OVERALL CSR RATING
          </span>
          <div className="text-5xl font-black text-[#F5C518]">942</div>
          <span className="text-xs text-[#527A67] font-bold">SCORE // 1000 POINTS</span>
          <div className="text-[11px] px-3 py-1 rounded bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 font-bold">
            🏆 TOP 1% CORPORATE LEADER
          </div>
        </div>

        {/* Detailed Breakdown Gauges */}
        <div className="md:col-span-2 bg-[#09120D] border border-[#12281D] rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white tracking-wider">
            IMPACT SCORE CATEGORY BREAKDOWN
          </h3>

          <div className="space-y-3">
            {scoreMetrics.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{item.label}</span>
                  <span style={{ color: item.color }}>{item.percentage}%</span>
                </div>
                <div className="w-full bg-[#050B08] h-2.5 rounded-full overflow-hidden border border-[#12281D]">
                  <div
                    className="h-full rounded-full"
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
