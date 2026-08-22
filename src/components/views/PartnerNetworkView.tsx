'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Store, ShieldCheck, Star, Award, Gift, ArrowRight } from 'lucide-react';

export const PartnerNetworkView: React.FC = () => {
  const { nearbyPartners, setActiveTab } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>CITY GUARDIAN VERIFIED BUSINESS DIRECTORY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">City Guardian Partner Network</h1>
          <p className="text-xs text-slate-400">
            Local cafés, restaurants, & businesses supporting sustainable campus communities.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('nearby')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#03E5B7] flex items-center gap-2"
        >
          <span>Explore Partner Map</span>
          <ArrowRight className="w-4 h-4 text-[#03E5B7]" />
        </button>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nearbyPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{partner.logo}</span>
                  <div>
                    <h3 className="font-bold text-white text-base">{partner.name}</h3>
                    <p className="text-xs text-slate-400">📍 {partner.distanceMeters} m away • ⭐ {partner.rating}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                  Verified Partner ✓
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 text-xs font-mono text-[#FFC700] font-bold">
                🎁 {partner.rewardsOffer}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {partner.badges.map((b, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('nearby')}
                className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white"
              >
                View on Map
              </button>
              <button
                onClick={() => setActiveTab('redeem-rewards')}
                className="flex-1 py-2 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink"
              >
                View Rewards
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
