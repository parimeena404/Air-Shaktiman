'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Droplet, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WaterAnalyticsView: React.FC = () => {
  const { telemetry } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <Droplet className="w-3.5 h-3.5" />
          <span>CAMPUS WATER NETWORK</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Water Telemetry</h1>
        <p className="text-xs text-slate-400">
          Daily consumption analytics, flow pressure monitoring, & pipe rupture alert detection.
        </p>
      </div>

      {/* Water Locations Status List */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono">CAMPUS WATER ZONE STATUS</h3>
        <div className="space-y-3">
          {telemetry.water.locations.map((loc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#07080E] border border-slate-800 flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{loc.name}</span>
                  <span className="font-mono text-[11px]">{loc.status}</span>
                </div>
                <div className="text-slate-400 text-[11px]">{loc.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
