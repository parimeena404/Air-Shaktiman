'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Zap, AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const EnergyAnalyticsView: React.FC = () => {
  const { telemetry } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC700]/15 border border-[#FFC700]/40 text-[#FFC700] text-xs font-mono font-bold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>CAMPUS ENERGY GRID</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Energy Analytics</h1>
        <p className="text-xs text-slate-400">
          Building-level power consumption, peak load monitoring, & AI HVAC optimization recommendations.
        </p>
      </div>

      {/* AI Recommendation Quote */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FF007A]/15 to-transparent border border-[#FF007A]/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FF007A] font-bold">
          <AlertTriangle className="w-4 h-4" /> AI GRID RECOMMENDATION
        </div>
        <p className="text-xs text-slate-200">
          "Block B (Tech Lab) is consuming <strong className="text-white">23% more electricity than expected</strong>. Most excess consumption occurs between 1 PM and 4 PM during low occupancy lab windows."
        </p>
      </div>

      {/* Building Usage Table */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono">BUILDING LOAD PROFILES</h3>
        <div className="space-y-3">
          {telemetry.energy.buildingUsage.map((b, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#07080E] border border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">{b.name}</span>
              <div className="flex items-center gap-4 font-mono">
                <span className="text-[#FFC700] font-bold">{b.currentKw} kW</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    b.status === 'Critical'
                      ? 'bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]'
                      : b.status === 'High'
                      ? 'bg-[#FFC700]/20 text-[#FFC700] border border-[#FFC700]'
                      : 'bg-[#03E5B7]/20 text-[#03E5B7]'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
