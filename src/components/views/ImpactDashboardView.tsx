'use client';

import React from 'react';
import { BarChart3, Globe, Recycle, Droplet, Coins, Users, Rocket, Award } from 'lucide-react';

export const ImpactDashboardView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>GLOBAL CIRCULAR ECONOMY METRICS</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Our Collective Impact</h1>
        <p className="text-xs text-slate-400">
          Aggregated environmental and community achievements across Indore Campus & local recycling networks.
        </p>
      </div>

      {/* Large Glowing Impact Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-squid-card border border-[#03E5B7]/40 rounded-2xl p-6 space-y-2 glow-teal">
          <Recycle className="w-6 h-6 text-[#03E5B7]" />
          <div className="text-3xl font-extrabold text-white font-mono">428 kg</div>
          <div className="text-xs text-[#03E5B7] font-semibold">Total Waste Recovered</div>
        </div>

        <div className="bg-squid-card border border-[#FF007A]/40 rounded-2xl p-6 space-y-2 glow-pink">
          <Globe className="w-6 h-6 text-[#FF007A]" />
          <div className="text-3xl font-extrabold text-white font-mono">1.8 tonnes</div>
          <div className="text-xs text-[#FF007A] font-semibold">CO₂ Emissions Avoided</div>
        </div>

        <div className="bg-squid-card border border-[#06B6D4]/40 rounded-2xl p-6 space-y-2">
          <Droplet className="w-6 h-6 text-[#06B6D4]" />
          <div className="text-3xl font-extrabold text-white font-mono">84,000 L</div>
          <div className="text-xs text-[#06B6D4] font-semibold">Water Conserved</div>
        </div>

        <div className="bg-squid-card border border-[#FFC700]/40 rounded-2xl p-6 space-y-2 glow-gold">
          <Coins className="w-6 h-6 text-[#FFC700]" />
          <div className="text-3xl font-extrabold text-white font-mono">₹72,400</div>
          <div className="text-xs text-[#FFC700] font-semibold">Rewards Distributed</div>
        </div>

        <div className="bg-squid-card border border-[#A855F7]/40 rounded-2xl p-6 space-y-2">
          <Users className="w-6 h-6 text-[#A855F7]" />
          <div className="text-3xl font-extrabold text-white font-mono">1,284</div>
          <div className="text-xs text-[#A855F7] font-semibold">Community Contributions</div>
        </div>

        <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-2">
          <Rocket className="w-6 h-6 text-[#10B981]" />
          <div className="text-3xl font-extrabold text-white font-mono">89</div>
          <div className="text-xs text-[#10B981] font-semibold">Active Guild Projects</div>
        </div>
      </div>
    </div>
  );
};
