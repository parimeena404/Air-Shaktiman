'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { History, Filter, CheckCircle2, Coins, ArrowUpRight, Award, Trash2, Recycle } from 'lucide-react';

export const MyContributionsView: React.FC = () => {
  const { wasteReports } = useEco();
  const [filter, setFilter] = useState<'All' | 'Waste Reports' | 'Recycling' | 'Cleanup' | 'Projects' | 'Challenges'>('All');

  const historyItems = [
    {
      id: 'HIST-101',
      title: 'Plastic & Mixed Waste Report',
      location: 'Block B, North Gate',
      type: 'Waste Reports',
      details: 'Plastic + Cardboard detected (~12kg)',
      status: 'Cleaned',
      points: 10,
      timestamp: '10 mins ago',
      badge: '🎯 Waste Report',
    },
    {
      id: 'HIST-102',
      title: 'E-Waste Peripherals Recycled',
      location: 'Electronics Lab 2',
      type: 'Recycling',
      details: '2.4 kg copper wire & PCBs returned to Eco Hub #2',
      status: 'Verified',
      points: 100,
      timestamp: '2 hours ago',
      badge: '⚡ E-Waste',
    },
    {
      id: 'HIST-103',
      title: 'Narmada Stream Cleanup Drive',
      location: 'River Stretch 1',
      type: 'Cleanup',
      details: 'Extracted 14kg river floating plastic bottles',
      status: 'Completed',
      points: 75,
      timestamp: 'Yesterday',
      badge: '🌊 Cleanup Drive',
    },
    {
      id: 'HIST-104',
      title: 'Vertical Bottle Garden Guild',
      location: 'Canteen Balcony',
      type: 'Projects',
      details: 'Donated 10 PET 2L bottles & assisted assembly',
      status: 'Active',
      points: 100,
      timestamp: '2 days ago',
      badge: '🌱 Guild Project',
    },
    {
      id: 'HIST-105',
      title: 'Clean Campus Challenge Sprint',
      location: 'Campus Wide',
      type: 'Challenges',
      details: 'Contributed 18.4 kg total waste diversion',
      status: 'Completed',
      points: 250,
      timestamp: '3 days ago',
      badge: '🏆 Arena Challenge',
    },
  ];

  const filteredItems = historyItems.filter((item) => filter === 'All' || item.type === filter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <History className="w-3.5 h-3.5" />
          <span>PLAYER CONTRIBUTION LOG</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">My Contribution History</h1>
        <p className="text-xs text-slate-400">
          Complete chronological record of your reported waste, recycling donations, & arena points.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-slate-800">
        {(['All', 'Waste Reports', 'Recycling', 'Cleanup', 'Projects', 'Challenges'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === tab
                ? 'bg-[#FF007A] text-white shadow-lg shadow-[#FF007A]/30 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#03E5B7] mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.location}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.details}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
                  <span>{item.badge}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-center">
              <span className="text-[10px] px-3 py-1 rounded-full font-mono font-bold bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]/30">
                {item.status}
              </span>
              <div className="text-right">
                <div className="text-sm font-extrabold text-[#FFC700] font-mono flex items-center gap-1">
                  <Coins className="w-4 h-4 text-[#FFC700]" /> +{item.points} Pts
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
