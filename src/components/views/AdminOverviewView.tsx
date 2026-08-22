'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Shield, Activity, Users, Recycle, Utensils, Globe, Flame, CheckCircle2 } from 'lucide-react';

export const AdminOverviewView: React.FC = () => {
  const { activityFeed } = useEco();

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A] text-white text-xs font-mono font-bold mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>ENTERPRISE OPERATIONS CONTROL</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">EcoVerse Operations Dashboard</h1>
        <p className="text-xs text-slate-400">
          Monitor sustainability activity across the campus, business partners, & municipal community.
        </p>
      </div>

      {/* Top Enterprise Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">WASTE RECOVERED</span>
          <div className="text-xl font-extrabold text-white font-mono">428 kg</div>
          <div className="text-[10px] text-[#03E5B7]">↑ 23%</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">ACTIVE USERS</span>
          <div className="text-xl font-extrabold text-[#03E5B7] font-mono">1,284</div>
          <div className="text-[10px] text-[#03E5B7]">↑ 18%</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">FOOD RESCUED</span>
          <div className="text-xl font-extrabold text-[#FFC700] font-mono">186 kg</div>
          <div className="text-[10px] text-[#FFC700]">↑ 31%</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">CO₂ AVOIDED</span>
          <div className="text-xl font-extrabold text-[#A855F7] font-mono">1.8 tonnes</div>
          <div className="text-[10px] text-[#A855F7]">Global</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">ACTIVE REPORTS</span>
          <div className="text-xl font-extrabold text-[#FF007A] font-mono">27</div>
          <div className="text-[10px] text-[#FF007A]">Pending</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">ACTIVE ARENAS</span>
          <div className="text-xl font-extrabold text-[#06B6D4] font-mono">8</div>
          <div className="text-[10px] text-[#06B6D4]">Challenges</div>
        </div>
      </div>

      {/* Live Real-Time Activity Feed */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Activity className="w-4 h-4 text-[#FF007A]" />
            LIVE SYSTEM ACTIVITY TICKER FEED
          </h3>
          <span className="text-[10px] text-[#03E5B7] font-mono font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#03E5B7] animate-ping" /> Realtime Stream
          </span>
        </div>

        <div className="space-y-3">
          {activityFeed.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#07080E] border border-slate-800 flex justify-between items-center text-xs hover:border-[#FF007A]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500 w-16 flex-shrink-0">
                  {item.timestamp}
                </span>
                <span className="text-slate-200">
                  <strong className="text-white font-bold">{item.userOrOrg}</strong> {item.actionText}
                </span>
              </div>

              {item.statusBadge && (
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-[#FF007A]/15 text-[#FF007A] border border-[#FF007A]/30">
                  {item.statusBadge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
