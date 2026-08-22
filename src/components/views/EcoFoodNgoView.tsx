'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Heart, Bot, CheckCircle2, ArrowRight, Zap, Building2 } from 'lucide-react';

export const EcoFoodNgoView: React.FC = () => {
  const { ngoRequests, offerFoodToNGO, surplusFoodListings } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
          <Heart className="w-3.5 h-3.5" />
          <span>NGO FOOD RESCUE ALLIANCE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">NGO Food Rescue Network</h1>
        <p className="text-xs text-slate-400">
          Connect surplus food directly with verified NGOs, shelters, and community kitchens.
        </p>
      </div>

      {/* AI Food Matching Feature Showcase */}
      <div className="bg-squid-card border-2 border-[#03E5B7]/50 rounded-2xl p-6 space-y-4 glow-teal">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#03E5B7]" />
            <h3 className="text-sm font-bold text-white">EcoFood AI Matchmaker Engine</h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
            92% ACCURACY
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#07080E] border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-white flex justify-between">
            <span>Green Café Available Surplus: 42 Meals</span>
            <span className="text-[#FFC700] font-mono">Pickup window: 8:00 PM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[#FF007A] font-bold">🥇 BEST MATCH: Food For All Foundation</span>
              <p className="text-[11px] text-slate-400">92% Match • Distance: 2.1 km • Capacity: 50 meals</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[#03E5B7] font-bold">🥈 STUDENT DEMAND: 64 Students Nearby</span>
              <p className="text-[11px] text-slate-400">Potential sales: 38 meals on EcoFood</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#03E5B7]/10 border border-[#03E5B7]/30 text-xs text-[#03E5B7] font-semibold pt-2">
            💡 AI RECOMMENDATION: "Donate 20 meals to Food For All NGO and offer 22 meals through EcoFood at a 56% discount."
          </div>
        </div>
      </div>

      {/* NGO Requests Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-slate-400 font-bold tracking-wider">
          ACTIVE NGO SURPLUS MEAL DEMANDS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ngoRequests.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ngo.ngoLogo}</span>
                    <h4 className="font-bold text-white text-base">{ngo.ngoName}</h4>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                    {ngo.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-300">{ngo.needsDescription}</p>

                <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-1">
                  <div>Needed: <strong className="text-white">{ngo.quantityNeeded}</strong></div>
                  <div>Status: <strong className="text-[#03E5B7]">{ngo.pickupStatus}</strong></div>
                </div>
              </div>

              <button
                onClick={() => offerFoodToNGO(surplusFoodListings[0]?.id || 'FOOD-2048', ngo.id)}
                className="w-full py-2.5 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Offer Surplus Food (+25 Community Pts)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
