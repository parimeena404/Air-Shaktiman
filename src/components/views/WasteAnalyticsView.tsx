'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Trash2, Recycle, Flame, PieChart } from 'lucide-react';

export const WasteAnalyticsView: React.FC = () => {
  const { telemetry } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
          <Trash2 className="w-3.5 h-3.5" />
          <span>CIRCULAR WASTE METRICS</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Waste Analytics</h1>
        <p className="text-xs text-slate-400">
          Landfill diversion breakdown: Recycled, Reused in craft projects, & non-recyclable residual.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">TOTAL WASTE</span>
          <div className="text-2xl font-extrabold text-white font-mono">{telemetry.waste.totalKg} kg</div>
        </div>
        <div className="p-5 rounded-2xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">RECYCLED</span>
          <div className="text-2xl font-extrabold text-[#03E5B7] font-mono">{telemetry.waste.recycledKg} kg</div>
        </div>
        <div className="p-5 rounded-2xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">REUSED IN CRAFTS</span>
          <div className="text-2xl font-extrabold text-[#FFC700] font-mono">{telemetry.waste.reusedKg} kg</div>
        </div>
        <div className="p-5 rounded-2xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">RESIDUAL LANDFILL</span>
          <div className="text-2xl font-extrabold text-[#FF007A] font-mono">{telemetry.waste.landfillKg} kg</div>
        </div>
      </div>
    </div>
  );
};
